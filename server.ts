import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import agoraTokenPkg from 'agora-token';

const { RtcTokenBuilder, RtcRole } = agoraTokenPkg;

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Agora credentials configured securely on backend (NEVER exposed to frontend)
const AGORA_APP_ID = process.env.AGORA_APP_ID || 'c4a9cf6f9245456b929b79923f713952';
let AGORA_APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE || '';

/**
 * Health check & Agora configuration status endpoint
 * Informs client if the App Certificate is configured on the backend
 */
app.get('/api/agora/status', (_req, res) => {
  res.json({
    appId: AGORA_APP_ID,
    hasCertificate: Boolean(AGORA_APP_CERTIFICATE),
    environment: process.env.NODE_ENV || 'development',
    status: AGORA_APP_CERTIFICATE ? 'READY' : 'APP_ID_ONLY',
    message: AGORA_APP_CERTIFICATE
      ? 'Agora RTC token server configured and active.'
      : 'Agora App ID is active. Token signing requires AGORA_APP_CERTIFICATE in server environment variables.',
  });
});

/**
 * Optional server configuration endpoint for setting App Certificate at runtime
 */
app.post('/api/agora/config', (req, res) => {
  const { appCertificate } = req.body;
  if (appCertificate && typeof appCertificate === 'string') {
    AGORA_APP_CERTIFICATE = appCertificate.trim();
    return res.json({ success: true, message: 'AGORA_APP_CERTIFICATE updated on server.' });
  }
  return res.status(400).json({ error: 'Valid appCertificate string is required' });
});

import { SharedUserDatabase } from './src/server/database';

/**
 * Shared Database status endpoint
 */
app.get('/api/database/status', (_req, res) => {
  const users = SharedUserDatabase.getAllUsers();
  res.json({
    status: 'READY',
    type: 'shared_persistent_database',
    userCount: users.length,
    message: 'LiveStar shared database active. All devices sync to this shared repository.',
  });
});

/**
 * Shared User Discovery endpoint
 * Returns all registered users from the shared database
 */
app.get('/api/users', (req, res) => {
  const { category } = req.query;
  let users = SharedUserDatabase.getAllUsers();

  if (category && typeof category === 'string' && category !== 'All') {
    users = users.filter((u) => u.category === category);
  }

  res.json({
    success: true,
    count: users.length,
    users,
  });
});

/**
 * Search Users across all registered profiles in the shared database
 */
app.get('/api/users/search', (req, res) => {
  const query = String(req.query.q || '');
  const results = SharedUserDatabase.searchUsers(query);
  res.json({
    success: true,
    query,
    count: results.length,
    users: results,
  });
});

/**
 * Get specific user by ID
 */
app.get('/api/users/:id', (req, res) => {
  const user = SharedUserDatabase.getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found in shared database' });
  }
  res.json({ success: true, user });
});

/**
 * User Registration endpoint
 * Saves new registration to the shared database with unique ID
 */
app.post('/api/auth/register', (req, res) => {
  const { username, displayName, email, bio, avatar, category, title } = req.body;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'A valid username is required.' });
  }

  const result = SharedUserDatabase.registerUser({
    username,
    displayName: displayName || username,
    email,
    bio,
    avatar,
    category,
    title,
  });

  if (!result.success) {
    return res.status(409).json({ error: result.error });
  }

  return res.status(201).json({
    success: true,
    message: 'User registered successfully in shared database.',
    user: result.user,
  });
});

/**
 * User Login endpoint
 * Checks shared database for existing registered handle
 */
app.post('/api/auth/login', (req, res) => {
  const { username } = req.body;
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username is required' });
  }

  const result = SharedUserDatabase.loginUser(username);
  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }

  return res.json({
    success: true,
    user: result.user,
  });
});

/**
 * Update user profile in shared database
 */
app.patch('/api/users/:id', (req, res) => {
  const result = SharedUserDatabase.updateUser(req.params.id, req.body);
  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }
  return res.json({ success: true, user: result.user });
});

/**
 * Toggle follow user in shared database
 */
app.post('/api/users/:id/follow', (req, res) => {
  const { followerId } = req.body;
  const result = SharedUserDatabase.toggleFollow(req.params.id, followerId);
  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }
  return res.json(result);
});

/**
 * Secure Agora RTC token generator endpoint
 * Builds temporary, short-lived tokens per channel and UID
 */
app.post('/api/agora/token', (req, res) => {
  const { channelName, uid, role = 'publisher', appCertificate } = req.body;

  if (!channelName || typeof channelName !== 'string') {
    return res.status(400).json({ error: 'channelName is required and must be a string' });
  }

  const certToUse = appCertificate || AGORA_APP_CERTIFICATE;

  // If App Certificate is not configured in backend environment
  if (!certToUse) {
    return res.json({
      token: null,
      appId: AGORA_APP_ID,
      channelName,
      uid: uid || Math.floor(Math.random() * 100000) + 1,
      isLiveToken: false,
      message:
        'Agora App ID active. If your Agora project requires token authorization, configure AGORA_APP_CERTIFICATE.',
    });
  }

  try {
    const numericUid = Number(uid) || Math.floor(Math.random() * 100000) + 1;
    const rtcRole = role === 'subscriber' ? RtcRole.SUBSCRIBER : RtcRole.PUBLISHER;

    // Token expires in 1 hour (3600 seconds)
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithUid(
      AGORA_APP_ID,
      certToUse,
      channelName,
      numericUid,
      rtcRole,
      privilegeExpiredTs,
      privilegeExpiredTs
    );

    return res.json({
      token,
      appId: AGORA_APP_ID,
      channelName,
      uid: numericUid,
      expiresAt: privilegeExpiredTs,
      isLiveToken: true,
      message: 'Token successfully generated for channel session.',
    });
  } catch (error: any) {
    console.error('Error generating Agora token:', error);
    return res.status(500).json({
      error: 'Token generation failure',
      details: error.message || 'Unknown error',
    });
  }
});

// Mount Vite middleware in development or serve static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LiveStar full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

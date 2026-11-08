import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Mic, MicOff, PhoneOff } from 'lucide-react';

const CHANNEL = 'livestar-test-room';

export function VideoCallScreen() {
  const { setCurrentScreen } = useApp();

  const localVideo = useRef<HTMLDivElement>(null);
  const remoteVideo = useRef<HTMLDivElement>(null);
  const client = useRef<any>(null);
  const tracks = useRef<any[]>([]);

  const [status, setStatus] = useState('Connecting...');
  const [muted, setMuted] = useState(false);
  const [micStatus, setMicStatus] = useState('Mic starting...');

  useEffect(() => {
    let active = true;

    async function startCall() {
      try {
        const uid = Math.floor(Math.random() * 900000) + 100000;

        const response = await fetch('/api/agora/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            channelName: CHANNEL,
            uid,
            role: 'publisher',
          }),
        });

        if (!response.ok) {
          throw new Error('Token generation failed');
        }

        const data = await response.json();

        if (!data.token || !data.appId) {
          throw new Error('Agora token or App ID missing');
        }

        const agora = AgoraRTC.createClient({
          mode: 'rtc',
          codec: 'vp8',
        });

        client.current = agora;

        agora.on('user-published', async (user, mediaType) => {
          await agora.subscribe(user, mediaType);

          if (mediaType === 'video' && remoteVideo.current) {
            user.videoTrack?.play(remoteVideo.current);
          }

          if (mediaType === 'audio') {
            user.audioTrack?.play();
          }
        });

        agora.on('user-left', () => {
          setStatus('Dusra user call se chala gaya');
        });

        await agora.join(data.appId, CHANNEL, data.token, uid);

        const localTracks =
          await AgoraRTC.createMicrophoneAndCameraTracks();

        if (!active) {
          localTracks.forEach(track => track.close());
          await agora.leave();
          return;
        }

        tracks.current = localTracks;

        const mic = localTracks[0];

        if (mic) {
          await mic.setEnabled(true);
          setMuted(false);
          setMicStatus('Microphone ON');
        }

        if (localVideo.current) {
          localTracks[1].play(localVideo.current);
        }

        await agora.publish(localTracks);

        setStatus('Connected - Waiting for other user');
      } catch (error: any) {
        console.error('Agora call error:', error);

        setStatus(error.message || 'Connection failed');
        setMicStatus(
          error.message?.toLowerCase().includes('microphone')
            ? 'Microphone permission/error'
            : 'Mic unavailable'
        );
      }
    }

    startCall();

    return () => {
      active = false;

      tracks.current.forEach(track => track.close());
      tracks.current = [];

      client.current?.leave();
      client.current = null;
    };
  }, []);

  const toggleMic = async () => {
    const mic = tracks.current[0];

    if (!mic) {
      setMicStatus('Microphone not connected');
      return;
    }

    try {
      const nextMuted = !muted;

      await mic.setEnabled(!nextMuted);

      setMuted(nextMuted);
      setMicStatus(nextMuted ? 'Microphone MUTED' : 'Microphone ON');
    } catch (error) {
      console.error('Microphone toggle error:', error);
      setMicStatus('Microphone ERROR');
    }
  };

  const endCall = async () => {
    tracks.current.forEach(track => track.close());
    tracks.current = [];

    if (client.current) {
      await client.current.leave();
      client.current = null;
    }

    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-[#080911] text-white p-4 flex flex-col">
      <div className="flex items-center justify-between">
        <button onClick={() => setCurrentScreen('home')}>
          <ArrowLeft />
        </button>

        <h1 className="text-xl font-bold">Video Call</h1>

        <span className="text-pink-400">LiveStar</span>
      </div>

      <div className="flex-1 my-6 relative rounded-2xl bg-[#171827] overflow-hidden">
        <div ref={remoteVideo} className="absolute inset-0" />

        <div
          ref={localVideo}
          className="absolute bottom-4 right-4 w-28 h-40 rounded-xl overflow-hidden bg-gray-800"
        />

        <p className="absolute top-3 left-3 text-sm bg-black/60 p-2 rounded">
          {status}
        </p>

        <p className="absolute top-16 left-3 text-sm bg-black/60 p-2 rounded">
          {micStatus}
        </p>
      </div>

      <div className="flex justify-center gap-6 pb-6">
        <button
          onClick={toggleMic}
          className={`rounded-full p-4 ${
            muted ? 'bg-red-600' : 'bg-gray-700'
          }`}
          aria-label={muted ? 'Unmute microphone' : 'Mute microphone'}
        >
          {muted ? <MicOff /> : <Mic />}
        </button>

        <button
          onClick={endCall}
          className="rounded-full bg-red-600 p-4"
          aria-label="End call"
        >
          <PhoneOff />
        </button>
      </div>
    </div>
  );
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  email?: string;
  bio?: string;
  avatar?: string;
  category?: string;
  title?: string;
  followers: string[];
  following: string[];
  createdAt: string;
}

const users: User[] = [];

export const SharedUserDatabase = {
  getAllUsers(): User[] {
    return users;
  },

  searchUsers(query: string): User[] {
    const q = query.toLowerCase().trim();
    return users.filter(
      u =>
        u.username.toLowerCase().includes(q) ||
        u.displayName.toLowerCase().includes(q)
    );
  },

  getUserById(id: string): User | undefined {
    return users.find(u => u.id === id);
  },

  registerUser(data: Partial<User>) {
    const username = data.username?.trim();

    if (!username) {
      return { success: false, error: 'Username required' };
    }

    if (users.some(u => u.username === username)) {
      return { success: false, error: 'Username already exists' };
    }

    const user: User = {
      id: Date.now().toString(),
      username,
      displayName: data.displayName || username,
      email: data.email,
      bio: data.bio,
      avatar: data.avatar,
      category: data.category,
      title: data.title,
      followers: [],
      following: [],
      createdAt: new Date().toISOString(),
    };

    users.push(user);
    return { success: true, user };
  },

  loginUser(username: string) {
    const user = users.find(u => u.username === username);

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    return { success: true, user };
  },

  updateUser(id: string, data: Partial<User>) {
    const user = users.find(u => u.id === id);

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    Object.assign(user, data, { id: user.id });
    return { success: true, user };
  },

  toggleFollow(userId: string, followerId: string) {
    const user = users.find(u => u.id === userId);
    const follower = users.find(u => u.id === followerId);

    if (!user || !follower || userId === followerId) {
      return { success: false, error: 'Invalid user' };
    }

    const index = user.followers.indexOf(followerId);

    if (index >= 0) {
      user.followers.splice(index, 1);
      follower.following = follower.following.filter(id => id !== userId);
    } else {
      user.followers.push(followerId);
      follower.following.push(userId);
    }

    return {
      success: true,
      following: user.followers.includes(followerId),
    };
  },
};

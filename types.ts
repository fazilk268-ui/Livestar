export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  streamsCount: number;
  diamondsCount: number;
  coinsCount: number;
  level: number;
  isVerified: boolean;
  coverBanner?: string;
  location?: string;
}

export interface Streamer {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  coverImage: string;
  title: string;
  category: 'Popular' | 'Music' | 'Gaming' | 'Chat' | 'PK Battle';
  tags: string[];
  viewersCount: number;
  likesCount: number;
  diamondsEarned: number;
  isLive: boolean;
  bio: string;
  followersCount: number;
  followingCount?: number;
  streamsCount?: number;
  diamondsCount?: number;
  coinsCount?: number;
  level?: number;
  isVerified?: boolean;
  isFollowing?: boolean;
  ranking?: number;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
  lastActive?: string;
}


export interface LiveComment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  text: string;
  badgeLevel: number;
  timestamp: string;
  isGift?: boolean;
  giftName?: string;
  giftIcon?: string;
  giftCount?: number;
}

export interface GiftItem {
  id: string;
  name: string;
  icon: string;
  cost: number;
  badgeColor: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  description: string;
}

export interface WalletTransaction {
  id: string;
  type: 'recharge' | 'gift_sent' | 'gift_received' | 'cashout';
  title: string;
  subtitle: string;
  amountCoins: number;
  amountDiamonds?: number;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  type: 'live' | 'follow' | 'gift' | 'message' | 'system';
  title: string;
  message: string;
  avatar: string;
  timestamp: string;
  isRead: boolean;
  actionScreen?: 'live_room' | 'inbox' | 'profile' | 'wallet';
  streamerId?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface MessageThread {
  id: string;
  streamerId: string;
  streamerName: string;
  streamerAvatar: string;
  isOnline: boolean;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export type ScreenType =
  | 'home'
  | 'live_room'
  | 'video_call'
  | 'profile'
  | 'wallet'
  | 'inbox'
  | 'auth'
  | 'go_live'
  | 'user_detail';

export interface UserType {
  id: string;
  email: string;
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  createdAt: string;
}

export interface PostType {
  id: string;
  caption: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    name: string;
    avatarUrl: string;
  };
  images: {
    id: string;
    url: string;
    order: number;
  }[];
  likeCount: number;
  commentCount: number;
  liked: boolean;
}

export interface ContextUserFriend {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  isMe: boolean;
}

export interface IFormValues {
  name: string;
  username: string;
  bio: string;
}

export interface FollowResponse {
  isFollowing: boolean;
}
export interface UserSearch {
  id: string;
  username: string;
  name: string;
  avatarUrl: string;
}

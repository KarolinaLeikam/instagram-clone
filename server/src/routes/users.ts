import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { validateBody } from '../lib/validate.js';
import { requireAuth, type AuthRequest } from '../middleware/auth.js';

export const usersRouter = Router();

const editSchema = z.object({
  name: z.string().max(60).optional(),
  bio: z.string().max(300).optional(),
  avatarUrl: z.string().url().optional(),
});

// PATCH /users/me — must come before /:username
usersRouter.patch('/me', requireAuth, validateBody(editSchema), async (req: AuthRequest, res) => {
  const user = await prisma.user.update({
    where: { id: req.userId },
    data: req.body,
    select: { id: true, email: true, username: true, name: true, bio: true, avatarUrl: true },
  });
  res.json({ user });
});

// GET /users/:username — profile + counts + isFollowing
usersRouter.get('/:username', requireAuth, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { username: req.params.username },
    select: {
      id: true,
      username: true,
      name: true,
      bio: true,
      avatarUrl: true,
      _count: { select: { posts: true, followers: true, following: true } },
    },
  });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isFollowing = await prisma.follow.findUnique({
    where: {
      followerId_followingId: { followerId: req.userId!, followingId: user.id },
    },
  });

  res.json({
    ...user,
    postsCount: user._count.posts,
    followersCount: user._count.followers,
    followingCount: user._count.following,
    isFollowing: Boolean(isFollowing),
    isMe: user.id === req.userId,
    _count: undefined,
  });
});

// GET /users/:username/posts — grid
usersRouter.get('/:username/posts', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { username: req.params.username } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const posts = await prisma.post.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      images: { orderBy: { order: 'asc' }, take: 1 },
      _count: { select: { likes: true, comments: true } },
    },
  });
  res.json(
    posts.map((p) => ({
      id: p.id,
      cover: p.images[0]?.url ?? null,
      likeCount: p._count.likes,
      commentCount: p._count.comments,
    })),
  );
});

// follow / unfollow
usersRouter.post('/:username/follow', requireAuth, async (req: AuthRequest, res) => {
  const target = await prisma.user.findUnique({ where: { username: req.params.username } });
  if (!target) return res.status(404).json({ error: 'User not found' });
  if (target.id === req.userId) return res.status(400).json({ error: 'Cannot follow yourself' });
  await prisma.follow.upsert({
    where: { followerId_followingId: { followerId: req.userId!, followingId: target.id } },
    create: { followerId: req.userId!, followingId: target.id },
    update: {},
  });
  res.json({ isFollowing: true });
});

usersRouter.delete('/:username/follow', requireAuth, async (req: AuthRequest, res) => {
  const target = await prisma.user.findUnique({ where: { username: req.params.username } });
  if (!target) return res.status(404).json({ error: 'User not found' });
  await prisma.follow.deleteMany({
    where: { followerId: req.userId!, followingId: target.id },
  });
  res.json({ isFollowing: false });
});

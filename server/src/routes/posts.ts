import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { validateBody } from '../lib/validate.js';
import { requireAuth, type AuthRequest } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

export const postsRouter = Router();

const authorSelect = {
  id: true,
  username: true,
  name: true,
  avatarUrl: true,
} as const;

// shape a post with counts + whether current user liked it
async function serializePost(postId: string, userId: string) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: { select: authorSelect },
      images: { orderBy: { order: 'asc' } },
      _count: { select: { likes: true, comments: true } },
    },
  });
  if (!post) return null;
  const liked = await prisma.like.findUnique({
    where: { userId_postId: { userId, postId } },
  });
  return {
    ...post,
    likeCount: post._count.likes,
    commentCount: post._count.comments,
    liked: Boolean(liked),
    _count: undefined,
  };
}

// GET /posts/feed — posts from people the user follows (+ self)
postsRouter.get('/feed', requireAuth, async (req: AuthRequest, res) => {
  const userId = req.userId!;
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });
  const authorIds = [userId, ...following.map((f) => f.followingId)];

  const posts = await prisma.post.findMany({
    where: { authorId: { in: authorIds } },
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: authorSelect },
      images: { orderBy: { order: 'asc' } },
      _count: { select: { likes: true, comments: true } },
      likes: { where: { userId }, select: { id: true } },
    },
  });

  res.json(
    posts.map((p) => ({
      ...p,
      likeCount: p._count.likes,
      commentCount: p._count.comments,
      liked: p.likes.length > 0,
      likes: undefined,
      _count: undefined,
    })),
  );
});

postsRouter.get('/:id', requireAuth, async (req: AuthRequest, res) => {
  const post = await serializePost(req.params.id, req.userId!);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// POST /posts — multipart: images[] + caption
postsRouter.post('/', requireAuth, upload.array('images', 10), async (req: AuthRequest, res) => {
  const files = (req.files as Express.Multer.File[]) ?? [];
  if (files.length === 0) {
    return res.status(400).json({ error: 'At least one image required' });
  }
  const caption = typeof req.body.caption === 'string' ? req.body.caption : null;

  const post = await prisma.post.create({
    data: {
      authorId: req.userId!,
      caption,
      images: {
        create: files.map((f, i) => ({ url: `/uploads/${f.filename}`, order: i })),
      },
    },
  });
  const full = await serializePost(post.id, req.userId!);
  res.status(201).json(full);
});

postsRouter.delete('/:id', requireAuth, async (req: AuthRequest, res) => {
  const post = await prisma.post.findUnique({ where: { id: req.params.id } });
  if (!post) return res.status(404).json({ error: 'Post not found' });
  if (post.authorId !== req.userId) return res.status(403).json({ error: 'Forbidden' });
  await prisma.post.delete({ where: { id: post.id } });
  res.status(204).end();
});

// likes
postsRouter.post('/:id/like', requireAuth, async (req: AuthRequest, res) => {
  const postId = req.params.id;
  const userId = req.userId!;
  await prisma.like.upsert({
    where: { userId_postId: { userId, postId } },
    create: { userId, postId },
    update: {},
  });
  const count = await prisma.like.count({ where: { postId } });
  res.json({ liked: true, likeCount: count });
});

postsRouter.delete('/:id/like', requireAuth, async (req: AuthRequest, res) => {
  const postId = req.params.id;
  const userId = req.userId!;
  await prisma.like.deleteMany({ where: { userId, postId } });
  const count = await prisma.like.count({ where: { postId } });
  res.json({ liked: false, likeCount: count });
});

// comments
postsRouter.get('/:id/comments', requireAuth, async (req, res) => {
  const comments = await prisma.comment.findMany({
    where: { postId: req.params.id },
    orderBy: { createdAt: 'asc' },
    include: { author: { select: authorSelect } },
  });
  res.json(comments);
});

const commentSchema = z.object({ text: z.string().min(1).max(2200) });

postsRouter.post(
  '/:id/comments',
  requireAuth,
  validateBody(commentSchema),
  async (req: AuthRequest, res) => {
    const post = await prisma.post.findUnique({ where: { id: req.params.id } });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const comment = await prisma.comment.create({
      data: { postId: post.id, authorId: req.userId!, text: req.body.text },
      include: { author: { select: authorSelect } },
    });
    res.status(201).json(comment);
  },
);

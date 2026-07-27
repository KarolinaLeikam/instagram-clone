import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth, type AuthRequest } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

export const storiesRouter = Router();

const DAY_MS = 24 * 60 * 60 * 1000;

// GET /stories — active (<24h) stories from people the user follows (+ self)
storiesRouter.get('/', requireAuth, async (req: AuthRequest, res) => {
  const userId = req.userId!;
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });
  const authorIds = [userId, ...following.map((f) => f.followingId)];
  const since = new Date(Date.now() - DAY_MS);

  const stories = await prisma.story.findMany({
    where: { authorId: { in: authorIds }, createdAt: { gte: since } },
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { id: true, username: true, name: true, avatarUrl: true } },
    },
  });
  res.json(stories);
});

storiesRouter.post('/', requireAuth, upload.single('image'), async (req: AuthRequest, res) => {
  const file = req.file as Express.Multer.File | undefined;
  if (!file) return res.status(400).json({ error: 'Image required' });
  const story = await prisma.story.create({
    data: { authorId: req.userId!, imageUrl: `/uploads/${file.filename}` },
  });
  res.status(201).json(story);
});

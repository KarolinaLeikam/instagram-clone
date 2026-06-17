import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { signToken } from '../lib/jwt.js';
import { validateBody } from '../lib/validate.js';
import { requireAuth, type AuthRequest } from '../middleware/auth.js';

export const authRouter = Router();

const publicUser = {
  id: true,
  email: true,
  username: true,
  name: true,
  bio: true,
  avatarUrl: true,
  createdAt: true,
} as const;

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30),
  password: z.string().min(6),
  name: z.string().max(60).optional(),
});

authRouter.post('/register', validateBody(registerSchema), async (req, res) => {
  const { email, username, password, name } = req.body as z.infer<typeof registerSchema>;

  const exists = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });
  if (exists) {
    return res.status(409).json({ error: 'Email or username already taken' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, username, name, passwordHash },
    select: publicUser,
  });

  const token = signToken({ userId: user.id });
  res.status(201).json({ token, user });
});

const loginSchema = z.object({
  login: z.string(), // email or username
  password: z.string(),
});

authRouter.post('/login', validateBody(loginSchema), async (req, res) => {
  const { login, password } = req.body as z.infer<typeof loginSchema>;

  const user = await prisma.user.findFirst({
    where: { OR: [{ email: login }, { username: login }] },
  });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = signToken({ userId: user.id });
  const { passwordHash, ...safe } = user;
  res.json({ token, user: safe });
});

authRouter.get('/me', requireAuth, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: publicUser,
  });
  res.json({ user });
});

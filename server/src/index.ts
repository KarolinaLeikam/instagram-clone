import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { openapiSpec } from './openapi.js';
import { authRouter } from './routes/auth.js';
import { postsRouter } from './routes/posts.js';
import { usersRouter } from './routes/users.js';
import { storiesRouter } from './routes/stories.js';
import { UPLOADS_PATH } from './middleware/upload.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_PATH));

app.get('/health', (_req, res) => res.json({ ok: true }));

app.get('/openapi.json', (_req, res) => res.json(openapiSpec));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/stories', storiesRouter);

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

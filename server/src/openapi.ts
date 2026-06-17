export const openapiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Instagram Clone API',
    version: '1.0.0',
    description: 'Backend for the Instagram clone. Seed users password: password123',
  },
  servers: [{ url: 'http://localhost:4000' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string', format: 'email' },
          username: { type: 'string' },
          name: { type: 'string', nullable: true },
          bio: { type: 'string', nullable: true },
          avatarUrl: { type: 'string', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          token: { type: 'string' },
          user: { $ref: '#/components/schemas/User' },
        },
      },
      Author: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          username: { type: 'string' },
          name: { type: 'string', nullable: true },
          avatarUrl: { type: 'string', nullable: true },
        },
      },
      PostImage: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          url: { type: 'string' },
          order: { type: 'integer' },
        },
      },
      Post: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          caption: { type: 'string', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
          author: { $ref: '#/components/schemas/Author' },
          images: { type: 'array', items: { $ref: '#/components/schemas/PostImage' } },
          likeCount: { type: 'integer' },
          commentCount: { type: 'integer' },
          liked: { type: 'boolean' },
        },
      },
      Comment: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          text: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          author: { $ref: '#/components/schemas/Author' },
        },
      },
      Profile: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          username: { type: 'string' },
          name: { type: 'string', nullable: true },
          bio: { type: 'string', nullable: true },
          avatarUrl: { type: 'string', nullable: true },
          postsCount: { type: 'integer' },
          followersCount: { type: 'integer' },
          followingCount: { type: 'integer' },
          isFollowing: { type: 'boolean' },
          isMe: { type: 'boolean' },
        },
      },
      Story: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          imageUrl: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          author: { $ref: '#/components/schemas/Author' },
        },
      },
      Error: { type: 'object', properties: { error: { type: 'string' } } },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'username', 'password'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  username: { type: 'string', minLength: 3, maxLength: 30 },
                  password: { type: 'string', minLength: 6 },
                  name: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
          409: { description: 'Email or username taken', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login with email or username',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['login', 'password'],
                properties: {
                  login: { type: 'string', description: 'email or username' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
          401: { description: 'Invalid credentials', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
    '/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Current user',
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { type: 'object', properties: { user: { $ref: '#/components/schemas/User' } } } } } },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/posts/feed': {
      get: {
        tags: ['Posts'],
        summary: 'Feed (followed users + self)',
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Post' } } } } },
        },
      },
    },
    '/posts': {
      post: {
        tags: ['Posts'],
        summary: 'Create post (multipart images[])',
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  images: { type: 'array', items: { type: 'string', format: 'binary' } },
                  caption: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Post' } } } },
          400: { description: 'No image' },
        },
      },
    },
    '/posts/{id}': {
      get: {
        tags: ['Posts'],
        summary: 'Get post',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Post' } } } },
          404: { description: 'Not found' },
        },
      },
      delete: {
        tags: ['Posts'],
        summary: 'Delete own post',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 204: { description: 'Deleted' }, 403: { description: 'Forbidden' }, 404: { description: 'Not found' } },
      },
    },
    '/posts/{id}/like': {
      post: {
        tags: ['Posts'],
        summary: 'Like post',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'OK', content: { 'application/json': { schema: { type: 'object', properties: { liked: { type: 'boolean' }, likeCount: { type: 'integer' } } } } } } },
      },
      delete: {
        tags: ['Posts'],
        summary: 'Unlike post',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'OK', content: { 'application/json': { schema: { type: 'object', properties: { liked: { type: 'boolean' }, likeCount: { type: 'integer' } } } } } } },
      },
    },
    '/posts/{id}/comments': {
      get: {
        tags: ['Posts'],
        summary: 'List comments',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Comment' } } } } } },
      },
      post: {
        tags: ['Posts'],
        summary: 'Add comment',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', required: ['text'], properties: { text: { type: 'string' } } } } },
        },
        responses: { 201: { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Comment' } } } } },
      },
    },
    '/users/me': {
      patch: {
        tags: ['Users'],
        summary: 'Edit own profile',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  bio: { type: 'string' },
                  avatarUrl: { type: 'string', format: 'uri' },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'OK', content: { 'application/json': { schema: { type: 'object', properties: { user: { $ref: '#/components/schemas/User' } } } } } } },
      },
    },
    '/users/{username}': {
      get: {
        tags: ['Users'],
        summary: 'Profile + counts',
        parameters: [{ name: 'username', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Profile' } } } },
          404: { description: 'Not found' },
        },
      },
    },
    '/users/{username}/posts': {
      get: {
        tags: ['Users'],
        summary: 'User posts grid',
        parameters: [{ name: 'username', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      cover: { type: 'string', nullable: true },
                      likeCount: { type: 'integer' },
                      commentCount: { type: 'integer' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/users/{username}/follow': {
      post: {
        tags: ['Users'],
        summary: 'Follow user',
        parameters: [{ name: 'username', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'OK', content: { 'application/json': { schema: { type: 'object', properties: { isFollowing: { type: 'boolean' } } } } } } },
      },
      delete: {
        tags: ['Users'],
        summary: 'Unfollow user',
        parameters: [{ name: 'username', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'OK', content: { 'application/json': { schema: { type: 'object', properties: { isFollowing: { type: 'boolean' } } } } } } },
      },
    },
    '/stories': {
      get: {
        tags: ['Stories'],
        summary: 'Active stories (<24h) from followed + self',
        responses: { 200: { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Story' } } } } } },
      },
      post: {
        tags: ['Stories'],
        summary: 'Create story (multipart image)',
        requestBody: {
          required: true,
          content: { 'multipart/form-data': { schema: { type: 'object', properties: { image: { type: 'string', format: 'binary' } } } } },
        },
        responses: { 201: { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Story' } } } } },
      },
    },
  },
} as const;

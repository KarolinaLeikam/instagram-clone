import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const IMG = 'https://picsum.photos/seed';

async function main() {
  // wipe (dev only)
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.postImage.deleteMany();
  await prisma.post.deleteMany();
  await prisma.story.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('password123', 10);

  const usersData = [
    { email: 'alice@test.com', username: 'alice', name: 'Alice', bio: 'photographer' },
    { email: 'bob@test.com', username: 'bob', name: 'Bob', bio: 'traveler' },
    { email: 'carol@test.com', username: 'carol', name: 'Carol', bio: 'foodie' },
  ];

  const users = [];
  for (const u of usersData) {
    users.push(
      await prisma.user.create({
        data: { ...u, passwordHash, avatarUrl: `${IMG}/${u.username}-avatar/150` },
      }),
    );
  }
  const [alice, bob, carol] = users;

  // follows: alice <-> bob, alice -> carol
  await prisma.follow.createMany({
    data: [
      { followerId: alice.id, followingId: bob.id },
      { followerId: bob.id, followingId: alice.id },
      { followerId: alice.id, followingId: carol.id },
    ],
  });

  // posts (2 each, one with carousel)
  for (const user of users) {
    for (let i = 0; i < 2; i++) {
      await prisma.post.create({
        data: {
          authorId: user.id,
          caption: `${user.username} post ${i + 1}`,
          images: {
            create:
              i === 0
                ? [
                    { url: `${IMG}/${user.username}-${i}-a/600`, order: 0 },
                    { url: `${IMG}/${user.username}-${i}-b/600`, order: 1 },
                  ]
                : [{ url: `${IMG}/${user.username}-${i}/600`, order: 0 }],
          },
        },
      });
    }
  }

  // likes + comments on bob's posts by alice
  const bobPosts = await prisma.post.findMany({ where: { authorId: bob.id } });
  for (const p of bobPosts) {
    await prisma.like.create({ data: { userId: alice.id, postId: p.id } });
    await prisma.comment.create({
      data: { postId: p.id, authorId: alice.id, text: 'nice!' },
    });
  }

  // stories
  await prisma.story.createMany({
    data: [
      { authorId: bob.id, imageUrl: `${IMG}/bob-story/600` },
      { authorId: carol.id, imageUrl: `${IMG}/carol-story/600` },
    ],
  });

  console.log('Seeded. Login with any user, password: password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

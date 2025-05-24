import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. Newsletter
  const newsletterEmails = [
    'user1@example.com', 'user2@example.com', 'user3@example.com', 'user4@example.com',
    'user5@example.com', 'user6@example.com', 'user7@example.com', 'user8@example.com',
    'user9@example.com', 'user10@example.com', 'user11@example.com', 'user12@example.com',
    'user13@example.com', 'user14@example.com', 'user15@example.com', 'user16@example.com',
    'user17@example.com', 'user18@example.com', 'user19@example.com', 'user20@example.com',
    'user21@example.com',
  ];
  await Promise.all(
    newsletterEmails.map(email =>
      prisma.newsletter.create({
        data: { email, createdAt: new Date() },
      })
    )
  );

  // 2. Image
  const imageUrls = Array.from({ length: 21 }, (_, i) => `https://cdn.example.com/images/${i + 1}.jpg`);
  const images = await Promise.all(
    imageUrls.map(url =>
      prisma.image.create({ data: { url } })
    )
  );

  // 3. Course (iconId = id d'une Image entre 1 et 21)
  const coursesData = Array.from({ length: 20 }, (_, i) => ({
    title: `Course ${i + 1}`,
    description: `Description of Course ${i + 1}`,
    date: new Date(),
    iconId: images[i].id,
  }));
  await Promise.all(
    coursesData.map(course => prisma.course.create({ data: course }))
  );

  // 4. ErasmusCourse (imageId uniques, ne pas réutiliser ceux déjà utilisés comme iconId)
  // On utilise ici des images dont les index ne sont pas utilisés pour iconId (selon ta logique)
  const erasmusImageIds = [images[20].id, images[10].id, images[11].id, images[12].id, images[13].id, images[14].id,
                          images[15].id, images[16].id, images[17].id, images[18].id, images[19].id,
                          images[2].id, images[3].id, images[4].id, images[5].id, images[6].id,
                          images[7].id, images[8].id, images[9].id, images[1].id];

  const erasmusTitles = 'ABCDEFGHIJKLMNOPQRST'.split('');
  const erasmusCoursesData = erasmusTitles.map((letter, i) => ({
    title: `Erasmus ${letter}`,
    description: `Short desc ${letter}`,
    content: `Content ${letter}`,
    date: new Date(),
    imageId: erasmusImageIds[i],
  }));
  await Promise.all(
    erasmusCoursesData.map(course => prisma.erasmusCourse.create({ data: course }))
  );

  // 5. ErasmusProject (imageId uniques)
  // Réutiliser images 1 à 20 (id 1 à 20)
  const erasmusProjectData = Array.from({ length: 20 }, (_, i) => ({
    title: `Project ${String.fromCharCode(65 + i)}`, // A, B, C ...
    url: `https://project.com/${String.fromCharCode(97 + i)}`, // a, b, c ...
    date: new Date(),
    imageId: images[i].id,
  }));
  await Promise.all(
    erasmusProjectData.map(project => prisma.erasmusProject.create({ data: project }))
  );

  // 6. Post
  const postsData = Array.from({ length: 20 }, (_, i) => {
    const categories = ['News', 'Event', 'Blog'];
    return {
      title: `Post ${i + 1}`,
      category: categories[i % 3],
      content: `Content of post ${i + 1}`,
      date: new Date(),
    };
  });
  const posts = await Promise.all(
    postsData.map(post => prisma.post.create({ data: post }))
  );

  // 7. Lier les images aux posts (1 image par post)
  await Promise.all(
    posts.map((post, i) => prisma.image.update({
      where: { id: images[i].id },
      data: { postId: post.id }
    }))
  );

  // 8. Video
  const videosData = Array.from({ length: 20 }, (_, i) => ({
    title: `Video ${i + 1}`,
    url: `https://cdn.example.com/videos/v${i + 1}.mp4`,
    date: new Date(),
  }));
  await Promise.all(
    videosData.map(video => prisma.video.create({ data: video }))
  );

  console.log('Seed data inserted successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

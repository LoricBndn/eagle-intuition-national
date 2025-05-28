import { PrismaClient, Category } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  // Users
  for (let i = 0; i < 50; i++) {
    await prisma.user.create({
      data: {
        id: uuidv4(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });
  }

  // Newsletters
  for (let i = 0; i < 50; i++) {
    await prisma.newsletter.create({
      data: {
        id: uuidv4(),
        email: faker.internet.email(),
        createdAt: faker.date.recent(),
      },
    });
  }

  // Images
  const images = [];
  for (let i = 0; i < 200; i++) {
    const image = await prisma.image.create({
      data: {
        id: uuidv4(),
        url: `https://picsum.photos/seed/${i}/200`,
      },
    });
    images.push(image);
  }

  // Courses
  for (let i = 0; i < 50; i++) {
    await prisma.course.create({
      data: {
        id: uuidv4(),
        title: faker.company.catchPhrase(),
        description: faker.lorem.sentence(),
        active: faker.datatype.boolean(),
        date: faker.date.recent(),
        iconId: images[i].id,
      },
    });
  }

  // Erasmus Courses
  for (let i = 0; i < 50; i++) {
    await prisma.erasmusCourse.create({
      data: {
        id: uuidv4(),
        title: faker.company.catchPhrase(),
        description: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(2),
        date: faker.date.recent(),
        imageId: images[50 + i].id,
      },
    });
  }

  // Erasmus Projects
  for (let i = 0; i < 50; i++) {
    await prisma.erasmusProject.create({
      data: {
        id: uuidv4(),
        title: faker.company.name(),
        url: faker.internet.url(),
        date: faker.date.recent(),
        imageId: images[100 + i].id,
      },
    });
  }

  // Posts
  const categories: Category[] = [Category.Web, Category.Facebook];
  const posts = [];
  for (let i = 0; i < 50; i++) {
    const post = await prisma.post.create({
      data: {
        id: uuidv4(),
        title: faker.lorem.words(3),
        category: categories[i % 2],
        content: faker.lorem.paragraphs(1),
        date: faker.date.recent(),
      },
    });
    posts.push(post);
  }

  // Associate 2 images per post
  for (let i = 0; i < 50; i++) {
    await prisma.image.update({
      where: { id: images[150 + i * 2].id },
      data: { postId: posts[i].id },
    });
    await prisma.image.update({
      where: { id: images[151 + i * 2].id },
      data: { postId: posts[i].id },
    });
  }

  // Videos
  for (let i = 0; i < 50; i++) {
    await prisma.video.create({
      data: {
        id: uuidv4(),
        title: faker.lorem.words(4),
        url: faker.internet.url(),
        date: faker.date.recent(),
      },
    });
  }
}

main()
  .then(() => {
    console.log('Seed completed');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
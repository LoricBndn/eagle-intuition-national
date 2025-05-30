// posts.js

const posts = Array.from({ length: 30 }, (_, i) => ({
  id: `${i + 1}`,
  title: `Titre de l'article ${i + 1}`,
  category: ['Technologie', 'Voyage', 'Cuisine', 'Santé', 'Finance'][i % 5],
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel risus eget eros fermentum dapibus. Curabitur at sem in magna consequat malesuada.',
  createdAt: `2025-05-${(i % 28 + 1).toString().padStart(2, '0')}`,
  images: [`https://picsum.photos/seed/post${i + 1}/600/400`],
}));

export default posts;

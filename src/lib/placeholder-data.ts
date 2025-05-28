const users = [
  {
    id: 1,
    name: 'Alice Dupont',
    email: 'alice@nextmail.com',
    password: 'hashedpassword123',
  },
  {
    id: 2,
    name: 'Bob Martin',
    email: 'bob@nextmail.com',
    password: 'hashedpassword456',
  },
];

const newsletters = [
  {
    id: 1,
    email: 'newsletter1@example.com',
    createdAt: '2025-05-01T10:00:00.000Z',
  },
  {
    id: 2,
    email: 'newsletter2@example.com',
    createdAt: '2025-05-10T15:30:00.000Z',
  },
];

const images = [
  {
    id: 1,
    url: '/images/course-icon-1.png',
    postId: null,
    courseIconId: 1,
    erasmusCourseImageId: null,
    erasmusProjectImageId: null,
  },
  {
    id: 2,
    url: '/images/erasmus-course-1.png',
    postId: null,
    courseIconId: null,
    erasmusCourseImageId: 1,
    erasmusProjectImageId: null,
  },
  {
    id: 3,
    url: '/images/project-1.png',
    postId: null,
    courseIconId: null,
    erasmusCourseImageId: null,
    erasmusProjectImageId: 1,
  },
  {
    id: 4,
    url: '/images/post-image-1.png',
    postId: 1,
    courseIconId: null,
    erasmusCourseImageId: null,
    erasmusProjectImageId: null,
  },
];

const courses = [
    { icon: "/icons/language.svg", title: "Cursos de Línguas" },
    { icon: "/icons/tech.svg", title: "Tecnologia & Inovação" },
    { icon: "/icons/teacher.svg", title: "Formação Pedagógica" },
    { icon: "/icons/leadership.svg", title: "Gestão e Liderança" },
    { icon: "/icons/marketing.svg", title: "Marketing Digital" },
    { icon: "/icons/accounting.svg", title: "Contabilidade" },
    { icon: "/icons/soft-skills.svg", title: "Soft Skills" },
    { icon: "/icons/web-dev.svg", title: "Desenvolvimento Web" },
    { icon: "/icons/business-language.svg", title: "Idiomas para Negócios" }, 
];

const erasmusCourses = [
{
    id: 1,
    image:
      "https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png",
    title: "Digital Tools, Gamification and AI in Education – Almada, Portugal",
    description:
      "This course explores innovative digital teaching methods using tools like Google Apps, Prezi, Voki, Moodle, and podcasting. Participants will gain practical experience with gamification strategies, Artificial Intelligence in the classroom, and the integration of Augmented Reality to enhance engagement and learning outcomes.",
    link: "/posts/future-of-ai",
  },
  {
    id: 2,
    image:
      "https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png",
    title: "Digital Tools, Gamification and AI in Education – Almada, Portugal",
    description:
      "This course explores innovative digital teaching methods using tools like Google Apps, Prezi, Voki, Moodle, and podcasting. Participants will gain practical experience with gamification strategies, Artificial Intelligence in the classroom, and the integration of Augmented Reality to enhance engagement and learning outcomes.",
    link: "/posts/future-of-ai",
  },
  {
    id: 3,
    image:
      "https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png",
    title: "Digital Tools, Gamification and AI in Education – Almada, Portugal",
    description:
      "This course explores innovative digital teaching methods using tools like Google Apps, Prezi, Voki, Moodle, and podcasting. Participants will gain practical experience with gamification strategies, Artificial Intelligence in the classroom, and the integration of Augmented Reality to enhance engagement and learning outcomes.",
    link: "/posts/future-of-ai",
  },
  {
    id: 4,
    image:
      "https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png",
    title: "Digital Tools, Gamification and AI in Education – Almada, Portugal",
    description:
      "This course explores innovative digital teaching methods using tools like Google Apps, Prezi, Voki, Moodle, and podcasting. Participants will gain practical experience with gamification strategies, Artificial Intelligence in the classroom, and the integration of Augmented Reality to enhance engagement and learning outcomes.",
    link: "/posts/future-of-ai",
  },
];

const erasmusProjects = [
{
      id: 1,
      href: "https://archive2alive.eu/",
      src: "/logosErasmusProject/a2a.png",
      alt: "A2A Project",
    },
    {
      id: 2,
      href: "https://gis4schools.eu/",
      src: "/logosErasmusProject/gis4schools.png",
      alt: "GIS4Schools Project",
    },
    {
      id: 3,
      href: "https://movieproject.org/",
      src: "/logosErasmusProject/movie.png",
      alt: "Movie Project",
    },
    {
      id: 4,
      href: "https://www.spacesuite-project.eu/",
      src: "/logosErasmusProject/spacesuite.png",
      alt: "Spacesuite Project",
    },
    {
      id: 5,
      href: "https://doityourselfproject.eu/",
      src: "/logosErasmusProject/diy.png",
      alt: "DIY Project",
    },
];

const posts = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Titre de l'article ${i + 1}`,
  category: ['Technologie', 'Voyage', 'Cuisine', 'Santé', 'Finance'][i % 5],
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel risus eget eros fermentum dapibus. Curabitur at sem in magna consequat malesuada.',
  date: `2025-05-${(i % 28 + 1).toString().padStart(2, '0')}`,
  images: [
    {
      url: `https://picsum.photos/seed/post${i + 1}/600/400`,
      alt: `Image pour article ${i + 1}`,
    },
  ],
  link: `/posts/${i + 1}`,
}));

const videos = [
  {
    id: 1,
    title: 'Introduction to Erasmus+',
    url: 'https://video.example.com/erasmus-intro',
    date: '2025-05-17T12:00:00.000Z',
  },
  {
    id: 2,
    title: 'Life in Lisbon',
    url: 'https://video.example.com/lisbon-life',
    date: '2025-05-19T14:00:00.000Z',
  },
];

export {
  users,
  newsletters,
  images,
  courses,
  erasmusCourses,
  erasmusProjects,
  posts,
  videos,
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Newsletter = {
  id: string;
  email: string;
  createdAt: string;
};

export type Course = {
  id: string;
  title: string;
  createdAt: string;
  iconUrl: string;
};

export type Post = {
  id: string;
  category: 'Web' | 'Facebook';
  content: string;
  createdAt: string;
  imagesUrl: string[];
};

export type ErasmusCourse = {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  imageUrl: string;
};

export type ErasmusProject = {
  id: string;
  title: string;
  url: string;
  createdAt: string;
  imageUrl: string;
};

export type Video = {
  id: string;
  title: string;
  url: string;
  createdAt: string;
};
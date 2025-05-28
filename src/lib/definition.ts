export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type Newsletter = {
  id: number;
  email: string;
  createdAt: string;
};

export type Image = {
  id: number;
  url: string;
  postId?: number;
  courseIconId?: number;
  erasmusCourseImageId?: number;
  erasmusProjectImageId?: number;
};

export type Post = {
  id: number;
  title: string;
  category: string;
  content: string;
  date: string;
  images: Image[];
};

export type Course = {
  id: number;
  title: string;
  description: string;
  date: string;
  iconId: number;
  icon: Image;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestCourse = {
  id: number;
  title: string;
  image_url: string;
  description: string;
  date: string;
};

export type LatestCourseRaw = Omit<LatestCourse, 'date'> & {
  date: Date;
};

export type CoursesTable = {
  id: number;
  title: string;
  description: string;
  date: string;
  iconId: number;
  iconUrl: string;
};

export type PostsTableType = {
  id: number;
  title: string;
  category: string;
  date: string;
  imageCount: number;
};

export type FormattedPostsTable = {
  id: number;
  title: string;
  category: string;
  date: string;
  imageCount: number;
};

export type PostField = {
  id: number;
  title: string;
};

export type CourseForm = {
  id: number;
  title: string;
  description: string;
  iconId: number;
};

export type ErasmusCourse = {
  id: number;
  title: string;
  description: string;
  content: string;
  date: string;
  imageId: number;
  image: Image;
};

export type ErasmusCourseTable = {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
};

export type ErasmusCourseForm = {
  id: number;
  title: string;
  description: string;
  content: string;
  imageId: number;
};

export type ErasmusProject = {
  id: number;
  title: string;
  url: string;
  date: string;
  imageId: number;
  image: Image;
};

export type ErasmusProjectTable = {
  id: number;
  title: string;
  url: string;
  date: string;
  imageUrl: string;
};

export type ErasmusProjectForm = {
  id: number;
  title: string;
  url: string;
  imageId: number;
};

export type Video = {
  id: number;
  title: string;
  url: string;
  date: string;
};

export type VideoTable = {
  id: number;
  title: string;
  url: string;
  date: string;
};

export type VideoForm = {
  id: number;
  title: string;
  url: string;
};
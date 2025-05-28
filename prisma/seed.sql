-- Extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users
INSERT INTO "User" (id, name, email, password)
SELECT uuid_generate_v4(), 'User ' || i, 'user' || i || '@mail.com', 'password' || i
FROM generate_series(1, 50) AS s(i);

-- Newsletters
INSERT INTO "Newsletter" (id, email, "createdAt")
SELECT uuid_generate_v4(), 'newsletter' || i || '@mail.com', now() - (i || ' days')::interval
FROM generate_series(1, 50) AS s(i);

-- Images (200)
INSERT INTO "Image" (id, url)
SELECT uuid_generate_v4(), 'https://picsum.photos/seed/' || i || '/200'
FROM generate_series(1, 200) AS s(i);

-- Courses (50) — utilise images 1 à 50
INSERT INTO "Course" (id, title, description, active, date, "iconId")
SELECT uuid_generate_v4(), 'Course ' || i, 'Description ' || i, (i % 2 = 0), now() - (i || ' days')::interval, img.id
FROM generate_series(1, 50) AS s(i)
JOIN (
  SELECT id, row_number() OVER () AS rn FROM "Image"
) AS img ON img.rn = i;

-- ErasmusCourses (50) — utilise images 51 à 100
INSERT INTO "ErasmusCourse" (id, title, description, content, date, "imageId")
SELECT uuid_generate_v4(), 'ErasmusCourse ' || i, 'Description ' || i, 'Content ' || i, now() - (i || ' days')::interval, img.id
FROM generate_series(1, 50) AS s(i)
JOIN (
  SELECT id, row_number() OVER () AS rn FROM "Image"
) AS img ON img.rn = 50 + i;

-- ErasmusProjects (50) — utilise images 101 à 150
INSERT INTO "ErasmusProject" (id, title, url, date, "imageId")
SELECT uuid_generate_v4(), 'ErasmusProject ' || i, 'https://project' || i || '.com', now() - (i || ' days')::interval, img.id
FROM generate_series(1, 50) AS s(i)
JOIN (
  SELECT id, row_number() OVER () AS rn FROM "Image"
) AS img ON img.rn = 100 + i;

-- Posts (50)
INSERT INTO "Post" (id, title, category, content, date)
SELECT uuid_generate_v4(), 'Post ' || i, CASE WHEN i % 2 = 0 THEN 'Web' ELSE 'Facebook' END, 'Content ' || i, now() - (i || ' days')::interval
FROM generate_series(1, 50) AS s(i);

-- Associer 2 images à chaque post (images 151–200)
DO $$
DECLARE
  post_ids UUID[];
  img_ids UUID[];
BEGIN
  SELECT array_agg(id) INTO post_ids FROM "Post";
  SELECT array_agg(id) INTO img_ids FROM (
    SELECT id FROM "Image" ORDER BY id OFFSET 150 LIMIT 100
  ) sub;

  FOR i IN 1..50 LOOP
    UPDATE "Image" SET "postId" = post_ids[i] WHERE id = img_ids[(i-1)*2 + 1];
    UPDATE "Image" SET "postId" = post_ids[i] WHERE id = img_ids[(i-1)*2 + 2];
  END LOOP;
END $$;

-- Videos (50)
INSERT INTO "Video" (id, title, url, date)
SELECT uuid_generate_v4(), 'Video ' || i, 'https://video' || i || '.com', now() - (i || ' days')::interval
FROM generate_series(1, 50) AS s(i);

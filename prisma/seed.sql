-- 1. Newsletter
INSERT INTO "Newsletter" (email, "createdAt") VALUES
  ('user1@example.com', NOW()), ('user2@example.com', NOW()), ('user3@example.com', NOW()),
  ('user4@example.com', NOW()), ('user5@example.com', NOW()), ('user6@example.com', NOW()),
  ('user7@example.com', NOW()), ('user8@example.com', NOW()), ('user9@example.com', NOW()),
  ('user10@example.com', NOW()), ('user11@example.com', NOW()), ('user12@example.com', NOW()),
  ('user13@example.com', NOW()), ('user14@example.com', NOW()), ('user15@example.com', NOW()),
  ('user16@example.com', NOW()), ('user17@example.com', NOW()), ('user18@example.com', NOW()),
  ('user19@example.com', NOW()), ('user20@example.com', NOW()), ('user21@example.com', NOW());

-- 2. Image (noter les IDs pour relations)
INSERT INTO "Image" (url) VALUES
  ('https://cdn.example.com/images/1.jpg'),  ('https://cdn.example.com/images/2.jpg'),
  ('https://cdn.example.com/images/3.jpg'),  ('https://cdn.example.com/images/4.jpg'),
  ('https://cdn.example.com/images/5.jpg'),  ('https://cdn.example.com/images/6.jpg'),
  ('https://cdn.example.com/images/7.jpg'),  ('https://cdn.example.com/images/8.jpg'),
  ('https://cdn.example.com/images/9.jpg'),  ('https://cdn.example.com/images/10.jpg'),
  ('https://cdn.example.com/images/11.jpg'), ('https://cdn.example.com/images/12.jpg'),
  ('https://cdn.example.com/images/13.jpg'), ('https://cdn.example.com/images/14.jpg'),
  ('https://cdn.example.com/images/15.jpg'), ('https://cdn.example.com/images/16.jpg'),
  ('https://cdn.example.com/images/17.jpg'), ('https://cdn.example.com/images/18.jpg'),
  ('https://cdn.example.com/images/19.jpg'), ('https://cdn.example.com/images/20.jpg'),
  ('https://cdn.example.com/images/21.jpg');

-- 3. Course (iconId = id d'une Image entre 1 et 21)
INSERT INTO "Course" (title, description, date, "iconId") VALUES
  ('Course 1', 'Description of Course 1', NOW(), 1),
  ('Course 2', 'Description of Course 2', NOW(), 2),
  ('Course 3', 'Description of Course 3', NOW(), 3),
  ('Course 4', 'Description of Course 4', NOW(), 4),
  ('Course 5', 'Description of Course 5', NOW(), 5),
  ('Course 6', 'Description of Course 6', NOW(), 6),
  ('Course 7', 'Description of Course 7', NOW(), 7),
  ('Course 8', 'Description of Course 8', NOW(), 8),
  ('Course 9', 'Description of Course 9', NOW(), 9),
  ('Course 10', 'Description of Course 10', NOW(), 10),
  ('Course 11', 'Description of Course 11', NOW(), 11),
  ('Course 12', 'Description of Course 12', NOW(), 12),
  ('Course 13', 'Description of Course 13', NOW(), 13),
  ('Course 14', 'Description of Course 14', NOW(), 14),
  ('Course 15', 'Description of Course 15', NOW(), 15),
  ('Course 16', 'Description of Course 16', NOW(), 16),
  ('Course 17', 'Description of Course 17', NOW(), 17),
  ('Course 18', 'Description of Course 18', NOW(), 18),
  ('Course 19', 'Description of Course 19', NOW(), 19),
  ('Course 20', 'Description of Course 20', NOW(), 20);

-- 4. ErasmusCourse (imageId entre 1 et 21, ne pas réutiliser ceux déjà utilisés comme iconId)
INSERT INTO "ErasmusCourse" (title, description, content, date, "imageId") VALUES
  ('Erasmus A', 'Short desc A', 'Content A', NOW(), 21),
  ('Erasmus B', 'Short desc B', 'Content B', NOW(), 11),
  ('Erasmus C', 'Short desc C', 'Content C', NOW(), 12),
  ('Erasmus D', 'Short desc D', 'Content D', NOW(), 13),
  ('Erasmus E', 'Short desc E', 'Content E', NOW(), 14),
  ('Erasmus F', 'Short desc F', 'Content F', NOW(), 15),
  ('Erasmus G', 'Short desc G', 'Content G', NOW(), 16),
  ('Erasmus H', 'Short desc H', 'Content H', NOW(), 17),
  ('Erasmus I', 'Short desc I', 'Content I', NOW(), 18),
  ('Erasmus J', 'Short desc J', 'Content J', NOW(), 19),
  ('Erasmus K', 'Short desc K', 'Content K', NOW(), 20),
  ('Erasmus L', 'Short desc L', 'Content L', NOW(), 3),
  ('Erasmus M', 'Short desc M', 'Content M', NOW(), 4),
  ('Erasmus N', 'Short desc N', 'Content N', NOW(), 5),
  ('Erasmus O', 'Short desc O', 'Content O', NOW(), 6),
  ('Erasmus P', 'Short desc P', 'Content P', NOW(), 7),
  ('Erasmus Q', 'Short desc Q', 'Content Q', NOW(), 8),
  ('Erasmus R', 'Short desc R', 'Content R', NOW(), 9),
  ('Erasmus S', 'Short desc S', 'Content S', NOW(), 10),
  ('Erasmus T', 'Short desc T', 'Content T', NOW(), 2);

-- 5. ErasmusProject (imageId entre 1–21, uniques aussi)
INSERT INTO "ErasmusProject" (title, url, date, "imageId") VALUES
  ('Project A', 'https://project.com/a', NOW(), 1),
  ('Project B', 'https://project.com/b', NOW(), 2),
  ('Project C', 'https://project.com/c', NOW(), 3),
  ('Project D', 'https://project.com/d', NOW(), 4),
  ('Project E', 'https://project.com/e', NOW(), 5),
  ('Project F', 'https://project.com/f', NOW(), 6),
  ('Project G', 'https://project.com/g', NOW(), 7),
  ('Project H', 'https://project.com/h', NOW(), 8),
  ('Project I', 'https://project.com/i', NOW(), 9),
  ('Project J', 'https://project.com/j', NOW(), 10),
  ('Project K', 'https://project.com/k', NOW(), 11),
  ('Project L', 'https://project.com/l', NOW(), 12),
  ('Project M', 'https://project.com/m', NOW(), 13),
  ('Project N', 'https://project.com/n', NOW(), 14),
  ('Project O', 'https://project.com/o', NOW(), 15),
  ('Project P', 'https://project.com/p', NOW(), 16),
  ('Project Q', 'https://project.com/q', NOW(), 17),
  ('Project R', 'https://project.com/r', NOW(), 18),
  ('Project S', 'https://project.com/s', NOW(), 19),
  ('Project T', 'https://project.com/t', NOW(), 20);

-- 6. Post
INSERT INTO "Post" (title, category, content, date) VALUES
  ('Post 1', 'News', 'Content of post 1', NOW()),
  ('Post 2', 'Event', 'Content of post 2', NOW()),
  ('Post 3', 'News', 'Content of post 3', NOW()),
  ('Post 4', 'Event', 'Content of post 4', NOW()),
  ('Post 5', 'Blog', 'Content of post 5', NOW()),
  ('Post 6', 'News', 'Content of post 6', NOW()),
  ('Post 7', 'Event', 'Content of post 7', NOW()),
  ('Post 8', 'Blog', 'Content of post 8', NOW()),
  ('Post 9', 'News', 'Content of post 9', NOW()),
  ('Post 10', 'Event', 'Content of post 10', NOW()),
  ('Post 11', 'Blog', 'Content of post 11', NOW()),
  ('Post 12', 'News', 'Content of post 12', NOW()),
  ('Post 13', 'Event', 'Content of post 13', NOW()),
  ('Post 14', 'Blog', 'Content of post 14', NOW()),
  ('Post 15', 'News', 'Content of post 15', NOW()),
  ('Post 16', 'Event', 'Content of post 16', NOW()),
  ('Post 17', 'Blog', 'Content of post 17', NOW()),
  ('Post 18', 'News', 'Content of post 18', NOW()),
  ('Post 19', 'Event', 'Content of post 19', NOW()),
  ('Post 20', 'Blog', 'Content of post 20', NOW());

-- Lier les images aux posts (1 image par post)
UPDATE "Image" SET "postId" = 1 WHERE id = 1;
UPDATE "Image" SET "postId" = 2 WHERE id = 2;
UPDATE "Image" SET "postId" = 3 WHERE id = 3;
UPDATE "Image" SET "postId" = 4 WHERE id = 4;
UPDATE "Image" SET "postId" = 5 WHERE id = 5;
UPDATE "Image" SET "postId" = 6 WHERE id = 6;
UPDATE "Image" SET "postId" = 7 WHERE id = 7;
UPDATE "Image" SET "postId" = 8 WHERE id = 8;
UPDATE "Image" SET "postId" = 9 WHERE id = 9;
UPDATE "Image" SET "postId" = 10 WHERE id = 10;
UPDATE "Image" SET "postId" = 11 WHERE id = 11;
UPDATE "Image" SET "postId" = 12 WHERE id = 12;
UPDATE "Image" SET "postId" = 13 WHERE id = 13;
UPDATE "Image" SET "postId" = 14 WHERE id = 14;
UPDATE "Image" SET "postId" = 15 WHERE id = 15;
UPDATE "Image" SET "postId" = 16 WHERE id = 16;
UPDATE "Image" SET "postId" = 17 WHERE id = 17;
UPDATE "Image" SET "postId" = 18 WHERE id = 18;
UPDATE "Image" SET "postId" = 19 WHERE id = 19;
UPDATE "Image" SET "postId" = 20 WHERE id = 20;

-- 7. Video
INSERT INTO "Video" (title, url, date) VALUES
  ('Video 1', 'https://cdn.example.com/videos/v1.mp4', NOW()),
  ('Video 2', 'https://cdn.example.com/videos/v2.mp4', NOW()),
  ('Video 3', 'https://cdn.example.com/videos/v3.mp4', NOW()),
  ('Video 4', 'https://cdn.example.com/videos/v4.mp4', NOW()),
  ('Video 5', 'https://cdn.example.com/videos/v5.mp4', NOW()),
  ('Video 6', 'https://cdn.example.com/videos/v6.mp4', NOW()),
  ('Video 7', 'https://cdn.example.com/videos/v7.mp4', NOW()),
  ('Video 8', 'https://cdn.example.com/videos/v8.mp4', NOW()),
  ('Video 9', 'https://cdn.example.com/videos/v9.mp4', NOW()),
  ('Video 10', 'https://cdn.example.com/videos/v10.mp4', NOW()),
  ('Video 11', 'https://cdn.example.com/videos/v11.mp4', NOW()),
  ('Video 12', 'https://cdn.example.com/videos/v12.mp4', NOW()),
  ('Video 13', 'https://cdn.example.com/videos/v13.mp4', NOW()),
  ('Video 14', 'https://cdn.example.com/videos/v14.mp4', NOW()),
  ('Video 15', 'https://cdn.example.com/videos/v15.mp4', NOW()),
  ('Video 16', 'https://cdn.example.com/videos/v16.mp4', NOW()),
  ('Video 17', 'https://cdn.example.com/videos/v17.mp4', NOW()),
  ('Video 18', 'https://cdn.example.com/videos/v18.mp4', NOW()),
  ('Video 19', 'https://cdn.example.com/videos/v19.mp4', NOW()),
  ('Video 20', 'https://cdn.example.com/videos/v20.mp4', NOW());


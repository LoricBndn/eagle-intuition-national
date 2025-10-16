/*
  Warnings:

  - The values [national,international] on the enum `CategoryNewsletter` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `content` on the `ErasmusCourse` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pdf]` on the table `ErasmusCourse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `ErasmusCourse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `ErasmusProject` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `Video` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageUrl]` on the table `Video` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pdf` to the `ErasmusCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `ErasmusCourse` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `imageUrl` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryPost" AS ENUM ('Web', 'National', 'International');

-- AlterEnum
BEGIN;
CREATE TYPE "CategoryNewsletter_new" AS ENUM ('National', 'International');
ALTER TABLE "Newsletter" ALTER COLUMN "category" TYPE "CategoryNewsletter_new" USING ("category"::text::"CategoryNewsletter_new");
ALTER TYPE "CategoryNewsletter" RENAME TO "CategoryNewsletter_old";
ALTER TYPE "CategoryNewsletter_new" RENAME TO "CategoryNewsletter";
DROP TYPE "public"."CategoryNewsletter_old";
COMMIT;

-- AlterTable
ALTER TABLE "ErasmusCourse" DROP COLUMN "content",
ADD COLUMN     "pdf" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "title",
ADD COLUMN     "url" TEXT,
DROP COLUMN "category",
ADD COLUMN     "category" "CategoryPost" NOT NULL;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- DropEnum
DROP TYPE "public"."Category";

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partner_url_key" ON "Partner"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Partner_imageUrl_key" ON "Partner"("imageUrl");

-- CreateIndex
CREATE UNIQUE INDEX "ErasmusCourse_pdf_key" ON "ErasmusCourse"("pdf");

-- CreateIndex
CREATE UNIQUE INDEX "ErasmusCourse_url_key" ON "ErasmusCourse"("url");

-- CreateIndex
CREATE UNIQUE INDEX "ErasmusProject_url_key" ON "ErasmusProject"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Post_url_key" ON "Post"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Video_url_key" ON "Video"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Video_imageUrl_key" ON "Video"("imageUrl");

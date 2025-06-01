/*
  Warnings:

  - Added the required column `category` to the `Newsletter` table without a default value. This is not possible if the table is not empty.
  - Made the column `slug` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "CategoryNewsletter" AS ENUM ('national', 'international');

-- AlterTable
ALTER TABLE "Newsletter" ADD COLUMN     "category" "CategoryNewsletter" NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "slug" SET DATA TYPE TEXT;

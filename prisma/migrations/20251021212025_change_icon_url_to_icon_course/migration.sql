/*
  Warnings:

  - You are about to drop the column `iconUrl` on the `Course` table. All the data in the column will be lost.
  - Added the required column `icon` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Course_iconUrl_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "iconUrl",
ADD COLUMN     "icon" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `descdescription` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `ubdatedAt` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `ubdatedAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `emil` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ubdatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_emil_key";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "descdescription",
DROP COLUMN "ubdatedAt",
ADD COLUMN     "description" VARCHAR(300) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "ubdatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emil",
DROP COLUMN "ubdatedAt",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

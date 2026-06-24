/*
  Warnings:

  - Made the column `overview` on table `media` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "media" ALTER COLUMN "overview" SET NOT NULL;

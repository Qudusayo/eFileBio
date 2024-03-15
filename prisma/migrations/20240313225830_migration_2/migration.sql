/*
  Warnings:

  - You are about to drop the column `description` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "version" SERIAL NOT NULL;

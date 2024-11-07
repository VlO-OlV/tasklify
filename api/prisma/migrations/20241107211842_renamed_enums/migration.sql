/*
  Warnings:

  - Changed the type of `user_role` on the `board_users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `priority` on the `tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'EXTREME');

-- CreateEnum
CREATE TYPE "BoardRole" AS ENUM ('ADMIN', 'MODERATOR', 'CONTRIBUTOR');

-- AlterTable
ALTER TABLE "board_users" DROP COLUMN "user_role",
ADD COLUMN     "user_role" "BoardRole" NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "priority",
ADD COLUMN     "priority" "Priority" NOT NULL;

-- DropEnum
DROP TYPE "BoardRoles";

-- DropEnum
DROP TYPE "Priorities";

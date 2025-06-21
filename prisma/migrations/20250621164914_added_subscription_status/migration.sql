-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'PAUSED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

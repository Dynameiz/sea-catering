/*
  Warnings:

  - You are about to drop the column `mealPlanId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `meals` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the `MealPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_mealPlanId_fkey";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "mealPlanId",
DROP COLUMN "meals",
ADD COLUMN     "mealPlan" TEXT[],
ADD COLUMN     "mealType" TEXT[];

-- DropTable
DROP TABLE "MealPlan";

/*
  Warnings:

  - You are about to drop the `DeliveryDay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MealType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DeliveryDay" DROP CONSTRAINT "DeliveryDay_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "MealType" DROP CONSTRAINT "MealType_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "deliveryDays" TEXT[],
ADD COLUMN     "meals" TEXT[];

-- DropTable
DROP TABLE "DeliveryDay";

-- DropTable
DROP TABLE "MealType";

/*
  Warnings:

  - You are about to drop the column `permission` on the `RolePermission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roleId,permissionId]` on the table `RolePermission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `permissionId` to the `RolePermission` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "RolePermission_roleId_permission_key";

-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "category" TEXT;

-- AlterTable
ALTER TABLE "RolePermission" DROP COLUMN "permission",
ADD COLUMN     "permissionId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "UserPermission";

-- DropEnum
DROP TYPE "UserRole";

-- CreateIndex
CREATE UNIQUE INDEX "RolePermission_roleId_permissionId_key" ON "RolePermission"("roleId", "permissionId");

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

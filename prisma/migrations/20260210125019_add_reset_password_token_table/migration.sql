-- CreateTable
CREATE TABLE "Reset_password_token" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reset_password_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reset_password_token_token_key" ON "Reset_password_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Reset_password_token_id_token_key" ON "Reset_password_token"("id", "token");

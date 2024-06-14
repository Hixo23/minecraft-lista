ALTER TABLE "servers" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "servers" ADD CONSTRAINT "servers_address_unique" UNIQUE("address");
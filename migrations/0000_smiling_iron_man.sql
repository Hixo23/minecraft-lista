CREATE TABLE IF NOT EXISTS "servers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"address" text NOT NULL,
	"versions" text NOT NULL,
	"description" text
);

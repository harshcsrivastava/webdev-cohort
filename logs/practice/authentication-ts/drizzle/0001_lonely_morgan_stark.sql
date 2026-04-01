DO $$
BEGIN
	CREATE TYPE "role" AS ENUM('customer', 'seller', 'admin');
EXCEPTION
	WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "users" ADD COLUMN "role" "role" DEFAULT 'customer' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "verification_token" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "refresh_token" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "reset_password_token" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "reset_password_expires" timestamp;
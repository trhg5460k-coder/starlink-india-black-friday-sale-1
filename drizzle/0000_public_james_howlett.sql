CREATE TABLE `admin_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`email` text NOT NULL,
	`full_name` text NOT NULL,
	`role` text DEFAULT 'admin' NOT NULL,
	`is_active` integer DEFAULT true,
	`last_login_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_users_username_unique` ON `admin_users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `admin_users_email_unique` ON `admin_users` (`email`);--> statement-breakpoint
CREATE TABLE `email_templates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`template_name` text NOT NULL,
	`template_subject` text NOT NULL,
	`template_body` text NOT NULL,
	`variables` text NOT NULL,
	`is_active` integer DEFAULT true,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `email_templates_template_name_unique` ON `email_templates` (`template_name`);--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_number` text NOT NULL,
	`customer_first_name` text NOT NULL,
	`customer_last_name` text NOT NULL,
	`customer_email` text NOT NULL,
	`customer_phone` text NOT NULL,
	`customer_address` text NOT NULL,
	`customer_city` text NOT NULL,
	`customer_state` text,
	`customer_pincode` text NOT NULL,
	`service_type` text NOT NULL,
	`plan_id` text NOT NULL,
	`plan_name` text NOT NULL,
	`plan_speed` text NOT NULL,
	`plan_price` integer NOT NULL,
	`device_price` integer NOT NULL,
	`total_paid` integer NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`payment_status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`shipped_at` text,
	`delivered_at` text,
	`notes` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_order_number_unique` ON `orders` (`order_number`);--> statement-breakpoint
CREATE TABLE `plans` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`plan_id` text NOT NULL,
	`name` text NOT NULL,
	`speed` text NOT NULL,
	`original_price` integer NOT NULL,
	`discounted_price` integer NOT NULL,
	`discount_percentage` integer NOT NULL,
	`features` text NOT NULL,
	`is_popular` integer DEFAULT false,
	`is_active` integer DEFAULT true,
	`display_order` integer DEFAULT 0,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `plans_plan_id_unique` ON `plans` (`plan_id`);
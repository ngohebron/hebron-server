CREATE TABLE `admin` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `admin_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `donation` (
	`donation_id` int AUTO_INCREMENT NOT NULL,
	`donor_id` int NOT NULL,
	`amount` numeric NOT NULL,
	`currency` text NOT NULL,
	`status` text NOT NULL,
	`payment_gateway` text,
	`payment_order_id` text,
	`payment_txn_id` text,
	`message` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `donation_donation_id` PRIMARY KEY(`donation_id`)
);
--> statement-breakpoint
CREATE TABLE `donation_receipts` (
	`receipt_id` int AUTO_INCREMENT NOT NULL,
	`donation_id` int NOT NULL,
	`receipt_number` text NOT NULL,
	`receipt_url` text NOT NULL,
	`issued_on` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `donation_receipts_receipt_id` PRIMARY KEY(`receipt_id`)
);
--> statement-breakpoint
CREATE TABLE `donner` (
	`doner_id` int AUTO_INCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `donner_doner_id` PRIMARY KEY(`doner_id`)
);
--> statement-breakpoint
CREATE TABLE `event_images` (
	`image_id` int AUTO_INCREMENT NOT NULL,
	`event_id` int NOT NULL,
	`image_url` varchar(500) NOT NULL,
	`caption` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `event_images_image_id` PRIMARY KEY(`image_id`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`event_id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`output` text,
	`event_date` date,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_event_id` PRIMARY KEY(`event_id`)
);
--> statement-breakpoint
ALTER TABLE `donation` ADD CONSTRAINT `donation_donor_id_donner_doner_id_fk` FOREIGN KEY (`donor_id`) REFERENCES `donner`(`doner_id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `donation_receipts` ADD CONSTRAINT `donation_receipts_donation_id_donation_donation_id_fk` FOREIGN KEY (`donation_id`) REFERENCES `donation`(`donation_id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `event_images` ADD CONSTRAINT `event_images_event_id_events_event_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`event_id`) ON DELETE cascade ON UPDATE no action;
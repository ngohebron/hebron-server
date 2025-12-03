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
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_event_id` PRIMARY KEY(`event_id`)
);
--> statement-breakpoint
ALTER TABLE `event_images` ADD CONSTRAINT `event_images_event_id_events_event_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`event_id`) ON DELETE cascade ON UPDATE no action;
DROP DATABASE IF EXISTS airbnb;
CREATE DATABASE airbnb;
USE airbnb;

DROP TABLE IF EXISTS `listings`;
    
CREATE TABLE `listings` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `num_guests` INTEGER NOT NULL,
  `bedrooms` INTEGER NOT NULL,
  `bathrooms` INTEGER NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(3072) NULL DEFAULT NULL,
  `summary` VARCHAR(1024) NULL DEFAULT NULL,
  `neighborhood` VARCHAR(100) NULL DEFAULT NULL,
  `street_address` VARCHAR(255) NOT NULL,
  `zip_code` INTEGER NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(25) NOT NULL,
  `cancellation_policy` VARCHAR(255) NOT NULL,
  `nightly_price` INTEGER NOT NULL,
  `pic_url` VARCHAR(255) NULL DEFAULT NULL,
  `rating` INTEGER NOT NULL,
  `host_id` INTEGER NOT NULL,
  `lat` VARCHAR(30) NOT NULL,
  `lng` VARCHAR(30) NOT NULL,
  `images` VARCHAR(3072) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `bookings`;
    
CREATE TABLE `bookings` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `listing_id` INTEGER NOT NULL,
  `user_id` INTEGER NOT NULL,
  `startDate` DATE NULL DEFAULT NULL,
  `endDate` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `bookings` ADD CONSTRAINT id_date UNIQUE(listing_id, user_id, startDate, endDate);

DROP TABLE IF EXISTS `users`;
    
CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phoneNumber` VARCHAR(10) NOT NULL,
  `location` VARCHAR(50) NULL DEFAULT NULL,
  `bio` VARCHAR(255) NULL DEFAULT NULL,
  `picture` VARCHAR(50) NULL DEFAULT NULL,
  `tagline` VARCHAR(100) NULL DEFAULT NULL,
  `displayName` VARCHAR(255) NULL DEFAULT NULL,
  `joinedDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `reviews` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL,
  `host_id` INTEGER NOT NULL,
  `reviewText` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `searches`;

CREATE TABLE `searches` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `query` VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
);

ALTER TABLE `bookings` ADD FOREIGN KEY (listing_id) REFERENCES `listings` (`id`);
ALTER TABLE `bookings` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `listings` ADD FOREIGN KEY (host_id) REFERENCES `users` (`id`);
ALTER TABLE `reviews` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `reviews` ADD FOREIGN KEY (host_id) REFERENCES `users` (`id`);


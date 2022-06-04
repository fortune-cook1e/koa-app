/*
 Navicat Premium Data Transfer

 Source Server         : koa-app
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : koa-app

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 04/06/2022 21:49:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `age` int DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `gender` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `age`, `password`, `salt`, `username`, `gender`) VALUES (4, NULL, '$2b$10$Wscb0wY6Z2zbnQfqeZqb7OJPYFNe.f/uiCx5IEeN2x8D3ttw1DrZ.', '$2b$10$Wscb0wY6Z2zbnQfqeZqb7O', 'gaoliang', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

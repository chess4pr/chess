# ************************************************************
# Sequel Pro SQL dump
# Версия 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Адрес: 127.0.0.1 (MySQL 5.1.44)
# Схема: chess
# Время создания: 2014-11-01 08:44:54 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Дамп таблицы chess_games
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chess_games`;

CREATE TABLE `chess_games` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'уникальный номер игры id',
  `start_time` datetime DEFAULT NULL COMMENT 'начало игры',
  `end_time` datetime DEFAULT NULL COMMENT 'окончание игры',
  `winner` int(11) DEFAULT NULL COMMENT 'победитель пользователь id',
  `type` enum('long','short') CHARACTER SET latin1 DEFAULT NULL COMMENT 'тип игры (лимитированная по времени или нет)',
  PRIMARY KEY (`id`),
  KEY `FK_user_id` (`winner`),
  CONSTRAINT `FK_user_id` FOREIGN KEY (`winner`) REFERENCES `chess_users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Дамп таблицы chess_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chess_log`;

CREATE TABLE `chess_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'уникальный id записи',
  `user_id` int(11) DEFAULT NULL COMMENT 'пользователь id',
  `game_id` int(11) DEFAULT NULL COMMENT 'в какой игре сделан ход',
  `figure` enum('Б_K','Б_Ф','Б_Б','Б_О','Б_Л','Б_П','Ч_K','Ч_Ф','Ч_Б','Ч_O','Ч_Л','Ч_П') DEFAULT NULL COMMENT 'какую фигуру переместили',
  `figure_place` varchar(10) DEFAULT NULL COMMENT 'на какое место поставили',
  `step_time` datetime DEFAULT NULL COMMENT 'в какое время сделан был ход',
  `figure_id` int(11) DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `game_key` (`game_id`),
  KEY `FK_user` (`user_id`),
  CONSTRAINT `chess_log_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `chess_games` (`id`),
  CONSTRAINT `FK_user` FOREIGN KEY (`user_id`) REFERENCES `chess_users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Дамп таблицы chess_post
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chess_post`;

CREATE TABLE `chess_post` (
  `id` char(40) NOT NULL DEFAULT '',
  `chat_id` char(40) DEFAULT NULL,
  `post_identity` char(40) DEFAULT NULL,
  `owner` char(20) DEFAULT NULL,
  `created` bigint(30) DEFAULT NULL,
  `text` blob,
  `data` blob,
  PRIMARY KEY (`id`),
  KEY `yiichat_chat_id` (`chat_id`),
  KEY `yiichat_chat_id_identity` (`chat_id`,`post_identity`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `chess_post` WRITE;
/*!40000 ALTER TABLE `chess_post` DISABLE KEYS */;

INSERT INTO `chess_post` (`id`, `chat_id`, `post_identity`, `owner`, `created`, `text`, `data`)
VALUES
	('1c8dd60b5ef9a19ee7e35e3e0c6ef49b306a2bbd','123','1','admin',1414466221,X'D09FD180D0B8D0B2D0B5D182',X'733A383A22616E792064617461223B'),
	('232e042e9707cc7ed35fe571b9f94032ff41dd19','123','1','admin',1414363125,X'D0BFD180D0B8D0B2D0B5D182',X'733A383A22616E792064617461223B'),
	('6fa604add84ab72f9d47ab3d17b898f31d967f03','123','2','demo',1414363118,X'D0BFD180D0B8D0B2D0B5D182',X'733A383A22616E792064617461223B'),
	('735039cfe1340a0d8bd33b9afc8766fa27a06f03','123','1','admin',1414648483,X'63686174',X'733A383A22616E792064617461223B'),
	('746a7332468b3b6fbd066dc3bb744a3cbb644d7f','123','1','admin',1414470433,X'7265666163746F722064622063686573735F706F7374',X'733A383A22616E792064617461223B'),
	('91e9e949cac2f371e12a690117ae7940eb33b521','123','1','admin',1414363218,X'D0B1D0B5D0BBD18BD0BC',X'733A383A22616E792064617461223B'),
	('a51b1f68f7bb737ff7f46bbcdc63a46713731cdf','123','2','demo',1414363197,X'D09AD0B0D0BAD0B8D0BC20D186D0B2D0B5D182D0BED0BC20D0B1D183D0B4D0B5D188D18C20D0B8D0B3D180D0B0D182D18C3F',X'733A383A22616E792064617461223B'),
	('d7722a69022cef044371404c8c98a5686579e8cb','123','1','admin',1414582939,X'6869',X'733A383A22616E792064617461223B');

/*!40000 ALTER TABLE `chess_post` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы chess_profiles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chess_profiles`;

CREATE TABLE `chess_profiles` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(50) NOT NULL DEFAULT '',
  `firstname` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_profile_id` FOREIGN KEY (`user_id`) REFERENCES `chess_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `chess_profiles` WRITE;
/*!40000 ALTER TABLE `chess_profiles` DISABLE KEYS */;

INSERT INTO `chess_profiles` (`user_id`, `lastname`, `firstname`)
VALUES
	(1,'Admin','Administrator'),
	(2,'Demo','Demo');

/*!40000 ALTER TABLE `chess_profiles` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы chess_profiles_fields
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chess_profiles_fields`;

CREATE TABLE `chess_profiles_fields` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `varname` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `field_type` varchar(50) NOT NULL,
  `field_size` varchar(15) NOT NULL DEFAULT '0',
  `field_size_min` varchar(15) NOT NULL DEFAULT '0',
  `required` int(1) NOT NULL DEFAULT '0',
  `match` varchar(255) NOT NULL DEFAULT '',
  `range` varchar(255) NOT NULL DEFAULT '',
  `error_message` varchar(255) NOT NULL DEFAULT '',
  `other_validator` varchar(5000) NOT NULL DEFAULT '',
  `default` varchar(255) NOT NULL DEFAULT '',
  `widget` varchar(255) NOT NULL DEFAULT '',
  `widgetparams` varchar(5000) NOT NULL DEFAULT '',
  `position` int(3) NOT NULL DEFAULT '0',
  `visible` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `varname` (`varname`,`widget`,`visible`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `chess_profiles_fields` WRITE;
/*!40000 ALTER TABLE `chess_profiles_fields` DISABLE KEYS */;

INSERT INTO `chess_profiles_fields` (`id`, `varname`, `title`, `field_type`, `field_size`, `field_size_min`, `required`, `match`, `range`, `error_message`, `other_validator`, `default`, `widget`, `widgetparams`, `position`, `visible`)
VALUES
	(1,'lastname','Last Name','VARCHAR','50','3',1,'','','Incorrect Last Name (length between 3 and 50 characters).','','','','',1,3),
	(2,'firstname','First Name','VARCHAR','50','3',1,'','','Incorrect First Name (length between 3 and 50 characters).','','','','',0,3);

/*!40000 ALTER TABLE `chess_profiles_fields` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы chess_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chess_users`;

CREATE TABLE `chess_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `activkey` varchar(128) NOT NULL DEFAULT '',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastvisit_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `superuser` int(1) NOT NULL DEFAULT '0',
  `status` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `status` (`status`),
  KEY `superuser` (`superuser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `chess_users` WRITE;
/*!40000 ALTER TABLE `chess_users` DISABLE KEYS */;

INSERT INTO `chess_users` (`id`, `username`, `password`, `email`, `activkey`, `create_at`, `lastvisit_at`, `superuser`, `status`)
VALUES
	(1,'admin','21232f297a57a5a743894a0e4a801fc3','webmaster@example.com','9a24eff8c15a6a141ece27eb6947da0f','2014-10-05 15:56:19','2014-11-01 02:06:44',1,1),
	(2,'demo','fe01ce2a7fbac8fafaed7c982a04e229','demo@example.com','099f825543f7850cc038b90aaff39fac','2014-10-05 15:56:19','2014-11-01 05:35:34',0,1);

/*!40000 ALTER TABLE `chess_users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

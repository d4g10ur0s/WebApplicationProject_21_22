-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: projectweb
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `thursday`
--

DROP TABLE IF EXISTS `thursday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thursday` (
  `id` varchar(30) NOT NULL,
  `i` int DEFAULT NULL,
  `ii` int DEFAULT NULL,
  `iii` int DEFAULT NULL,
  `iv` int DEFAULT NULL,
  `v` int DEFAULT NULL,
  `vi` int DEFAULT NULL,
  `vii` int DEFAULT NULL,
  `viii` int DEFAULT NULL,
  `ix` int DEFAULT NULL,
  `x` int DEFAULT NULL,
  `xi` int DEFAULT NULL,
  `xii` int DEFAULT NULL,
  `xiii` int DEFAULT NULL,
  `xiv` int DEFAULT NULL,
  `xv` int DEFAULT NULL,
  `xvi` int DEFAULT NULL,
  `xvii` int DEFAULT NULL,
  `xviii` int DEFAULT NULL,
  `xix` int DEFAULT NULL,
  `xx` int DEFAULT NULL,
  `xxi` int DEFAULT NULL,
  `xxii` int DEFAULT NULL,
  `xxiii` int DEFAULT NULL,
  `xxiv` int DEFAULT NULL,
  KEY `id` (`id`),
  CONSTRAINT `thursday_ibfk_1` FOREIGN KEY (`id`) REFERENCES `point_of_interest` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thursday`
--

LOCK TABLES `thursday` WRITE;
/*!40000 ALTER TABLE `thursday` DISABLE KEYS */;
INSERT INTO `thursday` VALUES ('ChIJaczbf8JJXhMR9QcBFbdskRA',0,0,0,0,0,0,0,0,0,55,72,55,27,6,0,0,0,6,13,13,0,0,0,0),('ChIJFxIYOehJXhMRTnfIBMK7Cjw',0,0,0,0,0,0,0,0,0,35,54,66,64,49,29,14,8,21,56,64,31,0,0,0),('ChIJYW7ZL-hJXhMR9ve2dpMf5Io',0,0,0,0,0,0,0,10,40,80,97,86,87,85,50,0,0,0,0,0,0,0,0,0),('ChIJSap7relJXhMRUkopSQsXwuI',0,0,0,0,0,0,0,0,0,7,21,57,92,88,0,0,0,54,64,40,14,0,0,0),('ChIJHf2oKOhJXhMRU48jxmo1y6s',0,0,0,0,0,0,0,0,0,46,62,64,74,62,0,0,0,34,68,76,46,0,0,0),('ChIJhT1xJuhJXhMRB_dOMAB9G8A',0,0,0,0,0,0,0,0,0,0,0,22,53,91,100,72,41,27,22,15,0,0,0,0),('ChIJLWNTMuhJXhMRc0uCYczaWys',43,29,0,0,0,0,0,0,0,9,12,15,16,14,10,6,4,5,10,19,30,39,42,37),('ChIJOeK7WuhJXhMRp1dmjE1OOmo',0,0,0,0,0,0,0,0,32,60,75,67,45,30,24,0,0,32,30,28,22,0,0,0),('ChIJQS1z-MFJXhMRW1itIM8sPBM',0,0,0,0,0,0,0,0,0,37,45,53,70,81,75,67,78,96,98,73,39,0,0,0);
/*!40000 ALTER TABLE `thursday` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-10 20:14:37

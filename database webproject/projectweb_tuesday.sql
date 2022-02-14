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
-- Table structure for table `tuesday`
--

DROP TABLE IF EXISTS `tuesday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tuesday` (
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
  CONSTRAINT `tuesday_ibfk_1` FOREIGN KEY (`id`) REFERENCES `point_of_interest` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tuesday`
--

LOCK TABLES `tuesday` WRITE;
/*!40000 ALTER TABLE `tuesday` DISABLE KEYS */;
INSERT INTO `tuesday` VALUES ('ChIJaczbf8JJXhMR9QcBFbdskRA',0,0,0,0,0,0,0,0,0,48,62,51,27,10,0,0,0,3,10,0,0,0,0,0),('ChIJFxIYOehJXhMRTnfIBMK7Cjw',0,0,0,0,0,0,0,0,0,31,49,59,56,40,22,12,14,31,52,56,36,0,0,0),('ChIJYW7ZL-hJXhMR9ve2dpMf5Io',0,0,0,0,0,0,0,30,63,88,92,90,90,81,56,0,0,0,0,0,0,0,0,0),('ChIJSap7relJXhMRUkopSQsXwuI',0,0,0,0,0,0,0,0,0,9,52,80,95,95,0,0,0,28,64,59,21,0,0,0),('ChIJHf2oKOhJXhMRU48jxmo1y6s',0,0,0,0,0,0,0,0,0,70,76,68,80,86,0,0,0,52,88,100,72,0,0,0),('ChIJhT1xJuhJXhMRB_dOMAB9G8A',0,0,0,0,0,0,0,0,0,0,0,10,21,45,66,62,37,17,14,19,0,0,0,0),('ChIJLWNTMuhJXhMRc0uCYczaWys',6,6,0,0,0,0,0,0,0,10,11,12,12,11,10,9,8,8,10,14,21,27,31,30),('ChIJOeK7WuhJXhMRp1dmjE1OOmo',0,0,0,0,0,0,0,0,20,50,84,100,83,49,22,0,0,22,32,32,20,0,0,0),('ChIJQS1z-MFJXhMRW1itIM8sPBM',0,0,0,0,0,0,0,0,0,35,56,78,92,93,82,67,60,73,90,79,43,0,0,0);
/*!40000 ALTER TABLE `tuesday` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-10 20:14:38

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
-- Table structure for table `saturday`
--

DROP TABLE IF EXISTS `saturday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saturday` (
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
  CONSTRAINT `saturday_ibfk_1` FOREIGN KEY (`id`) REFERENCES `point_of_interest` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saturday`
--

LOCK TABLES `saturday` WRITE;
/*!40000 ALTER TABLE `saturday` DISABLE KEYS */;
INSERT INTO `saturday` VALUES ('ChIJaczbf8JJXhMR9QcBFbdskRA',0,0,0,0,0,0,0,0,0,41,65,51,17,0,0,0,0,0,0,0,0,0,0,0),('ChIJFxIYOehJXhMRTnfIBMK7Cjw',0,0,0,0,0,0,0,0,0,7,22,49,68,61,36,0,0,0,0,0,0,0,0,0),('ChIJYW7ZL-hJXhMR9ve2dpMf5Io',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),('ChIJSap7relJXhMRUkopSQsXwuI',0,0,0,0,0,0,0,0,0,40,73,97,97,73,40,0,0,0,0,0,0,0,0,0),('ChIJHf2oKOhJXhMRU48jxmo1y6s',0,0,0,0,0,0,0,0,0,36,68,88,84,56,0,0,0,0,0,0,0,0,0,0),('ChIJhT1xJuhJXhMRB_dOMAB9G8A',0,0,0,0,0,0,0,0,0,0,0,12,21,43,64,56,30,12,6,3,0,0,0,0),('ChIJLWNTMuhJXhMRc0uCYczaWys',78,57,0,0,0,0,0,0,10,12,14,14,14,13,11,9,7,6,7,12,27,52,82,100),('ChIJOeK7WuhJXhMRp1dmjE1OOmo',0,0,0,0,0,0,0,0,16,30,37,43,45,37,20,0,0,0,0,0,0,0,0,0),('ChIJQS1z-MFJXhMRW1itIM8sPBM',0,0,0,0,0,0,0,0,0,18,34,46,48,45,42,42,39,29,20,28,15,0,0,0);
/*!40000 ALTER TABLE `saturday` ENABLE KEYS */;
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

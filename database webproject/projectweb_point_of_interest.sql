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
-- Table structure for table `point_of_interest`
--

DROP TABLE IF EXISTS `point_of_interest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `point_of_interest` (
  `id` varchar(30) NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `address` char(80) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lon` double DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `rating_n` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `point_of_interest`
--

LOCK TABLES `point_of_interest` WRITE;
/*!40000 ALTER TABLE `point_of_interest` DISABLE KEYS */;
INSERT INTO `point_of_interest` VALUES ('ChIJaczbf8JJXhMR9QcBFbdskRA','B.M.G. RENTACAR','Andrea Papandreou 1, Patra',38.25064699999999,21.737284,1,1),('ChIJFxIYOehJXhMRTnfIBMK7Cjw','eCig Hellas Ηλεκτρονικο Τσιγαρο - Πάτρα','Maizonos 47, Patra',38.24966320000001,21.7390509,4.9,208),('ChIJHf2oKOhJXhMRU48jxmo1y6s','Zolotas S.A.','Riga Fereou 32, Patra',38.2501092,21.7378917,4.3,75),('ChIJhT1xJuhJXhMRB_dOMAB9G8A','Κατσαρόλα της Τούλας','Riga Fereou 49, Patra',38.2499822,21.7379614,4.6,554),('ChIJLWNTMuhJXhMRc0uCYczaWys','Bocas','Riga Fereou 39, Patra',38.250426,21.7385406,4.6,403),('ChIJOeK7WuhJXhMRp1dmjE1OOmo','ΑΝΑΣΤΑΣΟΠΟΥΛΟΣ ΙΩΑΝΝΗΣ','Korinthou 156, Patra',38.24964899999999,21.73991939999999,4.5,43),('ChIJQS1z-MFJXhMRW1itIM8sPBM','Avis','33, Othonos kai Amalias Str, Patra',38.25009709999999,21.7360586,4.1,107),('ChIJSap7relJXhMRUkopSQsXwuI','spelectronics.gr - ΗΛΕΚΤΡΟΝΙΚΑ ΗΛΕΚΤΡΟΛΟΓΙΚΑ ΠΑΤΡΑΣ','Satovriandou 43-47, Patra',38.250167,21.739824,4.8,59),('ChIJYW7ZL-hJXhMR9ve2dpMf5Io','Ελληνικά Ταχυδρομεία (ΕΛΤΑ)','Maizonos 32, Patra',38.2498044,21.7389391,1.5,162);
/*!40000 ALTER TABLE `point_of_interest` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-10 20:14:36

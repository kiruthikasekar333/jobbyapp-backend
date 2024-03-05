-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: jobs
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `job_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `company_logo` varchar(255) DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `job_role` varchar(100) DEFAULT NULL,
  `job_type` varchar(50) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `responsibilities` text,
  `experience` int DEFAULT NULL,
  `about_job` text,
  `about_company` text,
  PRIMARY KEY (`job_id`),
  KEY `jobs_ibfk_1` (`user_id`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (28,50,'1697188479660-1.png','Hcl Solutions','MERN','Full Stack','Bangalore','React JS, Advanced JS, Mongo DB',70000.00,'UI Design With new Ideas',6,'Exploring with new','10 years leading in software development'),(29,50,'1697114268526-ba.JPG','Hcl Solutions','MERN','Full-time gg','Bangalore','React JS, Advanced JS, Mongo DB',60000.00,'All',5,'Exploring with new','10 years leading in software development'),(31,51,'1697184286241-4.png','Wibro Solutions','MERN','Full Stack','Bangalore','React JS, Advanced JS, Mongo DB',60000.00,'All',5,'Exploring with new','10 years leading in software development'),(32,50,'1697188275659-3.jpeg','Hcl Solutions','MEAN','Full Stack','Bangalore','Angular JS, Advanced JS, Mongo DB',60000.00,'All',5,'Exploring with new','10 years leading in software development');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-05 10:54:30

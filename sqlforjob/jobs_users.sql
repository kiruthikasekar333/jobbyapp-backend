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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(300) NOT NULL,
  `dob` date NOT NULL,
  `isEmployer` tinyint(1) NOT NULL,
  `about` varchar(255) NOT NULL,
  `userImage` varchar(255) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId_UNIQUE` (`userId`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (42,'BaraneVelan','barane@gmail.com','$2b$10$Ce9xJyesfCsRzGisN9lJ1ugvSd5axiDYoIIyY0fUizmwFuygEVKTG','2016-05-16',0,'I am a employer','1696079320743-ba.JPG'),(43,'Pragatheese','pragatheese@gmail.com','$2b$10$cU08FcgcumgmF4GE9Yl26utq4hfBgwz0Tb/zvaYByAhpgboKZGtxO','2018-05-04',0,'I am a employer','1696079597090-3.jpg'),(44,'pandi','pandi@gmail.com','$2b$10$MydnXYjaHG2Re3msJRr6zuxYAVU.cvCMk3QFcDq0fvXM9HqH/IyFe','2023-09-30',0,'i am a employer','1696079735655-1.jpg'),(45,'Hp Solution','hp@gmail.com','$2b$10$LzaqmFTiu776QhvXF8VW/OWwW4CGMdz9CCpBMo9qHTIQJBu0Q0RJi','2023-09-30',1,'i am a employer','1696080996429-1.jpg'),(46,'John','john@gmail.com','$2b$10$zBoGHGbZ9egMT97cbf5f6OMftZ4dYnJs/KUFVTt568m40XAaB9MWu','2023-09-30',1,'Job seeker','1696081068337-caste.jpeg'),(47,'Hello','hello@gmail.com','$2b$10$qTDaLERX7uHS.Nr02GRDguO3sZRc/vW42hElFYeIM463Rwx5c.JFi','2023-09-30',0,'jobseeker','1696081240451-1.jpg'),(48,'Pragatheese','praga@gmail.com','$2b$10$PjAD55CpRBwtIwsUO6/PFeMHvQQc.8Mbj15ITpgSo4ph2f/D.UP2q','2023-09-30',1,'Employer','1696081280971-3.jpg'),(49,'Velan','velan@gmail.com','$2b$10$CkzTuNiGRP83AzxG6Oi7zOBzRov21P1xpwBjYwZQtbksZeLP0y5.S','2023-10-01',0,'job seeker','1696138421141-1.jpg'),(50,'HCL Solutions','hcl@gmail.com','$2b$10$e1IuufAxV.Aet5GyInZ8ueoU.cy9aC5nnC6HjoM5SuNn6RFdvw99S','2023-10-01',1,'Employer','1696138628658-wats.jpg'),(51,'Wibro','wibro@gmail.com','$2b$10$eikiaT6oV2.5birNkNyqoOb3KD6h1GhwWhe1IalQJf6LjsUUfgGcC','2004-06-07',1,'Leading in industry','1697184214673-4.png'),(52,'Revathi','srevathisona@gmail.com','$2b$10$/nhSb/hSAEAhGuTqms3UV.sjBRIR/o5QWnAqOHGL6Ro8sZ6JW8bdi','2024-01-06',0,'Hi','1704527218830-12.JPEG'),(53,'Janagan','jana@gmail.com','$2b$10$q1kScuYnEXtKbjCf4gnDWOjKB06it6Fc72f8CfB.Z.MF9dYmSjspC','2024-01-09',0,'hello','1704787496730-ba 2.jpg'),(54,'kani','kani@gmail.com','$2b$10$17qDLBmYBUu7ubPYWuW8duhfBXeD.DUOALrGJMS99IVKzIvILun86','2024-01-09',0,'hi','1704787790395-3.jpg'),(55,'kani','kani1@gmail.com','$2b$10$Gm/EcwP55cmcEMxHw8Fam.CYqcj7Zo2nSCCOK7DIA/JRbrNuK5uHq','2024-01-09',0,'hi','1704787913888-3.jpg'),(56,'kani','kani2@gmail.com','$2b$10$983ADcaNOR6qYVb6r/9xyuoTUoBe2G11mJ0y.PKm1atHzoaJEiaa6','2024-01-09',0,'hi','1704787979994-3.jpg'),(57,'Hari','hari123@gmail.com','$2b$10$X1ZQG8MNDp7TAWgDBqCPiuYq8.FTjwMNeqg7odUf8VulNS1S3DKAq','2024-01-30',0,'hello','1706606470057-WhatsApp Image 2023-12-01 at 10.25.28_25534244.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-05 10:54:31

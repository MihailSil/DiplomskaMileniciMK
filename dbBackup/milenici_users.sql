-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: milenici
-- ------------------------------------------------------
-- Server version	8.0.37

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
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'mihail','$2a$10$DfSBaMgdyUjg5DvdnkF4Xes1iJM9xeGu0I221uwTP38cs6/VRamvm',0),(7,'test1','$2a$10$DItCE3tGqBBZlXkkhbsNeuCVxuNfW1Je6N5BPTosvjZeP0pWYvAsy',0),(8,'test','$2a$10$00Ajh8MsPWWMrvSzy7WReu.YcIBB4oHsCIyFE/P3nlqcQu6YxQI3W',0),(9,'testtest','$2a$10$mUS9YwCh8oMADarJ/XU1x.vU41IgKuj7HGvwTkSI19fYBIddjIWrS',0),(11,'test2','$2a$10$LiYS/3KpJIgo3SSEEN8iIeElPpuhKRwNMdROhHMJzOlyKNUAslTei',0),(12,'test5','$2a$10$Ev9/Xh/ufIuEiP1.sSRGV.A1y.5bOL6/K1aE.X0ufCJa4K7H76hI2',0),(13,'admin','$2a$10$vP1A44mf5sVFPMG.hjdACetwaKTJllzChXHy8crKP63eex/x3KnVG',1),(14,'proba','$2a$10$ShwyqfeuUAncsStSGx2dyeivnzVhd1HBmB0GnM/.WPGk4FJ6Jasg2',0),(15,'jovana','$2a$10$5SUQ5P.DNn.cxQsH0wO9metw4RxJGnf0r0PQZBHKXtIUf/DIBD.ua',0),(16,'test10','$2a$10$PZk0ZJ0tFK.sZCzYESA/Fe60f4Er4rDA7WGq7F5TpJS1Y/02DGcSO',0),(17,'proekt','$2a$10$ystv19HvAZk9s1QQhRmYsOzUKhcvkodp1xdcwC.foeH9iF8OAby5.',0),(18,'diplomska','$2a$10$hRQF.l4KpLVSwhrCQq5.Teo1E/2zEoQtQ6/Mr0SvmNORDoBjKYl8a',0);
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

-- Dump completed on 2024-09-15 21:02:31

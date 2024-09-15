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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `pet_type` varchar(50) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (21,15,'Jovana','076790463','jovanakoneska@gmail.com','Папагал','1722608355090-7019e341-e81f-4407-bd2e-be8d7afbbe5e.jpg','Џивџи е тигрица, машко, 4 години старо папагалче. Обожава да се бакнува и да седи на рамо но не сака да се гали. Омилена храна му е морков. Џивџи е социјализиран со други птици и доста распеан. Обожава да пее кога зборува некој или кога слуша музика.\r\nЛокација: Битола','2024-08-02 14:19:15'),(26,15,'Јована','076790463','jovanakoneska@gmail.com','Папагал','1722608938757-5b164f8d-a420-461f-a8b2-14cb776d4637.jpg','Бела е женка тигрица, 3 години. Има атрофија на мускулите на крилјата и не може да лета, поднесува луѓе и не се плаши од раце. Омилена храна и е крставица. Мирна е и поретко пее.\r\nЛокација: Битола','2024-08-02 14:28:59'),(40,15,'Јована Конеска','076790463','jovanakoneska@gmail.com','Папагал','1722631264900-427bada7-eb4f-4bbe-8196-6bb2997bd98e.jpg','4 Тигрици кои се заедно здружени и не сакаат да се делат. Белата тигрица е женка, а останатите машки. Не се делат. Кога летаат заедно летаат.\r\nЛокација:Скопје','2024-08-02 20:41:05'),(44,7,'Mirko','087 837 847','mirkomirk@gmail.com','Маче','1722693201897-mace2.jpg','Ратка е 8 годишна мачка за вдомување, домашна мачка која е многу љуботина, особено кога комиите се караат. Цел ден го поминува на прозорот набљудувајќи ги комшиите. ','2024-08-03 13:53:31'),(45,7,'Марко Стојнов','076790463','jovanakoneska@gmail.com','Маче','1722693446598-mace  1 taisa.jpg','Таиса е мачка од врстата на Russian Blue. Обожава внимание и сака да се гали. Исто така обожава храна. Јади се, но треба да внимавате на количината бидејќи јади додека не поврати, и потоа повторно јади. Не сака да спие сама. Исто така кога спие сака да биде легната со главата на перница и да биде покриена со ќебе. ','2024-08-03 13:57:27'),(46,7,'Марко Стојнов','076790463','jovanakoneska@gmail.com','Маче','1722693557043-3442a6b0-e84e-407e-a436-6b02ecbdc664.jfif','Лиса е младо маче кое е многу разиграно. Се вдомува под итно! Лиса сака да спие бидејќи троши многу енергија низ денот трчајќи и играјќи, таа исто многу сака деца. ','2024-08-03 13:59:22'),(47,14,'Janko Mishovski','076790463','jovanakoneska@gmail.com','Куче','1722693896450-kuce1.jpg','На страната од патот до Стокомак се наоѓаат овие три ангелчиња. Скокаат по луѓето и им играат опавчињата. Гладни се и жедни. Се вдомуваат, едното има повредено ноџе но сепак е толку мило. Разиграни се и полни со живот.','2024-08-03 14:04:58'),(48,14,'Јанко Мишов','076790463','jovanakoneska@gmail.com','Маче','1722694099299-e00d478b-9599-4c80-aeaa-c9b04fc67d18.jfif','Се вдомува! Моментално живее во кафичот Портал. Мила е и желна за дом. Сака да биде оставена на мир кога ќе заврши со играње. Омилена храна и е риба.','2024-08-03 14:08:20'),(49,11,'Мартина Котевска','076790463','jovanakoneska@gmail.com','Маче','1722694453435-7637fc6b-02f6-442d-9041-218e3be1f715.jfif','Маја е мачка која што неодамна роди 3 мачиња. Прогледани се и вејќе се спреми сами да живеат. Се вдомуваат! Да им дадеме дом на овие 3 душички и да ги тргнеме од улица. Мајката е маалска мачка која ја ранат комшиите. Малите сеуште можат да се навикнат на домашен живот.','2024-08-03 14:14:16'),(50,11,'Никола Мизов','076790463','jovanakoneska@gmail.com','Маче','1722694662603-4b4e312e-8518-4b6b-9398-b9876ea55ae7.jfif','Трајче е персиско маче, само тоа преживеа од родбата. Стар е 3 месеци. Тој сака да спие и да си игра. И досадува на мајка му бидејќи е многу разигран. Ако го вдомите Трајче ќе почувствувате љубов како никогаш досега. ','2024-08-03 14:17:49'),(51,11,'Бојан Стоилков','076790463','jovanakoneska@gmail.com','Маче','1722695015381-mace3.jpg','Михрима е персиска мачка која е доста елегантна. Дозволува да ја галите само кога таа сака, инаку не сака премногу внимание. Покрај тоа таа не сака да биде сама, ќе седи во истата соба со вас. Сака да седи во плакарот над алиштата и да се крие. Обожава игри со ласер и играчки. Мирна е и не прави многу бука.','2024-08-03 14:23:35'),(52,14,'Милена Ризовска','076790463','jovanakoneska@gmail.com','Маче','1722695335127-09fcb300-c603-4311-a48e-cf56fde0c728.jfif','Маша и Мила се две сестрички кои неодамна беа исфрлени на улица од сопствениците. Збунети се и не знаат што се случува и стојат под балкунот чекајќи ги сопствениците. Маша е белата мачка со шарено а Мила гријавата. Навечер спијаат заедно гушнати, а преку ден си играат. Не знаат да ловат бидејќи се домашни мачки.','2024-08-03 14:28:58'),(57,1,'Михаил','076790463','jovanakoneska@gmail.com','Зајак','/uploads/1725573006944-zajci.jpg','Зајачињата се брат и сестра, поради заминување во странство се поклонуваат. Навикнати се да живеат дома во топла и мирна средина. Двете си играат но обожаваат и да се гушкаат. Не се препорачува да ги раните со зелка.','2024-08-22 17:17:14'),(58,1,'Иван','076790463','jovanakoneska@gmail.com','Зајак','1724347160335-bunny1.webp','Томче е зајаче кое беше е најдено покрај напуштен маркет. Осетлив е и слаб, се бара топол дом и човек кој ќе се грижи за него. Малце е див, но се привикнува на луѓе.','2024-08-22 17:19:21');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
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

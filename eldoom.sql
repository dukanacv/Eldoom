-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: eldoom
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kurs_prijave`
--

DROP TABLE IF EXISTS `kurs_prijave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kurs_prijave` (
  `students_id_student` int NOT NULL,
  `kursevi_id_kurs` int NOT NULL,
  `datum_prijave` datetime NOT NULL,
  PRIMARY KEY (`students_id_student`,`kursevi_id_kurs`,`datum_prijave`),
  KEY `students_id_student` (`students_id_student`),
  KEY `kursevi_id_kurs` (`kursevi_id_kurs`),
  CONSTRAINT `kurs_prijave_ibfk_1` FOREIGN KEY (`students_id_student`) REFERENCES `students` (`Id`),
  CONSTRAINT `kurs_prijave_ibfk_2` FOREIGN KEY (`kursevi_id_kurs`) REFERENCES `kursevi` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kurs_prijave`
--

LOCK TABLES `kurs_prijave` WRITE;
/*!40000 ALTER TABLE `kurs_prijave` DISABLE KEYS */;
INSERT INTO `kurs_prijave` VALUES (1,2,'2022-08-22 13:55:27'),(1,5,'2022-08-23 15:31:06'),(1,8,'2022-08-25 14:07:14'),(2,2,'2022-08-09 16:57:34'),(2,4,'2022-08-09 16:58:15'),(2,5,'2022-08-15 17:33:56'),(3,1,'2022-08-09 17:08:49'),(3,4,'2022-08-09 16:52:55');
/*!40000 ALTER TABLE `kurs_prijave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kursevi`
--

DROP TABLE IF EXISTS `kursevi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kursevi` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(45) NOT NULL,
  `opis` varchar(45) NOT NULL,
  `profesori_id_profesor` int NOT NULL,
  `pripadnost` varchar(40) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_kursevi_profesori_idx` (`profesori_id_profesor`),
  CONSTRAINT `fk_kursevi_profesori` FOREIGN KEY (`profesori_id_profesor`) REFERENCES `profesori` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kursevi`
--

LOCK TABLES `kursevi` WRITE;
/*!40000 ALTER TABLE `kursevi` DISABLE KEYS */;
INSERT INTO `kursevi` VALUES (1,'internet programiranje','web programiranje u php',1,'osnovni'),(2,'programiranje baza podataka','baze podataka u apex okruzenju',1,'osnovni'),(3,'operativni sistemi','osnovni koncepti programiranja os',1,'osnovni'),(4,'oop','objekto programiranje u javi',1,'osnovni'),(5,'objektno projektovanje','napredni koncepti oop',2,'master'),(6,'doktorski kurs 1','lorem ipsum',2,'doktorski'),(7,'doktorski kurs broj 2','lorem ipsum lorem ipsum.....',2,'doktorski'),(8,'racunarske komunikacije','..............................',2,'master');
/*!40000 ALTER TABLE `kursevi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obavestenja`
--

DROP TABLE IF EXISTS `obavestenja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `obavestenja` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `naslov` varchar(45) NOT NULL,
  `sadrzaj` varchar(80) DEFAULT NULL,
  `kursevi_id_kurs` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_obavestenje_kursevi1_idx` (`kursevi_id_kurs`),
  CONSTRAINT `fk_obavestenje_kursevi1` FOREIGN KEY (`kursevi_id_kurs`) REFERENCES `kursevi` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obavestenja`
--

LOCK TABLES `obavestenja` WRITE;
/*!40000 ALTER TABLE `obavestenja` DISABLE KEYS */;
INSERT INTO `obavestenja` VALUES (4,'Vežbe 3 – Server:','Web API osnove (Request - Responssdadsdea)hh\nasdasdasd\nasda\nsd',1),(13,'proba','proba',2),(15,'probatest33','probatest33',2),(35,'Prva nastavna nedelja: Liste','Prakticno: Liste u C okruzenjuasdasd',3),(37,'asda','dasd',5),(38,'Vežbe 4– Server:','asdasdasdasdasd',1);
/*!40000 ALTER TABLE `obavestenja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesori`
--

DROP TABLE IF EXISTS `profesori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesori` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `ime` varchar(45) NOT NULL,
  `prezime` varchar(45) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesori`
--

LOCK TABLES `profesori` WRITE;
/*!40000 ALTER TABLE `profesori` DISABLE KEYS */;
INSERT INTO `profesori` VALUES (1,'profesor@gmail.com','profesor','profesor','profesorovic'),(2,'dukanac@gmail.com','dukanac','vladimir','dukanac');
/*!40000 ALTER TABLE `profesori` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `ime` varchar(45) NOT NULL,
  `prezime` varchar(45) NOT NULL,
  `brIndexa` varchar(45) NOT NULL,
  `datumRegistracije` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'mail@mail.com','vladimir','vladimir','dukanac','262/2018',NULL),(2,'test@test.com','dusan','dusan','radosavljevic','nema',NULL),(3,'ivan@gmail.com','ivan','ivan','ivanovic','111/111','2022-07-25 18:31:17'),(5,'milan@gmail.com','milan','milan','milanovic','2/222','2022-07-25 19:12:09');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vesti`
--

DROP TABLE IF EXISTS `vesti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vesti` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `sadrzaj` varchar(100) DEFAULT NULL,
  `kursevi_id_kurs` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_kursfajl_kursevi1_idx` (`kursevi_id_kurs`),
  CONSTRAINT `fk_kursfajl_kursevi1` FOREIGN KEY (`kursevi_id_kurs`) REFERENCES `kursevi` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vesti`
--

LOCK TABLES `vesti` WRITE;
/*!40000 ALTER TABLE `vesti` DISABLE KEYS */;
/*!40000 ALTER TABLE `vesti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-26 14:07:49

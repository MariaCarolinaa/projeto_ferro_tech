CREATE DATABASE  IF NOT EXISTS `ferrotech` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ferrotech`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: ferrotech
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `compra_material`
--

DROP TABLE IF EXISTS `compra_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra_material` (
  `id_compra` int NOT NULL AUTO_INCREMENT,
  `tipo_material` varchar(20) DEFAULT NULL,
  `preco` double(6,2) DEFAULT NULL,
  `medida_referencia` char(2) DEFAULT NULL,
  `peso` decimal(6,2) DEFAULT NULL,
  `total` decimal(6,2) DEFAULT NULL,
  `cod_nota` int DEFAULT NULL,
  PRIMARY KEY (`id_compra`),
  KEY `fk_cod_nota_compra` (`cod_nota`),
  CONSTRAINT `fk_cod_nota_compra` FOREIGN KEY (`cod_nota`) REFERENCES `nota` (`cod_nota`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra_material`
--

LOCK TABLES `compra_material` WRITE;
/*!40000 ALTER TABLE `compra_material` DISABLE KEYS */;
INSERT INTO `compra_material` VALUES (1,'Cobre',2.50,'Kg',100.00,250.00,1),(2,'Ferro',5.00,'Kg',100.00,500.00,1);
/*!40000 ALTER TABLE `compra_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `id_material` int NOT NULL AUTO_INCREMENT,
  `codigo_material` varchar(6) NOT NULL,
  `nome_material` varchar(50) NOT NULL,
  `peso` double(7,2) NOT NULL,
  `estoque` int NOT NULL,
  `tipo` int NOT NULL,
  PRIMARY KEY (`id_material`),
  KEY `fk_tipo` (`tipo`),
  CONSTRAINT `fk_tipo` FOREIGN KEY (`tipo`) REFERENCES `tipo_material` (`id_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (1,'1','Fiações',1.00,23,1),(2,'1','Geladeira',50.00,1,2);
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nota`
--

DROP TABLE IF EXISTS `nota`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nota` (
  `cod_nota` int NOT NULL AUTO_INCREMENT,
  `numero_nota` varchar(10) DEFAULT NULL,
  `total` double(8,2) DEFAULT NULL,
  `data_nota` date DEFAULT NULL,
  `fechado` char(1) DEFAULT NULL,
  `tipo_nota` tinyint DEFAULT NULL,
  PRIMARY KEY (`cod_nota`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nota`
--

LOCK TABLES `nota` WRITE;
/*!40000 ALTER TABLE `nota` DISABLE KEYS */;
INSERT INTO `nota` VALUES (1,'1',750.00,'2020-11-02','S',1),(2,'1',1500.00,'2020-11-02','S',2);
/*!40000 ALTER TABLE `nota` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_material`
--

DROP TABLE IF EXISTS `tipo_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_material` (
  `id_tipo` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) NOT NULL,
  `unidade_referencia` char(2) NOT NULL,
  `preco` double(6,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_material`
--

LOCK TABLES `tipo_material` WRITE;
/*!40000 ALTER TABLE `tipo_material` DISABLE KEYS */;
INSERT INTO `tipo_material` VALUES (1,'Cobre','kg',5.00),(2,'Ferro','kg',10.00);
/*!40000 ALTER TABLE `tipo_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_usuario` (
  `id_tipo` int NOT NULL AUTO_INCREMENT,
  `tipo` int DEFAULT NULL,
  PRIMARY KEY (`id_tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuario`
--

LOCK TABLES `tipo_usuario` WRITE;
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `login` varchar(20) DEFAULT NULL,
  `senha` varchar(10) DEFAULT NULL,
  `ativo` char(1) DEFAULT NULL,
  `cd_tipo_usuario` int DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `fk_tipo_usuario` (`cd_tipo_usuario`),
  CONSTRAINT `fk_tipo_usuario` FOREIGN KEY (`cd_tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venda_material`
--

DROP TABLE IF EXISTS `venda_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venda_material` (
  `id_venda` int NOT NULL AUTO_INCREMENT,
  `tipo_material` varchar(20) DEFAULT NULL,
  `preco` double(6,2) DEFAULT NULL,
  `medida_referencia` char(2) DEFAULT NULL,
  `peso` decimal(6,2) DEFAULT NULL,
  `total` decimal(6,2) DEFAULT NULL,
  `cod_nota` int DEFAULT NULL,
  PRIMARY KEY (`id_venda`),
  KEY `fk_cod_nota_venda` (`cod_nota`),
  CONSTRAINT `fk_cod_nota_venda` FOREIGN KEY (`cod_nota`) REFERENCES `nota` (`cod_nota`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venda_material`
--

LOCK TABLES `venda_material` WRITE;
/*!40000 ALTER TABLE `venda_material` DISABLE KEYS */;
INSERT INTO `venda_material` VALUES (1,'Cobre',5.00,'Kg',100.00,500.00,2),(2,'Cobre',10.00,'Kg',100.00,1000.00,2);
/*!40000 ALTER TABLE `venda_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ferrotech'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-03 12:40:50

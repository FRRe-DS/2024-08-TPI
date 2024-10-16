-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bienal_escultura
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
-- Table structure for table `escultores`
--

DROP TABLE IF EXISTS `escultores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `escultores` (
  `id_escultor` int NOT NULL AUTO_INCREMENT,
  `nombre_esc` varchar(255) NOT NULL,
  `biografia` text,
  `img_nacionalidad` varchar(255) DEFAULT NULL,
  `imagen_esc` varchar(255) DEFAULT NULL,
  `nacionalidad` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_escultor`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `escultores`
--

LOCK TABLES `escultores` WRITE;
/*!40000 ALTER TABLE `escultores` DISABLE KEYS */;
INSERT INTO `escultores` VALUES (1,'Carlos Monge',NULL,'https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/Mexico-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/Carlos-Monge.png','México'),(2,'Juan Pezzani',NULL,'https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Argentina-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/Juan-pezzani-foto.png','Argentina'),(3,'Milagros Tejarina',NULL,'https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Argentina-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/Milagro-Tejerina.png','Argentina'),(4,'Camilo Guinot',NULL,'https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Argentina-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/DSC9723.png','Argentina'),(5,'Alejandro Arce',NULL,'https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Argentina-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/Retrato-Alejandro-Arce.png','Argentina'),(6,'Gerardo Aranda',NULL,'https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Argentina-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/Imagen-de-WhatsApp-2024-02-24-a-las-18.04.57_3f093bb7.png','Argentina'),(7,'Hernán Lira',NULL,'https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Argentina-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/inv2024-Hernan-Lira.png','Argentina'),(8,'Alejandro Pérez',NULL,'https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Argentina-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/alejandro-perez-foto.png','Argentina'),(9,'Carlos Iglesias',NULL,'https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Espana-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/carlos-iglesias-faura.png','España');
/*!40000 ALTER TABLE `escultores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `esculturas`
--

DROP TABLE IF EXISTS `esculturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `esculturas` (
  `id_escultura` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `fecha_creacion` date DEFAULT NULL,
  `id_evento` int DEFAULT NULL,
  `id_escultor` int DEFAULT NULL,
  PRIMARY KEY (`id_escultura`),
  KEY `id_evento` (`id_evento`),
  KEY `id_escultor` (`id_escultor`),
  CONSTRAINT `esculturas_ibfk_1` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `esculturas_ibfk_2` FOREIGN KEY (`id_escultor`) REFERENCES `escultores` (`id_escultor`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `esculturas`
--

LOCK TABLES `esculturas` WRITE;
/*!40000 ALTER TABLE `esculturas` DISABLE KEYS */;
/*!40000 ALTER TABLE `esculturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `lugar` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `tematica` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES (1,'Bienal 2024 Actualizada','2024-07-01','Chaco','Escultura modernizada','Arte actual'),(2,'Exposición de Arte Clásico','2024-09-15','Museo de Arte Clásico','Una muestra de esculturas y pinturas clásicas.','Arte Clásico'),(3,'Festival de Música Electrónica','2024-10-05','Estadio Central','Un festival con artistas internacionales de música electrónica.','Música Electrónica'),(4,'Feria de Artesanías Locales','2024-11-20','Plaza Mayor','Una feria con artesanías locales y productos regionales.','Artesanías'),(5,'Conferencia de Innovación Tecnológica','2024-12-10','Centro de Convenciones','Conferencia sobre las últimas tendencias en tecnología e innovación.','Tecnología'),(6,'Exposición de Esculturas Modernas','2024-10-01','Centro Cultural de Resistencia','Una exposición de esculturas modernas de artistas locales e internacionales.','Arte Moderno');
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Aureliano','asdf@fdasf','123','admin');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voto`
--

DROP TABLE IF EXISTS `voto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voto` (
  `id_voto` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_escultura` int DEFAULT NULL,
  `puntuacion` int DEFAULT NULL,
  `fecha_voto` date DEFAULT NULL,
  PRIMARY KEY (`id_voto`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_escultura` (`id_escultura`),
  CONSTRAINT `voto_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `voto_ibfk_2` FOREIGN KEY (`id_escultura`) REFERENCES `esculturas` (`id_escultura`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voto`
--

LOCK TABLES `voto` WRITE;
/*!40000 ALTER TABLE `voto` DISABLE KEYS */;
/*!40000 ALTER TABLE `voto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-19 19:48:14

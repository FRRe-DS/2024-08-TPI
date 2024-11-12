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
  `apellido` varchar(45) DEFAULT NULL,
  `biografia` text,
  `pais` varchar(45) DEFAULT NULL,
  `imagen_esc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_escultor`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `escultores`
--

LOCK TABLES `escultores` WRITE;
/*!40000 ALTER TABLE `escultores` DISABLE KEYS */;
INSERT INTO `escultores` VALUES (1,'Carlos ','Monge',NULL,'México','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/Carlos-Monge.png'),(2,'Juan ','Pezzani',NULL,'Argentina','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/Juan-pezzani-foto.png'),(3,'Milagros ','Tejarina',NULL,'Argentina','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/Milagro-Tejerina.png'),(4,'Camilo ','Guinot',NULL,'Argentina','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/DSC9723.png'),(5,'Alejandro ','Arce',NULL,'Argentina','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/Retrato-Alejandro-Arce.png'),(6,'Gerardo ','Aranda',NULL,'Argentina','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/Imagen-de-WhatsApp-2024-02-24-a-las-18.04.57_3f093bb7.png'),(7,'Hernán ','Lira',NULL,'Argentina','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/inv2024-Hernan-Lira.png'),(8,'Alejandro ','Pérez',NULL,'Argentina','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/alejandro-perez-foto.png'),(9,'Carlos ','Iglesias',NULL,'España','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/carlos-iglesias-faura.png'),(19,'MATIAS','BANGHER','AGUANTE COLAPINTO GATOOOOOOOOOOOOOOOOO','Argentina','images/MATIAS_BANGHER-1.webp'),(20,'Rolando','Fulano','nacido alla ite','Chile','images/Rolando_Fulano-1.webp');
/*!40000 ALTER TABLE `escultores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `escultura_img`
--

DROP TABLE IF EXISTS `escultura_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `escultura_img` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_escultura` int NOT NULL,
  `imagen_url` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_escultura` (`id_escultura`),
  CONSTRAINT `escultura_img_ibfk_1` FOREIGN KEY (`id_escultura`) REFERENCES `esculturas` (`id_escultura`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `escultura_img`
--

LOCK TABLES `escultura_img` WRITE;
/*!40000 ALTER TABLE `escultura_img` DISABLE KEYS */;
INSERT INTO `escultura_img` VALUES (1,6,'escultor_apellido_1-escultura-1.webp');
/*!40000 ALTER TABLE `escultura_img` ENABLE KEYS */;
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
  `id_evento` int DEFAULT NULL,
  `id_escultor` int DEFAULT NULL,
  PRIMARY KEY (`id_escultura`),
  KEY `id_evento` (`id_evento`),
  KEY `id_escultor` (`id_escultor`),
  CONSTRAINT `esculturas_ibfk_1` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `esculturas_ibfk_2` FOREIGN KEY (`id_escultor`) REFERENCES `escultores` (`id_escultor`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `esculturas`
--

LOCK TABLES `esculturas` WRITE;
/*!40000 ALTER TABLE `esculturas` DISABLE KEYS */;
INSERT INTO `esculturas` VALUES (6,'MORENO','moRENO',1,1);
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
-- Table structure for table `nacionalidad`
--

DROP TABLE IF EXISTS `nacionalidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nacionalidad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nacionalidad` varchar(45) NOT NULL,
  `img_nacionalidad` varchar(255) NOT NULL,
  `pais` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nacionalidad`
--

LOCK TABLES `nacionalidad` WRITE;
/*!40000 ALTER TABLE `nacionalidad` DISABLE KEYS */;
INSERT INTO `nacionalidad` VALUES (1,'Argentino/a','https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg','Argentina'),(2,'Brasileño/a','https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg','Brasil'),(3,'Canadiense','https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg','Canadá'),(4,'Chileno/a','https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg','Chile'),(5,'Colombiano/a','https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg','Colombia'),(6,'Costarricense','https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Costa_Rica_%28state%29.svg','Costa Rica'),(7,'Cubano/a','https://upload.wikimedia.org/wikipedia/commons/b/bd/Flag_of_Cuba.svg','Cuba'),(8,'Dominicano/a','https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_the_Dominican_Republic.svg','República Dominicana'),(9,'Ecuatoriano/a','https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg','Ecuador'),(10,'Salvadoreño/a','https://upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_El_Salvador.svg','El Salvador'),(11,'Estadounidense','https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg','Estados Unidos'),(12,'Guatemalteco/a','https://upload.wikimedia.org/wikipedia/commons/e/ec/Flag_of_Guatemala.svg','Guatemala'),(13,'Haitiano/a','https://upload.wikimedia.org/wikipedia/commons/5/56/Flag_of_Haiti.svg','Haití'),(14,'Hondureño/a','https://upload.wikimedia.org/wikipedia/commons/8/82/Flag_of_Honduras.svg','Honduras'),(15,'Mexicano/a','https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg','México'),(16,'Nicaragüense','https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Nicaragua.svg','Nicaragua'),(17,'Panameño/a','https://upload.wikimedia.org/wikipedia/commons/a/ab/Flag_of_Panama.svg','Panamá'),(18,'Paraguayo/a','https://upload.wikimedia.org/wikipedia/commons/2/27/Flag_of_Paraguay.svg','Paraguay'),(19,'Peruano/a','https://upload.wikimedia.org/wikipedia/commons/d/df/Flag_of_Peru_%28state%29.svg','Perú'),(20,'Puertorriqueño/a','https://upload.wikimedia.org/wikipedia/commons/2/28/Flag_of_Puerto_Rico.svg','Puerto Rico'),(21,'Uruguayo/a','https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Uruguay.svg','Uruguay'),(22,'Venezolano/a','https://upload.wikimedia.org/wikipedia/commons/0/06/Flag_of_Venezuela.svg','Venezuela'),(23,'Alemán/Alemana','https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg','Alemania'),(24,'Austríaco/a','https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg','Austria'),(25,'Belga','https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg','Bélgica'),(26,'Danés/Danesa','https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg','Dinamarca'),(27,'Español/a','https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg','España'),(28,'Francés/Francesa','https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg','Francia'),(29,'Griego/a','https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg','Grecia'),(30,'Irlandés/Irlandesa','https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg','Irlanda'),(31,'Italiano/a','https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg','Italia'),(32,'Neerlandés/Neerlandesa','https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg','Países Bajos'),(33,'Noruego/a','https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg','Noruega'),(34,'Polaco/a','https://upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg','Polonia'),(35,'Portugués/Portuguesa','https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg','Portugal'),(36,'Sueco/a','https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg','Suecia'),(37,'Suizo/a','https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg','Suiza'),(38,'Inglés/inglesa','https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg','Reino Unido'),(39,'Finlandés/Finlandesa','https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg','Finlandia');
/*!40000 ALTER TABLE `nacionalidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `nickname` varchar(100) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`email`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('Matías Ezequiel Bangher','matiasbangher06@gmail.com','matiasbangher06','admin',2),('Mati Bangher','matiesdelrojo73@gmail.com','matiesdelrojo73','user',3);
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
  `id_escultor` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `puntuacion` decimal(3,1) NOT NULL,
  PRIMARY KEY (`id_voto`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voto`
--

LOCK TABLES `voto` WRITE;
/*!40000 ALTER TABLE `voto` DISABLE KEYS */;
INSERT INTO `voto` VALUES (8,19,'matiesdelrojo73@gmail.com',5.0),(13,8,'matiesdelrojo73@gmail.com',2.5);
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

-- Dump completed on 2024-11-12 12:36:37
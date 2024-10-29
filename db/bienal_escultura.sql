-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: bienal_g8
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
  `nacionalidad` varchar(45) DEFAULT NULL,
  `img_nacionalidad` varchar(500) DEFAULT NULL,
  `imagen_esc` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_escultor`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `escultores`
--

LOCK TABLES `escultores` WRITE;
/*!40000 ALTER TABLE `escultores` DISABLE KEYS */;
INSERT INTO `escultores` VALUES (1,'Carlos ','Monge',NULL,'México','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/Mexico-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/Carlos-Monge.png'),(2,'Juan ','Pezzani',NULL,'Argentina','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Argentina-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/Juan-pezzani-foto.png'),(3,'Milagros ','Tejarina',NULL,'Argentina','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Argentina-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/Milagro-Tejerina.png'),(4,'Camilo ','Guinot',NULL,'Argentina','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Argentina-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/DSC9723.png'),(5,'Alejandro ','Arce',NULL,'Argentina','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Argentina-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/Retrato-Alejandro-Arce.png'),(6,'Gerardo ','Aranda',NULL,'Argentina','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Argentina-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/Imagen-de-WhatsApp-2024-02-24-a-las-18.04.57_3f093bb7.png'),(7,'Hernán ','Lira',NULL,'Argentina','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Argentina-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/inv2024-Hernan-Lira.png'),(8,'Alejandro ','Pérez',NULL,'Argentina','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Argentina-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/05/alejandro-perez-foto.png'),(9,'Carlos ','Iglesias',NULL,'España','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Espana-Bandera.png','https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/carlos-iglesias-faura.png'),(11,'Matias','Bangher','Artista destacado en el ámbito del arte contemporáneo.','Argentina','https://upload.wikimedia.org/wikipedia/commons/f/f4/Bandera_del_Club_Atl%C3%A9tico_Independiente.svg','https://scontent.fres2-2.fna.fbcdn.net/v/t39.30808-6/457505422_1872400573254412_1077158449239205253_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=UUwu_gcDjvcQ7kNvgEorg80&_nc_ht=scontent.fres2-2.fna&_nc_gid=AxH36ww6PNExC5NA1S1OPTS&oh=00_AYD_vgtI1uKLeuzlFDE7Uh2dK_2kEoKiXj--kQIeW-8clA&oe=6720AA2A'),(69,'Ian','Nuñez','ñupaloooo','Ecuador','https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj6k_A8zrzJk8GzG5fMuEa6U1_CKGTQqGICg&s');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `esculturas`
--

LOCK TABLES `esculturas` WRITE;
/*!40000 ALTER TABLE `esculturas` DISABLE KEYS */;
INSERT INTO `esculturas` VALUES (1,'UtinkoEnbolas','dsdfsaifwjein','2024-05-15',1,1);
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
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `nickname` varchar(100) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`email`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('jeje@yopmail.com','jeje@yopmail.com','jeje','admin',6),('Juan Pepe','juanpepe8070@gmail.com','juanpepe8070','admin',4),('Matías Ezequiel Bangher','matiasbangher06@gmail.com','matiasbangher06','admin',2),('Mati Bangher','matiesdelrojo73@gmail.com','matiesdelrojo73','user',3),('migue@yopmail.com','migue@yopmail.com','migue','admin',5);
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
  KEY `id_escultura` (`id_escultura`),
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

-- Dump completed on 2024-10-24 20:06:44

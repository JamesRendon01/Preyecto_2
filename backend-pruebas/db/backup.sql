-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: escapade_parfaite
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `celular` varchar(15) DEFAULT NULL,
  `tipo_identificacion` varchar(5) DEFAULT NULL,
  `identificacion` varchar(15) DEFAULT NULL,
  `contrasena` varchar(100) DEFAULT NULL,
  `intentos_fallidos` int(11) DEFAULT NULL,
  `bloqueado_hasta` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `celular` (`celular`),
  UNIQUE KEY `correo` (`correo`),
  UNIQUE KEY `identificacion` (`identificacion`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (1,'James Rendon','vanegasjames01@gmail.com','3134568354','CC','1028941954','$2b$12$v.gEz6L6pEPyUeywJAnQVe1wJPtB3Kc1UWolTCYxm2wNe1Iz2HaQG',0,NULL);
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alembic_version`
--

DROP TABLE IF EXISTS `alembic_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alembic_version`
--

LOCK TABLES `alembic_version` WRITE;
/*!40000 ALTER TABLE `alembic_version` DISABLE KEYS */;
INSERT INTO `alembic_version` VALUES ('b83a99b603df');
/*!40000 ALTER TABLE `alembic_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auditoria_plan`
--

DROP TABLE IF EXISTS `auditoria_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auditoria_plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accion` varchar(10) NOT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `admin_id` int(11) DEFAULT NULL,
  `old_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`old_data`)),
  `new_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`new_data`)),
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  KEY `ix_auditoria_plan_id` (`id`),
  CONSTRAINT `auditoria_plan_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `administrador` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auditoria_plan`
--

LOCK TABLES `auditoria_plan` WRITE;
/*!40000 ALTER TABLE `auditoria_plan` DISABLE KEYS */;
INSERT INTO `auditoria_plan` VALUES (98,'INSERT','2025-10-15 20:42:30',NULL,NULL,'{\"id\": 33, \"nombre\": \"Tour Café (Zona Cafetera)\", \"descripcion\": \"Experiencia cafetera en finca de Quindío o Risaralda: recorrido por cafetales, proceso y cata. Duración 4 horas aprox.\", \"descripcion_corta\": \"Experiencia cafetera tradicional.\", \"costo_persona\": 90000, \"imagen\": \"2f8adce976d34e578f00d7d85adb0cb2.png\", \"id_ciudad\": 2, \"id_informe\": null}'),(99,'INSERT','2025-10-15 20:47:46',NULL,NULL,'{\"id\": 34, \"nombre\": \"Caminata al Salto del Tequenda\", \"descripcion\": \"Caminata guiada por senderos naturales hasta el mirador de la cascada Salto del Tequendama. Duración 3 horas.\", \"descripcion_corta\": \"Senderismo al Salto del Tequendama.\", \"costo_persona\": 50000, \"imagen\": \"cfee742fcb8e4bfaa718d3fd6732a99b.png\", \"id_ciudad\": 3, \"id_informe\": null}'),(100,'INSERT','2025-10-16 07:53:20',NULL,NULL,'{\"id\": 35, \"nombre\": \"Monserrate & Museo del Oro \", \"descripcion\": \"Tour de medio día que incluye subida al cerro de Monserrate para ver vista panorámica de Bogotá + visita al Museo del Oro para conocer la colección prehispánica.\", \"descripcion_corta\": \"Vista y cultura en Bogotá.\", \"costo_persona\": 190000, \"imagen\": \"28ac0779f5d34bfc82c163d88257a791.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(101,'INSERT','2025-10-16 07:54:28',NULL,NULL,'{\"id\": 36, \"nombre\": \"Mina de Sal de Zipaquirá\", \"descripcion\": \"Excursión de medio día para visitar la Catedral de Sal; recorrido por galerías subterráneas y sala de tormentas.\", \"descripcion_corta\": \"Catedral de Sal.\", \"costo_persona\": 265000, \"imagen\": null, \"id_ciudad\": 8, \"id_informe\": null}'),(102,'UPDATE','2025-10-16 07:55:09',NULL,'{\"id\": 36, \"nombre\": \"Mina de Sal de Zipaquirá\", \"descripcion\": \"Excursión de medio día para visitar la Catedral de Sal; recorrido por galerías subterráneas y sala de tormentas.\", \"descripcion_corta\": \"Catedral de Sal.\", \"costo_persona\": 265000, \"imagen\": null, \"id_ciudad\": 8, \"id_informe\": null}','{\"id\": 36, \"nombre\": \"Mina de Sal de Zipaquirá\", \"descripcion\": \"Excursión de medio día para visitar la Catedral de Sal; recorrido por galerías subterráneas y sala de tormentas.\", \"descripcion_corta\": \"Catedral de Sal.\", \"costo_persona\": 265000, \"imagen\": \"d19f74d395f04f6ab243adc614b88e32.png\", \"id_ciudad\": 8, \"id_informe\": null}'),(103,'INSERT','2025-10-16 07:56:47',NULL,NULL,'{\"id\": 37, \"nombre\": \"La Chorrera \", \"descripcion\": \"Caminata / senderismo hacia la cascada La Chorrera, con guía, naturaleza, vistas y tiempo para baño si el clima lo permite.\", \"descripcion_corta\": \"Cascada La Chorrera.\", \"costo_persona\": 270000, \"imagen\": \"dcf436b3fb7d45e482b4ac52d9a5a737.png\", \"id_ciudad\": 8, \"id_informe\": null}'),(104,'INSERT','2025-10-16 08:02:58',NULL,NULL,'{\"id\": 38, \"nombre\": \"Parque Natural Chicaque\", \"descripcion\": \"Excursión de medio día en bosque de niebla con senderos, miradores y contacto con naturaleza cerca de Bogotá.\", \"descripcion_corta\": \"Bosque de niebla en Chicaque.\", \"costo_persona\": 250000, \"imagen\": \"457b58b01b32414dbe9871cc38e5c182.png\", \"id_ciudad\": 8, \"id_informe\": null}'),(105,'INSERT','2025-10-16 08:05:16',NULL,NULL,'{\"id\": 39, \"nombre\": \"Tour Ciudad Vieja & Castillo S\", \"descripcion\": \"Recorrido guiado de unas pocas horas por Getsemaní, la Ciudad Amurallada y el Castillo San Felipe de Barajas, apreciando arquitectura colonial.\", \"descripcion_corta\": \"Historia colonial en Cartagena.\", \"costo_persona\": 200000, \"imagen\": \"1f777466607d4efea4fe7bd254420768.png\", \"id_ciudad\": 5, \"id_informe\": null}'),(106,'INSERT','2025-10-16 08:14:30',NULL,NULL,'{\"id\": 40, \"nombre\": \"Free Bike Tour Bogotá\", \"descripcion\": \"Recorrido en bicicleta por zonas representativas de Bogotá, explorando parques, arte callejero y panorámicas, guiado.\", \"descripcion_corta\": \"Bici por Bogotá gratis.\", \"costo_persona\": 0, \"imagen\": \"e4e0b4c8f4e8490fbf9e8e94f8bd6c35.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(107,'INSERT','2025-10-16 08:15:26',NULL,NULL,'{\"id\": 41, \"nombre\": \"Graffiti & Identity \", \"descripcion\": \"Tour guiado de arte urbano y grafiti en Bogotá, aprendiendo sobre los artistas, los mensajes y la transformación cultural.\", \"descripcion_corta\": \"Grafiti y arte urbano Bogotá.\", \"costo_persona\": 60000, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}'),(108,'UPDATE','2025-10-16 08:16:23',NULL,'{\"id\": 41, \"nombre\": \"Graffiti & Identity \", \"descripcion\": \"Tour guiado de arte urbano y grafiti en Bogotá, aprendiendo sobre los artistas, los mensajes y la transformación cultural.\", \"descripcion_corta\": \"Grafiti y arte urbano Bogotá.\", \"costo_persona\": 60000, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}','{\"id\": 41, \"nombre\": \"Graffiti & Identity \", \"descripcion\": \"Tour guiado de arte urbano y grafiti en Bogotá, aprendiendo sobre los artistas, los mensajes y la transformación cultural.\", \"descripcion_corta\": \"Grafiti y arte urbano Bogotá.\", \"costo_persona\": 60000, \"imagen\": \"9bfd30a35ffc44ecadd9c8ce82a30b67.png\", \"id_ciudad\": 1, \"id_informe\": null}');
/*!40000 ALTER TABLE `auditoria_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudad`
--

DROP TABLE IF EXISTS `ciudad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad`
--

LOCK TABLES `ciudad` WRITE;
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT INTO `ciudad` VALUES (4,'Barranquilla'),(1,'Bogotá'),(6,'Bucaramanga'),(3,'Cali'),(5,'Cartagena'),(8,'Cundinamarca'),(2,'Medellín'),(7,'Pereira');
/*!40000 ALTER TABLE `ciudad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorito`
--

DROP TABLE IF EXISTS `favorito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_turista` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_plan` (`id_plan`),
  KEY `id_turista` (`id_turista`),
  CONSTRAINT `favorito_ibfk_1` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id`),
  CONSTRAINT `favorito_ibfk_2` FOREIGN KEY (`id_turista`) REFERENCES `turista` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorito`
--

LOCK TABLES `favorito` WRITE;
/*!40000 ALTER TABLE `favorito` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `informe`
--

DROP TABLE IF EXISTS `informe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `informe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `id_administrador` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`),
  KEY `id_administrador` (`id_administrador`),
  CONSTRAINT `informe_ibfk_1` FOREIGN KEY (`id_administrador`) REFERENCES `administrador` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `informe`
--

LOCK TABLES `informe` WRITE;
/*!40000 ALTER TABLE `informe` DISABLE KEYS */;
/*!40000 ALTER TABLE `informe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan`
--

DROP TABLE IF EXISTS `plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `descripcion_corta` varchar(100) DEFAULT NULL,
  `costo_persona` int(11) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `id_ciudad` int(11) DEFAULT NULL,
  `id_informe` int(11) DEFAULT NULL,
  `id_Admin` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `descripcion` (`descripcion`),
  UNIQUE KEY `descripcion_corta` (`descripcion_corta`),
  UNIQUE KEY `nombre` (`nombre`),
  KEY `id_Admin` (`id_Admin`),
  KEY `id_ciudad` (`id_ciudad`),
  KEY `id_informe` (`id_informe`),
  CONSTRAINT `plan_ibfk_1` FOREIGN KEY (`id_Admin`) REFERENCES `administrador` (`id`),
  CONSTRAINT `plan_ibfk_2` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad` (`id`),
  CONSTRAINT `plan_ibfk_3` FOREIGN KEY (`id_informe`) REFERENCES `informe` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan`
--

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
INSERT INTO `plan` VALUES (28,'Tour por la Candelaria','Recorrido guiado a pie por el barrio histórico La Candelaria, visitando murales, arquitectura colonial, Plaza de Bolívar y Museo del Oro.','Tour a pie por el centro histórico de Bogotá.',70000,'088056bc84cc46449023b8c394537c5e.png',1,NULL,NULL),(29,'Tour Comuna 13','Visita guiada a la Comuna 13, grafitis, historia de transformación social, escaleras eléctricas y miradores. Duración 3–4 horas.','Grafiti tour en Comuna 13.',59999,'16b8dbf712ae4649a79b6273f6d80fc4.png',2,NULL,NULL),(32,'Tour Manglares La Boquilla ','Paseo en canoa por los manglares de La Boquilla con guía local, avistamiento de aves y taller de pesca artesanal. Duración 2 horas.','Paseo en canoa por manglares.',120000,'a043eb709da54029807e58dab366db91.png',5,NULL,NULL),(33,'Tour Café (Zona Cafetera)','Experiencia cafetera en finca de Quindío o Risaralda: recorrido por cafetales, proceso y cata. Duración 4 horas aprox.','Experiencia cafetera tradicional.',90000,'2f8adce976d34e578f00d7d85adb0cb2.png',2,NULL,NULL),(34,'Caminata al Salto del Tequenda','Caminata guiada por senderos naturales hasta el mirador de la cascada Salto del Tequendama. Duración 3 horas.','Senderismo al Salto del Tequendama.',50000,'cfee742fcb8e4bfaa718d3fd6732a99b.png',3,NULL,NULL),(35,'Monserrate & Museo del Oro ','Tour de medio día que incluye subida al cerro de Monserrate para ver vista panorámica de Bogotá + visita al Museo del Oro para conocer la colección prehispánica.','Vista y cultura en Bogotá.',190000,'28ac0779f5d34bfc82c163d88257a791.png',1,NULL,NULL),(36,'Mina de Sal de Zipaquirá','Excursión de medio día para visitar la Catedral de Sal; recorrido por galerías subterráneas y sala de tormentas.','Catedral de Sal.',265000,'d19f74d395f04f6ab243adc614b88e32.png',8,NULL,NULL),(37,'La Chorrera ','Caminata / senderismo hacia la cascada La Chorrera, con guía, naturaleza, vistas y tiempo para baño si el clima lo permite.','Cascada La Chorrera.',270000,'dcf436b3fb7d45e482b4ac52d9a5a737.png',8,NULL,NULL),(38,'Parque Natural Chicaque','Excursión de medio día en bosque de niebla con senderos, miradores y contacto con naturaleza cerca de Bogotá.','Bosque de niebla en Chicaque.',250000,'457b58b01b32414dbe9871cc38e5c182.png',8,NULL,NULL),(39,'Tour Ciudad Vieja & Castillo S','Recorrido guiado de unas pocas horas por Getsemaní, la Ciudad Amurallada y el Castillo San Felipe de Barajas, apreciando arquitectura colonial.','Historia colonial en Cartagena.',200000,'1f777466607d4efea4fe7bd254420768.png',5,NULL,NULL),(40,'Free Bike Tour Bogotá','Recorrido en bicicleta por zonas representativas de Bogotá, explorando parques, arte callejero y panorámicas, guiado.','Bici por Bogotá gratis.',0,'e4e0b4c8f4e8490fbf9e8e94f8bd6c35.png',1,NULL,NULL),(41,'Graffiti & Identity ','Tour guiado de arte urbano y grafiti en Bogotá, aprendiendo sobre los artistas, los mensajes y la transformación cultural.','Grafiti y arte urbano Bogotá.',60000,'9bfd30a35ffc44ecadd9c8ce82a30b67.png',1,NULL,NULL);
/*!40000 ALTER TABLE `plan` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_auditoria_plan_insert
    AFTER INSERT ON plan
    FOR EACH ROW
    BEGIN
        INSERT INTO auditoria_plan(accion, new_data)
        VALUES (
            'INSERT',
            JSON_OBJECT(
                'id', NEW.id,
                'nombre', NEW.nombre,
                'descripcion', NEW.descripcion,
                'descripcion_corta', NEW.descripcion_corta,
                'costo_persona', NEW.costo_persona,
                'imagen', NEW.imagen,
                'id_ciudad', NEW.id_ciudad,
                'id_informe', NEW.id_informe
            )
        );
    END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_auditoria_plan_update
    AFTER UPDATE ON plan
    FOR EACH ROW
    BEGIN
        INSERT INTO auditoria_plan(accion, old_data, new_data)
        VALUES (
            'UPDATE',
            JSON_OBJECT(
                'id', OLD.id,
                'nombre', OLD.nombre,
                'descripcion', OLD.descripcion,
                'descripcion_corta', OLD.descripcion_corta,
                'costo_persona', OLD.costo_persona,
                'imagen', OLD.imagen,
                'id_ciudad', OLD.id_ciudad,
                'id_informe', OLD.id_informe
            ),
            JSON_OBJECT(
                'id', NEW.id,
                'nombre', NEW.nombre,
                'descripcion', NEW.descripcion,
                'descripcion_corta', NEW.descripcion_corta,
                'costo_persona', NEW.costo_persona,
                'imagen', NEW.imagen,
                'id_ciudad', NEW.id_ciudad,
                'id_informe', NEW.id_informe
            )
        );
    END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_auditoria_plan_delete
    AFTER DELETE ON plan
    FOR EACH ROW
    BEGIN
        INSERT INTO auditoria_plan(accion, old_data)
        VALUES (
            'DELETE',
            JSON_OBJECT(
                'id', OLD.id,
                'nombre', OLD.nombre,
                'descripcion', OLD.descripcion,
                'descripcion_corta', OLD.descripcion_corta,
                'costo_persona', OLD.costo_persona,
                'imagen', OLD.imagen,
                'id_ciudad', OLD.id_ciudad,
                'id_informe', OLD.id_informe
            )
        );
    END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `planesporciudad`
--

DROP TABLE IF EXISTS `planesporciudad`;
/*!50001 DROP VIEW IF EXISTS `planesporciudad`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `planesporciudad` AS SELECT 
 1 AS `id_plan`,
 1 AS `nombre_plan`,
 1 AS `id_ciudad`,
 1 AS `nombre_ciudad`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_reserva` date DEFAULT NULL,
  `costo_final` int(11) DEFAULT NULL,
  `disponibilidad` tinyint(1) DEFAULT NULL,
  `numero_personas` int(11) DEFAULT NULL,
  `id_informe` int(11) DEFAULT NULL,
  `id_plan` int(11) DEFAULT NULL,
  `id_turista` int(11) DEFAULT NULL,
  `comprobante_pdf` blob DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_informe` (`id_informe`),
  KEY `id_plan` (`id_plan`),
  KEY `id_turista` (`id_turista`),
  CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`id_informe`) REFERENCES `informe` (`id`),
  CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id`),
  CONSTRAINT `reserva_ibfk_3` FOREIGN KEY (`id_turista`) REFERENCES `turista` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (38,'2025-10-18',0,1,2,NULL,40,9,_binary '%PDF-1.3\n%���� ReportLab Generated PDF document http://www.reportlab.com\n1 0 obj\n<<\n/F1 2 0 R /F2 3 0 R /F3 4 0 R\n>>\nendobj\n2 0 obj\n<<\n/BaseFont /Helvetica /Encoding /WinAnsiEncoding /Name /F1 /Subtype /Type1 /Type /Font\n>>\nendobj\n3 0 obj\n<<\n/BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding /Name /F2 /Subtype /Type1 /Type /Font\n>>\nendobj\n4 0 obj\n<<\n/BaseFont /ZapfDingbats /Name /F3 /Subtype /Type1 /Type /Font\n>>\nendobj\n5 0 obj\n<<\n/Contents 9 0 R /MediaBox [ 0 0 612 792 ] /Parent 8 0 R /Resources <<\n/Font 1 0 R /ProcSet [ /PDF /Text /ImageB /ImageC /ImageI ]\n>> /Rotate 0 /Trans <<\n\n>> \n  /Type /Page\n>>\nendobj\n6 0 obj\n<<\n/PageMode /UseNone /Pages 8 0 R /Type /Catalog\n>>\nendobj\n7 0 obj\n<<\n/Author (anonymous) /CreationDate (D:20251017221212-05\'00\') /Creator (ReportLab PDF Library - www.reportlab.com) /Keywords () /ModDate (D:20251017221212-05\'00\') /Producer (ReportLab PDF Library - www.reportlab.com) \n  /Subject (unspecified) /Title (Comprobante de Pago) /Trapped /False\n>>\nendobj\n8 0 obj\n<<\n/Count 1 /Kids [ 5 0 R ] /Type /Pages\n>>\nendobj\n9 0 obj\n<<\n/Filter [ /ASCII85Decode /FlateDecode ] /Length 539\n>>\nstream\nGat%^8Q4A/&;BTNMKd-m:dL[QgW]qZ$Xf68NkS2_0bLZJWf`tLq.M\"\'@q@)hl-MTNlgEA!6+W*es82ku\'G`,$APbHbi<cGe,jK3%1JiRW7im#<dn,-\\J]CoL5SC!tcEGfCfk.p$hQ$e2$*r[;qCC&?eAX)W%O-P`#rtRD:J(b;<4h%nJ:S9K_daF)ZJ@G[`hc0,JUibI)q,YuXRgJUI9n(B.9kP?%&/ZE+).9I;rY=.k:,VVihpVWh!i4dFDC@g3l]<+fQPFAr<=/k-s87@jQE4#_YshA-W`3CLL9B1ZG=IZKrsJd0eM?6mQ>)i,\\SIBr,Xb21&EPhFD!*CK2XCu01.AlclF\"?Cp0lVWA=aZnu%&E:[WYX=^2.QS:MV\\\';IMIP*/HVcBH_BA]?U9dS0tk^R]6jF!`OlC?n]W=H\"nD(),)Oh=[)@[]h.gCAlL^UU5A)XmQ;%ldJ:H7K7RuI=\\lXY1<+:pK%:PZGa,ZZuh);Rsja6D6$-UhjYHSPNuCr9kN,HFP3,Y=imqqhsLqdY657:U&~>endstream\nendobj\nxref\n0 10\n0000000000 65535 f \n0000000073 00000 n \n0000000124 00000 n \n0000000231 00000 n \n0000000343 00000 n \n0000000426 00000 n \n0000000619 00000 n \n0000000687 00000 n \n0000000994 00000 n \n0000001053 00000 n \ntrailer\n<<\n/ID \n[<f32f5beada31f0d945f613b7657f9f69><f32f5beada31f0d945f613b7657f9f69>]\n% ReportLab generated PDF document -- digest (http://www.reportlab.com)\n\n/Info 7 0 R\n/Root 6 0 R\n/Size 10\n>>\nstartxref\n1682\n%%EOF\n'),(39,'2025-10-18',240000,1,2,NULL,32,9,_binary '%PDF-1.3\n%���� ReportLab Generated PDF document http://www.reportlab.com\n1 0 obj\n<<\n/F1 2 0 R /F2 3 0 R /F3 4 0 R\n>>\nendobj\n2 0 obj\n<<\n/BaseFont /Helvetica /Encoding /WinAnsiEncoding /Name /F1 /Subtype /Type1 /Type /Font\n>>\nendobj\n3 0 obj\n<<\n/BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding /Name /F2 /Subtype /Type1 /Type /Font\n>>\nendobj\n4 0 obj\n<<\n/BaseFont /ZapfDingbats /Name /F3 /Subtype /Type1 /Type /Font\n>>\nendobj\n5 0 obj\n<<\n/Contents 9 0 R /MediaBox [ 0 0 612 792 ] /Parent 8 0 R /Resources <<\n/Font 1 0 R /ProcSet [ /PDF /Text /ImageB /ImageC /ImageI ]\n>> /Rotate 0 /Trans <<\n\n>> \n  /Type /Page\n>>\nendobj\n6 0 obj\n<<\n/PageMode /UseNone /Pages 8 0 R /Type /Catalog\n>>\nendobj\n7 0 obj\n<<\n/Author (anonymous) /CreationDate (D:20251017221244-05\'00\') /Creator (ReportLab PDF Library - www.reportlab.com) /Keywords () /ModDate (D:20251017221244-05\'00\') /Producer (ReportLab PDF Library - www.reportlab.com) \n  /Subject (unspecified) /Title (Comprobante de Pago) /Trapped /False\n>>\nendobj\n8 0 obj\n<<\n/Count 1 /Kids [ 5 0 R ] /Type /Pages\n>>\nendobj\n9 0 obj\n<<\n/Filter [ /ASCII85Decode /FlateDecode ] /Length 560\n>>\nstream\nGat$sbAQ&g&A70Vp<Z01,Vk\\s]l&!;pL;0p_4rZb7(We:;5N?HT3plG1bkdi+@(]fcKsoa+;\"9Us3Jsj.g_+k!`G+M5jiWR)bB$a?`/F\'?]R>G]8e*>7Y/Tn#_=*@cZ&ccgSXl(CAB+gGYB5cIbfDVq$ci;)kd@rSoB9VOO+XB!]I8G*G@]h&Ak/W(-3o=Q%q-ROaofL\"4:F6g:jMe3&$t)OSgY5djXEO(Me35F^\'iblQI@Z^qRdbCiO@fi@oS[ZgTAuPrY9+^c:0O\"q)[a8uVNpe9eDaJE=`c:$^_ulD;R1YH-GXo-cdDi?<@cdkKbu#sSBZN^Io6?ilCd1,1In>kfLRiXb=q!)-$c`?<FE_H\'[7;H_hk7_)fS>`,g,rLIC/_)l_R%bHQ2oAgt74biRL0kdPpNN#n;5kAp7(o:8GKn7r[W!?E5T9,3tQ`O=DNs>*^o;4CUJQtRE:<k)`m\'CS0=3,40c<Zt>0;.-Of,O2>EoR:\"4sB,3K#YheXp]UE1mOW([Ab);Xjf\'N9r;[eUo)9U<RL+-NQF\'*hr4l\"^AqO\'#ab~>endstream\nendobj\nxref\n0 10\n0000000000 65535 f \n0000000073 00000 n \n0000000124 00000 n \n0000000231 00000 n \n0000000343 00000 n \n0000000426 00000 n \n0000000619 00000 n \n0000000687 00000 n \n0000000994 00000 n \n0000001053 00000 n \ntrailer\n<<\n/ID \n[<73235b95e14e7393abca9a2ad1d34884><73235b95e14e7393abca9a2ad1d34884>]\n% ReportLab generated PDF document -- digest (http://www.reportlab.com)\n\n/Info 7 0 R\n/Root 6 0 R\n/Size 10\n>>\nstartxref\n1703\n%%EOF\n');
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turista`
--

DROP TABLE IF EXISTS `turista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turista` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `tipo_identificacion` varchar(5) DEFAULT NULL,
  `identificacion` varchar(30) DEFAULT NULL,
  `contrasena` varchar(100) DEFAULT NULL,
  `intentos_fallidos` int(11) DEFAULT NULL,
  `bloqueado_hasta` datetime DEFAULT NULL,
  `pin_recuperacion` varchar(6) DEFAULT NULL,
  `expira_pin` datetime DEFAULT NULL,
  `token_recuperacion` varchar(255) DEFAULT NULL,
  `expira_token` datetime DEFAULT NULL,
  `ciudad_id` int(11) DEFAULT NULL,
  `acepto_terminos` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `celular` (`celular`),
  UNIQUE KEY `correo` (`correo`),
  UNIQUE KEY `identificacion` (`identificacion`),
  KEY `ciudad_id` (`ciudad_id`),
  CONSTRAINT `turista_ibfk_1` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudad` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turista`
--

LOCK TABLES `turista` WRITE;
/*!40000 ALTER TABLE `turista` DISABLE KEYS */;
INSERT INTO `turista` VALUES (8,'James Rendon','vanegasjames01@gmail.com','31345658354','2007-08-01','cll 131 b bis # 95 b 34','CC','1028941955','$2b$12$eoNd1.Y0RtkKCnrc5NnuOek16vXMJl4cd6RjY4fV1It0vJnOWlBwS',0,NULL,NULL,NULL,NULL,NULL,3,1),(9,'David Rendon','rendondavid328@gmail.com','31345658355','2007-08-01','cll 131 b bis # 95 b 33','CC','1028941954','$2b$12$mf9fJroS9HtkGlKz6FhwiOio3GhWmrNMU5C/JBm0MhHnDilOnvJby',0,NULL,NULL,NULL,NULL,NULL,1,1);
/*!40000 ALTER TABLE `turista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicacion`
--

DROP TABLE IF EXISTS `ubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ubicacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `longitud` varchar(30) DEFAULT NULL,
  `latitud` varchar(30) DEFAULT NULL,
  `id_plan` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_plan` (`id_plan`),
  CONSTRAINT `ubicacion_ibfk_1` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicacion`
--

LOCK TABLES `ubicacion` WRITE;
/*!40000 ALTER TABLE `ubicacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `ubicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'escapade_parfaite'
--

--
-- Dumping routines for database 'escapade_parfaite'
--
/*!50003 DROP PROCEDURE IF EXISTS `CrearAdministrador` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CrearAdministrador`( 

    IN Nombre VARCHAR(30), 

    IN Correo VARCHAR(50), 

    IN Celular VARCHAR(15), 

    IN TipoIdentificacion VARCHAR(5), 

    IN Identificacion VARCHAR(15), 

    IN ContrasenaPlano VARCHAR(100) 

)
BEGIN 

    INSERT INTO administrador ( 

        nombre, 

        correo, 

        celular, 

        tipo_identificacion, 

        identificacion, 

        contrasena 

    ) 

    VALUES ( 

        Nombre, 

        Correo, 

        Celular, 

        TipoIdentificacion, 

        Identificacion, 

        SHA2(ContrasenaPlano, 256) 

    ); 

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `crearTurista` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `crearTurista`( IN nombre VARCHAR(30),  

IN correo VARCHAR(50),  

IN celular VARCHAR(20),  

IN fecha_nacimiento DATE,  

IN direccion VARCHAR(50),  

IN tipo_identificacion VARCHAR(5),  

IN contrasenaEnc VARCHAR(100),  

IN ciudad_id INT(11))
BEGIN INSERT INTO turista  

(nombre, correo, celular, fecha_nacimiento, direccion, tipo_identificacion, contrasena, ciudad_id) 

VALUES (nombre, correo, celular, fecha_nacimiento, direccion, tipo_identificacion, SHA2(contrasenaEnc,256), ciudad_id);  

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ReservasPorAño` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ReservasPorAño`(IN Año INT)
BEGIN 

    SELECT  

        r.fecha_reserva,  

        r.costo_final,  

        p.nombre AS nombre_plan,  

        c.nombre AS nombre_ciudad 

    FROM reserva AS r 

    INNER JOIN plan AS p ON p.id = r.id_plan 

    INNER JOIN ciudad AS c ON c.id = p.id_ciudad 

    WHERE YEAR(r.fecha_reserva) = Año; 

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ReservasPorAñoCiudad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ReservasPorAñoCiudad`( 

    IN Año INT, 

    IN Ciudad VARCHAR(100) 

)
BEGIN 

    SELECT  

        r.fecha_reserva,  

        r.costo_final,  

        p.nombre AS nombre_plan,  

        c.nombre AS nombre_ciudad 

    FROM reserva AS r 

    INNER JOIN plan AS p ON p.id = r.id_plan 

    INNER JOIN ciudad AS c ON c.id = p.id_ciudad 

    WHERE YEAR(r.fecha_reserva) = Año 

      AND c.nombre = Ciudad; 

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerFavoritosPorTurista` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VerFavoritosPorTurista`( 

    IN NombreTurista VARCHAR(100) 

)
BEGIN 

    SELECT  

        t.nombre AS turista, 

        p.nombre AS plan, 

        c.nombre AS ciudad 

    FROM favorito f 

    JOIN turista t ON t.id = f.id_turista 

    JOIN plan p ON p.id = f.id_plan 

    JOIN ciudad c ON c.id = p.id_ciudad 

    WHERE t.nombre = NombreTurista; 

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerInformesPorAdministrador` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VerInformesPorAdministrador`(  

    IN NombreAdmin VARCHAR(100)  

)
BEGIN  

    SELECT   

        i.fecha_creacion,  

        i.nombre,   

        a.nombre AS nombre_admin  

    FROM informe i  

    JOIN administrador a ON a.id = i.id_administrador  

    WHERE a.nombre = NombreAdmin;  

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerInformesRecientes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VerInformesRecientes`()
BEGIN  

    SELECT   

        i.nombre AS nombre_informe,  

        i.fecha_creacion,  

        a.nombre AS nombre_administrador  

    FROM informe i  

    inner JOIN administrador a ON a.id = i.id_administrador  

    WHERE i.fecha_creacion >= CURDATE() - INTERVAL 15 DAY;  

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerIngresosPorCiudad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VerIngresosPorCiudad`( 

    IN Ciudad VARCHAR(100) 

)
BEGIN 

    SELECT  

        c.nombre AS ciudad, 

        SUM(r.costo_final) AS ingresos_totales 

    FROM reserva r 

    JOIN plan p ON p.id = r.id_plan 

    JOIN ciudad c ON c.id = p.id_ciudad 

    WHERE c.nombre = Ciudad 

    GROUP BY c.nombre; 

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerPlanesPopularesPorCiudad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VerPlanesPopularesPorCiudad`( 

    IN Ciudad VARCHAR(100) 

)
BEGIN 

    SELECT  

        p.nombre AS plan, 

        COUNT(*) AS cantidad_reservas 

    FROM reserva r 

    JOIN plan p ON p.id = r.id_plan 

    JOIN ciudad c ON c.id = p.id_ciudad 

    WHERE c.nombre = Ciudad 

    GROUP BY p.nombre 

    ORDER BY cantidad_reservas DESC; 

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerReservasPorCiudadPrecio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VerReservasPorCiudadPrecio`( 

    IN Ciudad VARCHAR(100), 

    IN PrecioMin DECIMAL(10,2), 

    IN PrecioMax DECIMAL(10,2) 

)
BEGIN 

    SELECT  

        r.fecha_reserva, 

        r.costo_final, 

        p.nombre AS plan, 

        c.nombre AS ciudad 

    FROM reserva r 

    JOIN plan p ON p.id = r.id_plan 

    JOIN ciudad c ON c.id = p.id_ciudad 

    WHERE c.nombre = Ciudad 

      AND r.costo_final BETWEEN PrecioMin AND PrecioMax; 

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerReservasPorTurista` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VerReservasPorTurista`( 

    IN NombreTurista VARCHAR(100) 

)
BEGIN 

    SELECT  

        r.fecha_reserva, 

        r.costo_final, 

        p.nombre AS plan, 

        c.nombre AS ciudad, 

        t.nombre AS turista 

    FROM reserva r 

    JOIN plan p ON p.id = r.id_plan 

    JOIN ciudad c ON c.id = p.id_ciudad 

    JOIN turista t ON t.id = r.id_turista 

    WHERE t.nombre = NombreTurista; 

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerReservasRecientesPorCiudad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VerReservasRecientesPorCiudad`( 

    IN Ciudad VARCHAR(100) 

)
BEGIN 

    SELECT  

        r.fecha_reserva,  

        r.costo_final,  

        p.nombre AS plan,  

        c.nombre AS ciudad 

    FROM reserva r 

    JOIN plan p ON p.id = r.id_plan 

    JOIN ciudad c ON c.id = p.id_ciudad 

    WHERE r.fecha_reserva >= CURDATE() - INTERVAL 30 DAY 

      AND c.nombre = Ciudad; 

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `planesporciudad`
--

/*!50001 DROP VIEW IF EXISTS `planesporciudad`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `planesporciudad` AS select `p`.`id` AS `id_plan`,`p`.`nombre` AS `nombre_plan`,`c`.`id` AS `id_ciudad`,`c`.`nombre` AS `nombre_ciudad` from (`plan` `p` join `ciudad` `c` on(`p`.`id_ciudad` = `c`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-17 22:14:52

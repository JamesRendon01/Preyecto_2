<<<<<<< HEAD
-- MySQL dump 10.13  Distrib 9.4.0, for Win64 (x86_64)
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
INSERT INTO `administrador` VALUES (1,'ana','anaghr05@gmail.com',NULL,NULL,NULL,'$2b$12$2LZ099ydkCUWsGd1Cf2N9eVL0r1YIe9vCD1WhqzQ.QueuubirVcY6',0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auditoria_plan`
--

LOCK TABLES `auditoria_plan` WRITE;
/*!40000 ALTER TABLE `auditoria_plan` DISABLE KEYS */;
INSERT INTO `auditoria_plan` VALUES (1,'INSERT','2025-10-06 16:36:15',NULL,NULL,'{\"id\": 1, \"nombre\": \"ccccc\", \"descripcion\": \"qwertyuiop\", \"descripcion_corta\": \"wertyui\", \"costo_persona\": 1000000, \"imagen\": null, \"id_ciudad\": 6, \"id_informe\": null}'),(2,'UPDATE','2025-10-06 17:06:03',NULL,'{\"id\": 1, \"nombre\": \"ccccc\", \"descripcion\": \"qwertyuiop\", \"descripcion_corta\": \"wertyui\", \"costo_persona\": 1000000, \"imagen\": null, \"id_ciudad\": 6, \"id_informe\": null}','{\"id\": 1, \"nombre\": \"ccccc\", \"descripcion\": \"qwertyuiop\", \"descripcion_corta\": \"wertyui\", \"costo_persona\": 1000000, \"imagen\": \"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTExMWFRUXGRgbGBgYGBgeGBgaGhcaGxodGhobHiggGhonHxoYITEhJSorLjAuGCAzODMtNygtLisBCgoKDg0OGhAQGy0mHyUtLS0vLS0tLS01LS0tLS0tLS0tLy8wLTUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/\", \"id_ciudad\": 6, \"id_informe\": null}'),(3,'UPDATE','2025-10-06 17:07:19',NULL,'{\"id\": 1, \"nombre\": \"ccccc\", \"descripcion\": \"qwertyuiop\", \"descripcion_corta\": \"wertyui\", \"costo_persona\": 1000000, \"imagen\": \"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTExMWFRUXGRgbGBgYGBgeGBgaGhcaGxodGhobHiggGhonHxoYITEhJSorLjAuGCAzODMtNygtLisBCgoKDg0OGhAQGy0mHyUtLS0vLS0tLS01LS0tLS0tLS0tLy8wLTUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/\", \"id_ciudad\": 6, \"id_informe\": null}','{\"id\": 1, \"nombre\": \"ccccc\", \"descripcion\": \"qwertyuiop\", \"descripcion_corta\": \"wertyui\", \"costo_persona\": 1000000, \"imagen\": \"https://mlqfmr3rpryd.i.optimole.com/cb:JBSP.a525/w:auto/h:auto/q:100/ig:avif/https://cartagena-tours.co/wp-content/uploads/2024/10/cartagena-aerea.jpg\", \"id_ciudad\": 6, \"id_informe\": null}'),(4,'INSERT','2025-10-06 17:10:17',NULL,NULL,'{\"id\": 2, \"nombre\": \"pp2\", \"descripcion\": \"pppppppppppppppp\", \"descripcion_corta\": \"asdf\", \"costo_persona\": 909090, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}'),(5,'UPDATE','2025-10-07 16:12:11',NULL,'{\"id\": 1, \"nombre\": \"ccccc\", \"descripcion\": \"qwertyuiop\", \"descripcion_corta\": \"wertyui\", \"costo_persona\": 1000000, \"imagen\": \"https://mlqfmr3rpryd.i.optimole.com/cb:JBSP.a525/w:auto/h:auto/q:100/ig:avif/https://cartagena-tours.co/wp-content/uploads/2024/10/cartagena-aerea.jpg\", \"id_ciudad\": 6, \"id_informe\": null}','{\"id\": 1, \"nombre\": \"xxxxxxxxxxxxx\", \"descripcion\": \"qwertyuiop\", \"descripcion_corta\": \"wertyui\", \"costo_persona\": 1000000, \"imagen\": \"f301554255184406a146f9d054f45461.jpeg\", \"id_ciudad\": 6, \"id_informe\": null}'),(6,'UPDATE','2025-10-07 16:13:57',NULL,'{\"id\": 2, \"nombre\": \"pp2\", \"descripcion\": \"pppppppppppppppp\", \"descripcion_corta\": \"asdf\", \"costo_persona\": 909090, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}','{\"id\": 2, \"nombre\": \"pp2\", \"descripcion\": \"ppppppppppppppppesrxdtcfvygbuhnijmok,azwesxrdctvgbuhnjimkwazesxrdctfvygbuhnijmok,waezsrdfgbhnjmwazesxrctvybnaesxrdctfvgbhnesxrdctfvygbhun\", \"descripcion_corta\": \"asdf\", \"costo_persona\": 909090, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}'),(7,'UPDATE','2025-10-07 16:14:21',NULL,'{\"id\": 2, \"nombre\": \"pp2\", \"descripcion\": \"ppppppppppppppppesrxdtcfvygbuhnijmok,azwesxrdctvgbuhnjimkwazesxrdctfvygbuhnijmok,waezsrdfgbhnjmwazesxrctvybnaesxrdctfvgbhnesxrdctfvygbhun\", \"descripcion_corta\": \"asdf\", \"costo_persona\": 909090, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}','{\"id\": 2, \"nombre\": \"pp2\", \"descripcion\": \"ppppppppppppppppesrxdtcfvygbuhnijmok,azwesxrdctvgbuhnjimkwazesxrdctfvygbuhnijmok,waezsrdfgbhnjmwazesxrctvybnaesxrdctfvgbhnesxrdctfvygbhun\", \"descripcion_corta\": \"asdfQ<<WAZESXRDTFVYGBUHNJIMKOzesxrdctfvygbh\", \"costo_persona\": 909090, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}'),(8,'UPDATE','2025-10-07 16:16:13',NULL,'{\"id\": 2, \"nombre\": \"pp2\", \"descripcion\": \"ppppppppppppppppesrxdtcfvygbuhnijmok,azwesxrdctvgbuhnjimkwazesxrdctfvygbuhnijmok,waezsrdfgbhnjmwazesxrctvybnaesxrdctfvgbhnesxrdctfvygbhun\", \"descripcion_corta\": \"asdfQ<<WAZESXRDTFVYGBUHNJIMKOzesxrdctfvygbh\", \"costo_persona\": 909090, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}','{\"id\": 2, \"nombre\": \"pp2\", \"descripcion\": \"ppppppppppppppppesrxdtcfvygbuhnijmok\", \"descripcion_corta\": \"asdfQ\", \"costo_persona\": 909090, \"imagen\": \"2cc60f7877b8475dbea1575b42fbd04b.jpg\", \"id_ciudad\": 1, \"id_informe\": null}');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad`
--

LOCK TABLES `ciudad` WRITE;
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT INTO `ciudad` VALUES (4,'Barranquilla'),(1,'Bogotá'),(6,'Bucaramanga'),(3,'Cali'),(5,'Cartagena'),(2,'Medellín'),(7,'Pereira');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan`
--

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
INSERT INTO `plan` VALUES (1,'xxxxxxxxxxxxx','qwertyuiop','wertyui',1000000,'f301554255184406a146f9d054f45461.jpeg',6,NULL,NULL),(2,'pp2','ppppppppppppppppesrxdtcfvygbuhnijmok','asdfQ',909090,'2cc60f7877b8475dbea1575b42fbd04b.jpg',1,NULL,NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turista`
--

LOCK TABLES `turista` WRITE;
/*!40000 ALTER TABLE `turista` DISABLE KEYS */;
INSERT INTO `turista` VALUES (1,'Gaby','gabyh0541@gmail.com','3132008227','2008-02-25','wertyuiop','CE','1033722144','$2b$12$DpHSO49rO3pMWdlxHhRdIObhuFHicQEZAWtiTlzBqYh88hdJ.8jVe',0,NULL,NULL,NULL,NULL,NULL,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicacion`
--

LOCK TABLES `ubicacion` WRITE;
/*!40000 ALTER TABLE `ubicacion` DISABLE KEYS */;
INSERT INTO `ubicacion` VALUES (1,'25','21',2);
/*!40000 ALTER TABLE `ubicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'escapade_parfaite'
--

--
-- Dumping routines for database 'escapade_parfaite'
--
--
-- WARNING: can't read the INFORMATION_SCHEMA.libraries table. It's most probably an old server 5.5.5-10.4.32-MariaDB.
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-14 21:33:04
=======
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
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auditoria_plan`
--

LOCK TABLES `auditoria_plan` WRITE;
/*!40000 ALTER TABLE `auditoria_plan` DISABLE KEYS */;
INSERT INTO `auditoria_plan` VALUES (37,'INSERT','2025-09-15 20:44:49',NULL,NULL,'{\"id\": 13, \"nombre\": \"Tour por la Candelaria \", \"descripcion\": \"Recorrido guiado a pie por el barrio histórico La Candelaria, visitando murales, arquitectura colonial, Plaza de Bolívar y Museo del Oro. \", \"descripcion_corta\": \"Tour a pie por el centro histórico de Bogotá.\", \"costo_persona\": 70000, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}'),(38,'INSERT','2025-09-15 20:46:19',NULL,NULL,'{\"id\": 14, \"nombre\": \"Tour Comuna 13 \", \"descripcion\": \"Visita guiada a la Comuna 13, grafitis, historia de transformación social, escaleras eléctricas y miradores. Duración 3–4 horas.\", \"descripcion_corta\": \"Grafiti tour en Comuna 13.\", \"costo_persona\": 60, \"imagen\": \"imagen_2025-09-15_204617343.png\", \"id_ciudad\": 2, \"id_informe\": null}'),(39,'UPDATE','2025-09-15 20:46:41',NULL,'{\"id\": 14, \"nombre\": \"Tour Comuna 13 \", \"descripcion\": \"Visita guiada a la Comuna 13, grafitis, historia de transformación social, escaleras eléctricas y miradores. Duración 3–4 horas.\", \"descripcion_corta\": \"Grafiti tour en Comuna 13.\", \"costo_persona\": 60, \"imagen\": \"imagen_2025-09-15_204617343.png\", \"id_ciudad\": 2, \"id_informe\": null}','{\"id\": 14, \"nombre\": \"Tour Comuna 13 \", \"descripcion\": \"Visita guiada a la Comuna 13, grafitis, historia de transformación social, escaleras eléctricas y miradores. Duración 3–4 horas.\", \"descripcion_corta\": \"Grafiti tour en Comuna 13.\", \"costo_persona\": 60000, \"imagen\": \"imagen_2025-09-15_204617343.png\", \"id_ciudad\": 2, \"id_informe\": null}'),(40,'UPDATE','2025-09-15 20:47:07',NULL,'{\"id\": 13, \"nombre\": \"Tour por la Candelaria \", \"descripcion\": \"Recorrido guiado a pie por el barrio histórico La Candelaria, visitando murales, arquitectura colonial, Plaza de Bolívar y Museo del Oro. \", \"descripcion_corta\": \"Tour a pie por el centro histórico de Bogotá.\", \"costo_persona\": 70000, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}','{\"id\": 13, \"nombre\": \"Tour por la Candelaria \", \"descripcion\": \"Recorrido guiado a pie por el barrio histórico La Candelaria, visitando murales, arquitectura colonial, Plaza de Bolívar y Museo del Oro. \", \"descripcion_corta\": \"Tour a pie por el centro histórico de Bogotá.\", \"costo_persona\": 70000, \"imagen\": \"imagen_2025-09-15_204657941.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(41,'INSERT','2025-09-15 20:47:57',NULL,NULL,'{\"id\": 15, \"nombre\": \"Tour Café \", \"descripcion\": \"Experiencia cafetera en finca de Quindío o Risaralda: recorrido por cafetales, proceso y cata. Duración 4 horas aprox.\", \"descripcion_corta\": \"Experiencia cafetera tradicional.\", \"costo_persona\": 90, \"imagen\": \"imagen_2025-09-15_204749656.png\", \"id_ciudad\": 2, \"id_informe\": null}'),(42,'UPDATE','2025-09-15 20:50:45',NULL,'{\"id\": 13, \"nombre\": \"Tour por la Candelaria \", \"descripcion\": \"Recorrido guiado a pie por el barrio histórico La Candelaria, visitando murales, arquitectura colonial, Plaza de Bolívar y Museo del Oro. \", \"descripcion_corta\": \"Tour a pie por el centro histórico de Bogotá.\", \"costo_persona\": 70000, \"imagen\": \"imagen_2025-09-15_204657941.png\", \"id_ciudad\": 1, \"id_informe\": null}','{\"id\": 13, \"nombre\": \"Tour por la Candelaria \", \"descripcion\": \"\", \"descripcion_corta\": \"Tour a pie por el centro histórico de Bogotá.\", \"costo_persona\": 70000, \"imagen\": \"imagen_2025-09-15_205012948.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(43,'UPDATE','2025-09-15 20:51:18',NULL,'{\"id\": 13, \"nombre\": \"Tour por la Candelaria \", \"descripcion\": \"\", \"descripcion_corta\": \"Tour a pie por el centro histórico de Bogotá.\", \"costo_persona\": 70000, \"imagen\": \"imagen_2025-09-15_205012948.png\", \"id_ciudad\": 1, \"id_informe\": null}','{\"id\": 13, \"nombre\": \"Tour por la Candelaria \", \"descripcion\": \"Recorrido guiado a pie por el barrio histórico La Candelaria, visitando murales, arquitectura colonial, Plaza de Bolívar y Museo del Oro. \", \"descripcion_corta\": \"Tour a pie por el centro histórico de Bogotá.\", \"costo_persona\": 70000, \"imagen\": \"imagen_2025-09-15_205012948.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(44,'UPDATE','2025-09-15 20:51:59',NULL,'{\"id\": 14, \"nombre\": \"Tour Comuna 13 \", \"descripcion\": \"Visita guiada a la Comuna 13, grafitis, historia de transformación social, escaleras eléctricas y miradores. Duración 3–4 horas.\", \"descripcion_corta\": \"Grafiti tour en Comuna 13.\", \"costo_persona\": 60000, \"imagen\": \"imagen_2025-09-15_204617343.png\", \"id_ciudad\": 2, \"id_informe\": null}','{\"id\": 14, \"nombre\": \"Tour Comuna 13 \", \"descripcion\": \"Visita guiada a la Comuna 13, grafitis, historia de transformación social, escaleras eléctricas y miradores. Duración 3–4 horas.\", \"descripcion_corta\": \"Grafiti tour en Comuna 13.\", \"costo_persona\": 60000, \"imagen\": \"imagen_2025-09-15_205146857.png\", \"id_ciudad\": 2, \"id_informe\": null}'),(45,'INSERT','2025-09-15 20:56:35',NULL,NULL,'{\"id\": 16, \"nombre\": \"Tour Manglares La Boquilla \", \"descripcion\": \"Paseo en canoa por los manglares de La Boquilla con guía local, avistamiento de aves y taller de pesca artesanal. Duración 2 horas.\", \"descripcion_corta\": \"Tour Manglares La Boquilla \", \"costo_persona\": 120000, \"imagen\": \"imagen_2025-09-15_205631233.png\", \"id_ciudad\": 5, \"id_informe\": null}'),(46,'UPDATE','2025-09-15 20:58:45',NULL,'{\"id\": 16, \"nombre\": \"Tour Manglares La Boquilla \", \"descripcion\": \"Paseo en canoa por los manglares de La Boquilla con guía local, avistamiento de aves y taller de pesca artesanal. Duración 2 horas.\", \"descripcion_corta\": \"Tour Manglares La Boquilla \", \"costo_persona\": 120000, \"imagen\": \"imagen_2025-09-15_205631233.png\", \"id_ciudad\": 5, \"id_informe\": null}','{\"id\": 16, \"nombre\": \"Tour Manglares La Boquilla \", \"descripcion\": \"Paseo en canoa por los manglares de La Boquilla con guía local, avistamiento de aves y taller de pesca artesanal. Duración 2 horas.\", \"descripcion_corta\": \"Tour Manglares La Boquilla \", \"costo_persona\": 120000, \"imagen\": \"imagen_2025-09-15_205835564.png\", \"id_ciudad\": 5, \"id_informe\": null}'),(47,'UPDATE','2025-09-15 20:59:22',NULL,'{\"id\": 15, \"nombre\": \"Tour Café \", \"descripcion\": \"Experiencia cafetera en finca de Quindío o Risaralda: recorrido por cafetales, proceso y cata. Duración 4 horas aprox.\", \"descripcion_corta\": \"Experiencia cafetera tradicional.\", \"costo_persona\": 90, \"imagen\": \"imagen_2025-09-15_204749656.png\", \"id_ciudad\": 2, \"id_informe\": null}','{\"id\": 15, \"nombre\": \"Tour Café \", \"descripcion\": \"Experiencia cafetera en finca de Quindío o Risaralda: recorrido por cafetales, proceso y cata. Duración 4 horas aprox.\", \"descripcion_corta\": \"Experiencia cafetera tradicional.\", \"costo_persona\": 90, \"imagen\": \"imagen_2025-09-15_205920195.png\", \"id_ciudad\": 2, \"id_informe\": null}'),(48,'INSERT','2025-09-15 21:00:56',NULL,NULL,'{\"id\": 17, \"nombre\": \"Caminata al Salto del Tequenda\", \"descripcion\": \"Caminata guiada por senderos naturales hasta el mirador de la cascada Salto del Tequendama. Duración 3 horas.\", \"descripcion_corta\": \"Senderismo al Salto del Tequendama.\", \"costo_persona\": 50, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}'),(49,'UPDATE','2025-09-15 23:09:29',NULL,'{\"id\": 17, \"nombre\": \"Caminata al Salto del Tequenda\", \"descripcion\": \"Caminata guiada por senderos naturales hasta el mirador de la cascada Salto del Tequendama. Duración 3 horas.\", \"descripcion_corta\": \"Senderismo al Salto del Tequendama.\", \"costo_persona\": 50, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}','{\"id\": 17, \"nombre\": \"Caminata al Salto del Tequenda\", \"descripcion\": \"Caminata guiada por senderos naturales hasta el mirador de la cascada Salto del Tequendama. Duración 3 horas.\", \"descripcion_corta\": \"Senderismo al Salto del Tequendama.\", \"costo_persona\": 50000, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}'),(50,'UPDATE','2025-09-15 23:09:40',NULL,'{\"id\": 15, \"nombre\": \"Tour Café \", \"descripcion\": \"Experiencia cafetera en finca de Quindío o Risaralda: recorrido por cafetales, proceso y cata. Duración 4 horas aprox.\", \"descripcion_corta\": \"Experiencia cafetera tradicional.\", \"costo_persona\": 90, \"imagen\": \"imagen_2025-09-15_205920195.png\", \"id_ciudad\": 2, \"id_informe\": null}','{\"id\": 15, \"nombre\": \"Tour Café \", \"descripcion\": \"Experiencia cafetera en finca de Quindío o Risaralda: recorrido por cafetales, proceso y cata. Duración 4 horas aprox.\", \"descripcion_corta\": \"Experiencia cafetera tradicional.\", \"costo_persona\": 90000, \"imagen\": \"imagen_2025-09-15_205920195.png\", \"id_ciudad\": 2, \"id_informe\": null}'),(51,'INSERT','2025-09-15 23:21:54',NULL,NULL,'{\"id\": 18, \"nombre\": \"Monserrate & Museo del Oro \", \"descripcion\": \"Tour de medio día que incluye subida al cerro de Monserrate para ver vista panorámica de Bogotá + visita al Museo del Oro para conocer la colección prehispánica.\", \"descripcion_corta\": \"Vista y cultura en Bogotá\", \"costo_persona\": 120000, \"imagen\": \"7d953195162d49baae0c7298e4dddaf5.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(52,'UPDATE','2025-09-15 23:23:38',NULL,'{\"id\": 17, \"nombre\": \"Caminata al Salto del Tequenda\", \"descripcion\": \"Caminata guiada por senderos naturales hasta el mirador de la cascada Salto del Tequendama. Duración 3 horas.\", \"descripcion_corta\": \"Senderismo al Salto del Tequendama.\", \"costo_persona\": 50000, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}','{\"id\": 17, \"nombre\": \"Caminata al Salto del Tequenda\", \"descripcion\": \"Caminata guiada por senderos naturales hasta el mirador de la cascada Salto del Tequendama. Duración 3 horas.\", \"descripcion_corta\": \"Senderismo al Salto del Tequendama.\", \"costo_persona\": 50000, \"imagen\": \"02898101a6654a44b5b3a4e00445fa30.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(53,'INSERT','2025-09-15 23:39:35',NULL,NULL,'{\"id\": 19, \"nombre\": \"Mina de Sal de Zipaquirá\", \"descripcion\": \"Excursión de medio día para visitar la Catedral de Sal; recorrido por galerías subterráneas y sala de tormentas.\", \"descripcion_corta\": \"Catedral de Sal.\", \"costo_persona\": 265000, \"imagen\": \"58a9eba0d678424dad19e7c1e831652f.png\", \"id_ciudad\": 6, \"id_informe\": null}'),(54,'INSERT','2025-09-15 23:49:06',NULL,NULL,'{\"id\": 20, \"nombre\": \"Tour de frutas exóticas \", \"descripcion\": \"Caminata guiada por el mercado de Paloquemao probando frutas locales, aprendiendo sobre productos típicos y su origen.\", \"descripcion_corta\": \"Gastronomía local de frutas.\", \"costo_persona\": 150, \"imagen\": \"3e81c2159cb54e63a9cb1268ca2f782e.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(55,'INSERT','2025-09-15 23:49:44',NULL,NULL,'{\"id\": 21, \"nombre\": \"La Chorrera \", \"descripcion\": \"Cascada La Chorrera.\", \"descripcion_corta\": \"Caminata / senderismo hacia la cascada La Chorrera, con guía, naturaleza, vistas y tiempo para baño \", \"costo_persona\": 270, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}'),(56,'INSERT','2025-09-15 23:50:41',NULL,NULL,'{\"id\": 22, \"nombre\": \"Parque Natural Chicaque\", \"descripcion\": \"Excursión de medio día en bosque de niebla con senderos, miradores y contacto con naturaleza cerca de Bogotá.\", \"descripcion_corta\": \"Bosque de niebla en Chicaque.\", \"costo_persona\": 250, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}'),(57,'UPDATE','2025-09-15 23:51:17',NULL,'{\"id\": 21, \"nombre\": \"La Chorrera \", \"descripcion\": \"Cascada La Chorrera.\", \"descripcion_corta\": \"Caminata / senderismo hacia la cascada La Chorrera, con guía, naturaleza, vistas y tiempo para baño \", \"costo_persona\": 270, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}','{\"id\": 21, \"nombre\": \"La Chorrera \", \"descripcion\": \"Caminata / senderismo hacia la cascada La Chorrera, con guía, naturaleza, vistas y tiempo para baño si el clima lo permite.\", \"descripcion_corta\": \"Cascada La Chorrera.\", \"costo_persona\": 270000, \"imagen\": \"d50a74c203d8419e8def06ffd2dd560b.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(58,'UPDATE','2025-09-15 23:51:40',NULL,'{\"id\": 22, \"nombre\": \"Parque Natural Chicaque\", \"descripcion\": \"Excursión de medio día en bosque de niebla con senderos, miradores y contacto con naturaleza cerca de Bogotá.\", \"descripcion_corta\": \"Bosque de niebla en Chicaque.\", \"costo_persona\": 250, \"imagen\": null, \"id_ciudad\": 1, \"id_informe\": null}','{\"id\": 22, \"nombre\": \"Parque Natural Chicaque\", \"descripcion\": \"Excursión de medio día en bosque de niebla con senderos, miradores y contacto con naturaleza cerca de Bogotá.\", \"descripcion_corta\": \"Bosque de niebla en Chicaque.\", \"costo_persona\": 250, \"imagen\": \"8672392de90d4dd0963043fb81dc4cfe.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(59,'UPDATE','2025-09-15 23:51:52',NULL,'{\"id\": 20, \"nombre\": \"Tour de frutas exóticas \", \"descripcion\": \"Caminata guiada por el mercado de Paloquemao probando frutas locales, aprendiendo sobre productos típicos y su origen.\", \"descripcion_corta\": \"Gastronomía local de frutas.\", \"costo_persona\": 150, \"imagen\": \"3e81c2159cb54e63a9cb1268ca2f782e.png\", \"id_ciudad\": 1, \"id_informe\": null}','{\"id\": 20, \"nombre\": \"Tour de frutas exóticas \", \"descripcion\": \"Caminata guiada por el mercado de Paloquemao probando frutas locales, aprendiendo sobre productos típicos y su origen.\", \"descripcion_corta\": \"Gastronomía local de frutas.\", \"costo_persona\": 150000, \"imagen\": \"3e81c2159cb54e63a9cb1268ca2f782e.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(60,'UPDATE','2025-09-15 23:51:58',NULL,'{\"id\": 22, \"nombre\": \"Parque Natural Chicaque\", \"descripcion\": \"Excursión de medio día en bosque de niebla con senderos, miradores y contacto con naturaleza cerca de Bogotá.\", \"descripcion_corta\": \"Bosque de niebla en Chicaque.\", \"costo_persona\": 250, \"imagen\": \"8672392de90d4dd0963043fb81dc4cfe.png\", \"id_ciudad\": 1, \"id_informe\": null}','{\"id\": 22, \"nombre\": \"Parque Natural Chicaque\", \"descripcion\": \"Excursión de medio día en bosque de niebla con senderos, miradores y contacto con naturaleza cerca de Bogotá.\", \"descripcion_corta\": \"Bosque de niebla en Chicaque.\", \"costo_persona\": 250000, \"imagen\": \"8672392de90d4dd0963043fb81dc4cfe.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(61,'INSERT','2025-09-16 00:09:55',NULL,NULL,'{\"id\": 23, \"nombre\": \"Tour Ciudad Vieja & Castillo S\", \"descripcion\": \"Recorrido guiado de unas pocas horas por Getsemaní, la Ciudad Amurallada y el Castillo San Felipe de Barajas, apreciando arquitectura colonial.\", \"descripcion_corta\": \"Historia colonial en Cartagena.\", \"costo_persona\": 100000, \"imagen\": \"731ba177c06a4addbad67b6dafdb1d9e.png\", \"id_ciudad\": 5, \"id_informe\": null}'),(62,'INSERT','2025-09-16 00:10:26',NULL,NULL,'{\"id\": 24, \"nombre\": \"Free Bike Tour Bogotá\", \"descripcion\": \"Recorrido en bicicleta por zonas representativas de Bogotá, explorando parques, arte callejero y panorámicas, guiado.\", \"descripcion_corta\": \"Bici por Bogotá gratis.\", \"costo_persona\": 0, \"imagen\": \"db91e3db1ee84a019c66be84983b75d5.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(63,'INSERT','2025-09-16 00:11:03',NULL,NULL,'{\"id\": 25, \"nombre\": \"Graffiti & Identity Tour Bogot\", \"descripcion\": \"Tour guiado de arte urbano y grafiti en Bogotá, aprendiendo sobre los artistas, los mensajes y la transformación cultural.\", \"descripcion_corta\": \"Grafiti y arte urbano Bogotá.\", \"costo_persona\": 60000, \"imagen\": \"3d0e8ccc070741f89e99d880c2c28a30.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(64,'DELETE','2025-09-16 15:29:01',NULL,'{\"id\": 13, \"nombre\": \"Tour por la Candelaria \", \"descripcion\": \"Recorrido guiado a pie por el barrio histórico La Candelaria, visitando murales, arquitectura colonial, Plaza de Bolívar y Museo del Oro. \", \"descripcion_corta\": \"Tour a pie por el centro histórico de Bogotá.\", \"costo_persona\": 70000, \"imagen\": \"imagen_2025-09-15_205012948.png\", \"id_ciudad\": 1, \"id_informe\": null}',NULL),(65,'INSERT','2025-09-16 15:29:19',NULL,NULL,'{\"id\": 26, \"nombre\": \"tasdaS\", \"descripcion\": \"asdasd\", \"descripcion_corta\": \"SADA\", \"costo_persona\": 30000, \"imagen\": null, \"id_ciudad\": 5, \"id_informe\": null}'),(66,'UPDATE','2025-09-16 15:29:39',NULL,'{\"id\": 26, \"nombre\": \"tasdaS\", \"descripcion\": \"asdasd\", \"descripcion_corta\": \"SADA\", \"costo_persona\": 30000, \"imagen\": null, \"id_ciudad\": 5, \"id_informe\": null}','{\"id\": 26, \"nombre\": \"tasdaS\", \"descripcion\": \"asdasd\", \"descripcion_corta\": \"SADA\", \"costo_persona\": 30000, \"imagen\": \"ace53aafa13e416d8c2b44c49e1fb3f7.jpg\", \"id_ciudad\": 5, \"id_informe\": null}'),(67,'DELETE','2025-09-22 23:23:16',NULL,'{\"id\": 26, \"nombre\": \"tasdaS\", \"descripcion\": \"asdasd\", \"descripcion_corta\": \"SADA\", \"costo_persona\": 30000, \"imagen\": \"ace53aafa13e416d8c2b44c49e1fb3f7.jpg\", \"id_ciudad\": 5, \"id_informe\": null}',NULL),(68,'DELETE','2025-09-22 23:46:32',NULL,'{\"id\": 21, \"nombre\": \"La Chorrera \", \"descripcion\": \"Caminata / senderismo hacia la cascada La Chorrera, con guía, naturaleza, vistas y tiempo para baño si el clima lo permite.\", \"descripcion_corta\": \"Cascada La Chorrera.\", \"costo_persona\": 270000, \"imagen\": \"d50a74c203d8419e8def06ffd2dd560b.png\", \"id_ciudad\": 1, \"id_informe\": null}',NULL),(69,'DELETE','2025-09-23 00:03:51',NULL,'{\"id\": 16, \"nombre\": \"Tour Manglares La Boquilla \", \"descripcion\": \"Paseo en canoa por los manglares de La Boquilla con guía local, avistamiento de aves y taller de pesca artesanal. Duración 2 horas.\", \"descripcion_corta\": \"Tour Manglares La Boquilla \", \"costo_persona\": 120000, \"imagen\": \"imagen_2025-09-15_205835564.png\", \"id_ciudad\": 5, \"id_informe\": null}',NULL),(70,'INSERT','2025-09-23 08:20:20',NULL,NULL,'{\"id\": 27, \"nombre\": \"Soacha\", \"descripcion\": \"sads\", \"descripcion_corta\": \"shdad\", \"costo_persona\": 20000, \"imagen\": \"6cb2fe559b8c457e87ff3097ff6cb78f.jpg\", \"id_ciudad\": 1, \"id_informe\": null}'),(71,'UPDATE','2025-09-27 15:10:36',NULL,'{\"id\": 14, \"nombre\": \"Tour Comuna 13 \", \"descripcion\": \"Visita guiada a la Comuna 13, grafitis, historia de transformación social, escaleras eléctricas y miradores. Duración 3–4 horas.\", \"descripcion_corta\": \"Grafiti tour en Comuna 13.\", \"costo_persona\": 60000, \"imagen\": \"imagen_2025-09-15_205146857.png\", \"id_ciudad\": 2, \"id_informe\": null}','{\"id\": 14, \"nombre\": \"Tour Comuna 13 \", \"descripcion\": \"Visita guiada a la Comuna 13, grafitis, historia de transformación social, escaleras eléctricas y miradores. Duración 3–4 horas.\", \"descripcion_corta\": \"Grafiti tour en Comuna 13.\", \"costo_persona\": 60000, \"imagen\": \"ed151fa6c685425e8538fd194411e001.png\", \"id_ciudad\": 2, \"id_informe\": null}'),(72,'UPDATE','2025-09-27 15:18:08',NULL,'{\"id\": 24, \"nombre\": \"Free Bike Tour Bogotá\", \"descripcion\": \"Recorrido en bicicleta por zonas representativas de Bogotá, explorando parques, arte callejero y panorámicas, guiado.\", \"descripcion_corta\": \"Bici por Bogotá gratis.\", \"costo_persona\": 0, \"imagen\": \"db91e3db1ee84a019c66be84983b75d5.png\", \"id_ciudad\": 1, \"id_informe\": null}','{\"id\": 24, \"nombre\": \"Free Bike Tour Bogotá\", \"descripcion\": \"Recorrido en bicicleta por zonas representativas de Bogotá, explorando parques, arte callejero y panorámicas, guiado.\", \"descripcion_corta\": \"Bici por Bogotá gratis.\", \"costo_persona\": 0, \"imagen\": \"919269aebaae4229b5aa1a62a11349a2.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(73,'UPDATE','2025-09-27 15:19:46',NULL,'{\"id\": 24, \"nombre\": \"Free Bike Tour Bogotá\", \"descripcion\": \"Recorrido en bicicleta por zonas representativas de Bogotá, explorando parques, arte callejero y panorámicas, guiado.\", \"descripcion_corta\": \"Bici por Bogotá gratis.\", \"costo_persona\": 0, \"imagen\": \"919269aebaae4229b5aa1a62a11349a2.png\", \"id_ciudad\": 1, \"id_informe\": null}','{\"id\": 24, \"nombre\": \"Free Bike Tour Bogotá\", \"descripcion\": \"Recorrido en bicicleta por zonas representativas de Bogotá, explorando parques, arte callejero y panorámicas, guiado.\", \"descripcion_corta\": \"Bici por Bogotá gratis.\", \"costo_persona\": 0, \"imagen\": \"95c6804ec85a4e109cae3cb85f513305.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(74,'DELETE','2025-09-30 17:41:46',NULL,'{\"id\": 14, \"nombre\": \"Tour Comuna 13 \", \"descripcion\": \"Visita guiada a la Comuna 13, grafitis, historia de transformación social, escaleras eléctricas y miradores. Duración 3–4 horas.\", \"descripcion_corta\": \"Grafiti tour en Comuna 13.\", \"costo_persona\": 60000, \"imagen\": \"ed151fa6c685425e8538fd194411e001.png\", \"id_ciudad\": 2, \"id_informe\": null}',NULL),(75,'DELETE','2025-09-30 17:42:15',NULL,'{\"id\": 18, \"nombre\": \"Monserrate & Museo del Oro \", \"descripcion\": \"Tour de medio día que incluye subida al cerro de Monserrate para ver vista panorámica de Bogotá + visita al Museo del Oro para conocer la colección prehispánica.\", \"descripcion_corta\": \"Vista y cultura en Bogotá\", \"costo_persona\": 120000, \"imagen\": \"7d953195162d49baae0c7298e4dddaf5.png\", \"id_ciudad\": 1, \"id_informe\": null}',NULL),(76,'DELETE','2025-09-30 17:42:22',NULL,'{\"id\": 20, \"nombre\": \"Tour de frutas exóticas \", \"descripcion\": \"Caminata guiada por el mercado de Paloquemao probando frutas locales, aprendiendo sobre productos típicos y su origen.\", \"descripcion_corta\": \"Gastronomía local de frutas.\", \"costo_persona\": 150000, \"imagen\": \"3e81c2159cb54e63a9cb1268ca2f782e.png\", \"id_ciudad\": 1, \"id_informe\": null}',NULL),(77,'DELETE','2025-09-30 17:42:31',NULL,'{\"id\": 19, \"nombre\": \"Mina de Sal de Zipaquirá\", \"descripcion\": \"Excursión de medio día para visitar la Catedral de Sal; recorrido por galerías subterráneas y sala de tormentas.\", \"descripcion_corta\": \"Catedral de Sal.\", \"costo_persona\": 265000, \"imagen\": \"58a9eba0d678424dad19e7c1e831652f.png\", \"id_ciudad\": 6, \"id_informe\": null}',NULL),(78,'DELETE','2025-09-30 17:42:34',NULL,'{\"id\": 17, \"nombre\": \"Caminata al Salto del Tequenda\", \"descripcion\": \"Caminata guiada por senderos naturales hasta el mirador de la cascada Salto del Tequendama. Duración 3 horas.\", \"descripcion_corta\": \"Senderismo al Salto del Tequendama.\", \"costo_persona\": 50000, \"imagen\": \"02898101a6654a44b5b3a4e00445fa30.png\", \"id_ciudad\": 1, \"id_informe\": null}',NULL),(79,'DELETE','2025-09-30 17:42:44',NULL,'{\"id\": 24, \"nombre\": \"Free Bike Tour Bogotá\", \"descripcion\": \"Recorrido en bicicleta por zonas representativas de Bogotá, explorando parques, arte callejero y panorámicas, guiado.\", \"descripcion_corta\": \"Bici por Bogotá gratis.\", \"costo_persona\": 0, \"imagen\": \"95c6804ec85a4e109cae3cb85f513305.png\", \"id_ciudad\": 1, \"id_informe\": null}',NULL),(80,'DELETE','2025-09-30 17:42:47',NULL,'{\"id\": 27, \"nombre\": \"Soacha\", \"descripcion\": \"sads\", \"descripcion_corta\": \"shdad\", \"costo_persona\": 20000, \"imagen\": \"6cb2fe559b8c457e87ff3097ff6cb78f.jpg\", \"id_ciudad\": 1, \"id_informe\": null}',NULL),(81,'DELETE','2025-09-30 17:42:50',NULL,'{\"id\": 25, \"nombre\": \"Graffiti & Identity Tour Bogot\", \"descripcion\": \"Tour guiado de arte urbano y grafiti en Bogotá, aprendiendo sobre los artistas, los mensajes y la transformación cultural.\", \"descripcion_corta\": \"Grafiti y arte urbano Bogotá.\", \"costo_persona\": 60000, \"imagen\": \"3d0e8ccc070741f89e99d880c2c28a30.png\", \"id_ciudad\": 1, \"id_informe\": null}',NULL),(82,'DELETE','2025-09-30 17:42:53',NULL,'{\"id\": 23, \"nombre\": \"Tour Ciudad Vieja & Castillo S\", \"descripcion\": \"Recorrido guiado de unas pocas horas por Getsemaní, la Ciudad Amurallada y el Castillo San Felipe de Barajas, apreciando arquitectura colonial.\", \"descripcion_corta\": \"Historia colonial en Cartagena.\", \"costo_persona\": 100000, \"imagen\": \"731ba177c06a4addbad67b6dafdb1d9e.png\", \"id_ciudad\": 5, \"id_informe\": null}',NULL),(83,'DELETE','2025-09-30 17:43:47',NULL,'{\"id\": 15, \"nombre\": \"Tour Café \", \"descripcion\": \"Experiencia cafetera en finca de Quindío o Risaralda: recorrido por cafetales, proceso y cata. Duración 4 horas aprox.\", \"descripcion_corta\": \"Experiencia cafetera tradicional.\", \"costo_persona\": 90000, \"imagen\": \"imagen_2025-09-15_205920195.png\", \"id_ciudad\": 2, \"id_informe\": null}',NULL),(84,'DELETE','2025-09-30 17:43:50',NULL,'{\"id\": 22, \"nombre\": \"Parque Natural Chicaque\", \"descripcion\": \"Excursión de medio día en bosque de niebla con senderos, miradores y contacto con naturaleza cerca de Bogotá.\", \"descripcion_corta\": \"Bosque de niebla en Chicaque.\", \"costo_persona\": 250000, \"imagen\": \"8672392de90d4dd0963043fb81dc4cfe.png\", \"id_ciudad\": 1, \"id_informe\": null}',NULL),(85,'INSERT','2025-09-30 18:00:41',NULL,NULL,'{\"id\": 28, \"nombre\": \"Tour por la Candelaria (Bogotá\", \"descripcion\": \"Recorrido guiado a pie por el barrio histórico La Candelaria, visitando murales, arquitectura colonial, Plaza de Bolívar y Museo del Oro.\", \"descripcion_corta\": \"Tour a pie por el centro histórico de Bogotá.\", \"costo_persona\": 70000, \"imagen\": \"74b59e965fa5481f9f4474ed46e7c668.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(86,'INSERT','2025-09-30 18:14:20',NULL,NULL,'{\"id\": 29, \"nombre\": \"Tour Comuna 13 (Medellín)\", \"descripcion\": \"Visita guiada a la Comuna 13, grafitis, historia de transformación social, escaleras eléctricas y miradores. Duración 3–4 horas.\", \"descripcion_corta\": \"Grafiti tour en Comuna 13.\", \"costo_persona\": 59999, \"imagen\": \"4af3c624a4eb4d54a05656dcd94df930.png\", \"id_ciudad\": null, \"id_informe\": null}'),(87,'UPDATE','2025-09-30 18:16:41',NULL,'{\"id\": 29, \"nombre\": \"Tour Comuna 13 (Medellín)\", \"descripcion\": \"Visita guiada a la Comuna 13, grafitis, historia de transformación social, escaleras eléctricas y miradores. Duración 3–4 horas.\", \"descripcion_corta\": \"Grafiti tour en Comuna 13.\", \"costo_persona\": 59999, \"imagen\": \"4af3c624a4eb4d54a05656dcd94df930.png\", \"id_ciudad\": null, \"id_informe\": null}','{\"id\": 29, \"nombre\": \"Tour Comuna 13 (Medellín)\", \"descripcion\": \"Visita guiada a la Comuna 13, grafitis, historia de transformación social, escaleras eléctricas y miradores. Duración 3–4 horas.\", \"descripcion_corta\": \"Grafiti tour en Comuna 13.\", \"costo_persona\": 59999, \"imagen\": \"4af3c624a4eb4d54a05656dcd94df930.png\", \"id_ciudad\": 2, \"id_informe\": null}'),(88,'UPDATE','2025-09-30 18:16:45',NULL,'{\"id\": 28, \"nombre\": \"Tour por la Candelaria (Bogotá\", \"descripcion\": \"Recorrido guiado a pie por el barrio histórico La Candelaria, visitando murales, arquitectura colonial, Plaza de Bolívar y Museo del Oro.\", \"descripcion_corta\": \"Tour a pie por el centro histórico de Bogotá.\", \"costo_persona\": 70000, \"imagen\": \"74b59e965fa5481f9f4474ed46e7c668.png\", \"id_ciudad\": 1, \"id_informe\": null}','{\"id\": 28, \"nombre\": \"Tour por la Candelaria\", \"descripcion\": \"Recorrido guiado a pie por el barrio histórico La Candelaria, visitando murales, arquitectura colonial, Plaza de Bolívar y Museo del Oro.\", \"descripcion_corta\": \"Tour a pie por el centro histórico de Bogotá.\", \"costo_persona\": 70000, \"imagen\": \"74b59e965fa5481f9f4474ed46e7c668.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(89,'UPDATE','2025-09-30 18:16:51',NULL,'{\"id\": 29, \"nombre\": \"Tour Comuna 13 (Medellín)\", \"descripcion\": \"Visita guiada a la Comuna 13, grafitis, historia de transformación social, escaleras eléctricas y miradores. Duración 3–4 horas.\", \"descripcion_corta\": \"Grafiti tour en Comuna 13.\", \"costo_persona\": 59999, \"imagen\": \"4af3c624a4eb4d54a05656dcd94df930.png\", \"id_ciudad\": 2, \"id_informe\": null}','{\"id\": 29, \"nombre\": \"Tour Comuna 13\", \"descripcion\": \"Visita guiada a la Comuna 13, grafitis, historia de transformación social, escaleras eléctricas y miradores. Duración 3–4 horas.\", \"descripcion_corta\": \"Grafiti tour en Comuna 13.\", \"costo_persona\": 59999, \"imagen\": \"4af3c624a4eb4d54a05656dcd94df930.png\", \"id_ciudad\": 2, \"id_informe\": null}'),(90,'UPDATE','2025-09-30 18:18:06',NULL,'{\"id\": 28, \"nombre\": \"Tour por la Candelaria\", \"descripcion\": \"Recorrido guiado a pie por el barrio histórico La Candelaria, visitando murales, arquitectura colonial, Plaza de Bolívar y Museo del Oro.\", \"descripcion_corta\": \"Tour a pie por el centro histórico de Bogotá.\", \"costo_persona\": 70000, \"imagen\": \"74b59e965fa5481f9f4474ed46e7c668.png\", \"id_ciudad\": 1, \"id_informe\": null}','{\"id\": 28, \"nombre\": \"Tour por la Candelaria\", \"descripcion\": \"Recorrido guiado a pie por el barrio histórico La Candelaria, visitando murales, arquitectura colonial, Plaza de Bolívar y Museo del Oro.\", \"descripcion_corta\": \"Tour a pie por el centro histórico de Bogotá.\", \"costo_persona\": 70000, \"imagen\": \"088056bc84cc46449023b8c394537c5e.png\", \"id_ciudad\": 1, \"id_informe\": null}'),(91,'UPDATE','2025-09-30 18:20:36',NULL,'{\"id\": 29, \"nombre\": \"Tour Comuna 13\", \"descripcion\": \"Visita guiada a la Comuna 13, grafitis, historia de transformación social, escaleras eléctricas y miradores. Duración 3–4 horas.\", \"descripcion_corta\": \"Grafiti tour en Comuna 13.\", \"costo_persona\": 59999, \"imagen\": \"4af3c624a4eb4d54a05656dcd94df930.png\", \"id_ciudad\": 2, \"id_informe\": null}','{\"id\": 29, \"nombre\": \"Tour Comuna 13\", \"descripcion\": \"Visita guiada a la Comuna 13, grafitis, historia de transformación social, escaleras eléctricas y miradores. Duración 3–4 horas.\", \"descripcion_corta\": \"Grafiti tour en Comuna 13.\", \"costo_persona\": 59999, \"imagen\": \"16b8dbf712ae4649a79b6273f6d80fc4.png\", \"id_ciudad\": 2, \"id_informe\": null}'),(92,'INSERT','2025-09-30 18:21:48',NULL,NULL,'{\"id\": 30, \"nombre\": \"Tour Café Zona Cafetera\", \"descripcion\": \"Experiencia cafetera en finca de Quindío o Risaralda: recorrido por cafetales, proceso y cata. Duración 4 horas aprox.\", \"descripcion_corta\": \"Experiencia cafetera tradicional.\", \"costo_persona\": 90000, \"imagen\": null, \"id_ciudad\": null, \"id_informe\": null}'),(93,'DELETE','2025-09-30 18:22:10',NULL,'{\"id\": 30, \"nombre\": \"Tour Café Zona Cafetera\", \"descripcion\": \"Experiencia cafetera en finca de Quindío o Risaralda: recorrido por cafetales, proceso y cata. Duración 4 horas aprox.\", \"descripcion_corta\": \"Experiencia cafetera tradicional.\", \"costo_persona\": 90000, \"imagen\": null, \"id_ciudad\": null, \"id_informe\": null}',NULL),(94,'INSERT','2025-09-30 18:22:52',NULL,NULL,'{\"id\": 31, \"nombre\": \"Tour Café Zona Cafetera\", \"descripcion\": \"Experiencia cafetera en finca de Quindío o Risaralda: recorrido por cafetales, proceso y cata. Duración 4 horas aprox.\", \"descripcion_corta\": \"Experiencia cafetera tradicional.\", \"costo_persona\": 90000, \"imagen\": null, \"id_ciudad\": 2, \"id_informe\": null}'),(95,'UPDATE','2025-09-30 18:24:43',NULL,'{\"id\": 31, \"nombre\": \"Tour Café Zona Cafetera\", \"descripcion\": \"Experiencia cafetera en finca de Quindío o Risaralda: recorrido por cafetales, proceso y cata. Duración 4 horas aprox.\", \"descripcion_corta\": \"Experiencia cafetera tradicional.\", \"costo_persona\": 90000, \"imagen\": null, \"id_ciudad\": 2, \"id_informe\": null}','{\"id\": 31, \"nombre\": \"Tour Café Zona Cafetera\", \"descripcion\": \"Experiencia cafetera en finca de Quindío o Risaralda: recorrido por cafetales, proceso y cata. Duración 4 horas aprox.\", \"descripcion_corta\": \"Experiencia cafetera tradicional.\", \"costo_persona\": 90000, \"imagen\": \"57dbf1508fb84c67843f76f6b9bed591.png\", \"id_ciudad\": 2, \"id_informe\": null}'),(96,'INSERT','2025-09-30 18:26:37',NULL,NULL,'{\"id\": 32, \"nombre\": \"Tour Manglares La Boquilla \", \"descripcion\": \"Paseo en canoa por los manglares de La Boquilla con guía local, avistamiento de aves y taller de pesca artesanal. Duración 2 horas.\", \"descripcion_corta\": \"Paseo en canoa por manglares.\", \"costo_persona\": 120000, \"imagen\": \"a043eb709da54029807e58dab366db91.png\", \"id_ciudad\": 5, \"id_informe\": null}'),(97,'DELETE','2025-10-08 20:05:20',NULL,'{\"id\": 31, \"nombre\": \"Tour Café Zona Cafetera\", \"descripcion\": \"Experiencia cafetera en finca de Quindío o Risaralda: recorrido por cafetales, proceso y cata. Duración 4 horas aprox.\", \"descripcion_corta\": \"Experiencia cafetera tradicional.\", \"costo_persona\": 90000, \"imagen\": \"57dbf1508fb84c67843f76f6b9bed591.png\", \"id_ciudad\": 2, \"id_informe\": null}',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad`
--

LOCK TABLES `ciudad` WRITE;
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT INTO `ciudad` VALUES (4,'Barranquilla'),(1,'Bogotá'),(6,'Bucaramanga'),(3,'Cali'),(5,'Cartagena'),(2,'Medellín'),(7,'Pereira');
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan`
--

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
INSERT INTO `plan` VALUES (28,'Tour por la Candelaria','Recorrido guiado a pie por el barrio histórico La Candelaria, visitando murales, arquitectura colonial, Plaza de Bolívar y Museo del Oro.','Tour a pie por el centro histórico de Bogotá.',70000,'088056bc84cc46449023b8c394537c5e.png',1,NULL,NULL),(29,'Tour Comuna 13','Visita guiada a la Comuna 13, grafitis, historia de transformación social, escaleras eléctricas y miradores. Duración 3–4 horas.','Grafiti tour en Comuna 13.',59999,'16b8dbf712ae4649a79b6273f6d80fc4.png',2,NULL,NULL),(32,'Tour Manglares La Boquilla ','Paseo en canoa por los manglares de La Boquilla con guía local, avistamiento de aves y taller de pesca artesanal. Duración 2 horas.','Paseo en canoa por manglares.',120000,'a043eb709da54029807e58dab366db91.png',5,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (28,'2025-10-20',200000,1,1,NULL,29,9,_binary '%PDF-1.3\n%���� ReportLab Generated PDF document http://www.reportlab.com\n1 0 obj\n<<\n/F1 2 0 R /F2 3 0 R /F3 4 0 R\n>>\nendobj\n2 0 obj\n<<\n/BaseFont /Helvetica /Encoding /WinAnsiEncoding /Name /F1 /Subtype /Type1 /Type /Font\n>>\nendobj\n3 0 obj\n<<\n/BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding /Name /F2 /Subtype /Type1 /Type /Font\n>>\nendobj\n4 0 obj\n<<\n/BaseFont /ZapfDingbats /Name /F3 /Subtype /Type1 /Type /Font\n>>\nendobj\n5 0 obj\n<<\n/Contents 9 0 R /MediaBox [ 0 0 612 792 ] /Parent 8 0 R /Resources <<\n/Font 1 0 R /ProcSet [ /PDF /Text /ImageB /ImageC /ImageI ]\n>> /Rotate 0 /Trans <<\n\n>> \n  /Type /Page\n>>\nendobj\n6 0 obj\n<<\n/PageMode /UseNone /Pages 8 0 R /Type /Catalog\n>>\nendobj\n7 0 obj\n<<\n/Author (anonymous) /CreationDate (D:20251008195325-05\'00\') /Creator (ReportLab PDF Library - www.reportlab.com) /Keywords () /ModDate (D:20251008195325-05\'00\') /Producer (ReportLab PDF Library - www.reportlab.com) \n  /Subject (unspecified) /Title (Comprobante de Pago) /Trapped /False\n>>\nendobj\n8 0 obj\n<<\n/Count 1 /Kids [ 5 0 R ] /Type /Pages\n>>\nendobj\n9 0 obj\n<<\n/Filter [ /ASCII85Decode /FlateDecode ] /Length 542\n>>\nstream\nGat$sbAQ&g&A70Vp<Z01,Vk\\s]l(8\'pQEIH_4rZb7&LB.d\\,ZoT3k3\"g;L5L\"9N\\tjil#q%Kc/B%fbeoY`LPC+Wps!\"6:%!Gn5VA)X8\"j*pQlrs4/o$@$X3>VN;&bnc7:bog?8m0BS>$J@bm*q=jP`OO#&ar?:eU1([cb\'-rQjJ:rnuO\'A&L+GA,6S:t:6qoV9oLe,B+_3&E+>O>`reSJC4$l$IFcF+&adb0MKEF#\'\\3$7^?$QN@:OtGOM3#tMmFS/SoYcpp3gG4dJ5ggO5)\'r7p?g94&*l7F.R^VhW48%%OYgK>VAfAY+&XL!%R&1bA9^q<01^qe//JGY#`ob\'uE=n+nM1;HK,I#rRPCp4i#>9D\')<K\\A\"Gu3!+5k.kjNuY#Mr^1eBk5:cWEj;!CAi2%DaSP;VlRhSEDZF!A2dYW9nPc)*dSbd>?e$`*7^7^6Rqi344P,sf=,OfSBkco&)\\T=E\\6JK?4U?ToRT^+E8XaV%_\\`fn)Mfa<rL\\:*/_1&8*-S5b3`0Wl,eoF4X^)5dbsCLcfY;t~>endstream\nendobj\nxref\n0 10\n0000000000 65535 f \n0000000073 00000 n \n0000000124 00000 n \n0000000231 00000 n \n0000000343 00000 n \n0000000426 00000 n \n0000000619 00000 n \n0000000687 00000 n \n0000000994 00000 n \n0000001053 00000 n \ntrailer\n<<\n/ID \n[<2f686a8388ddf2c19602e93a6a233ee4><2f686a8388ddf2c19602e93a6a233ee4>]\n% ReportLab generated PDF document -- digest (http://www.reportlab.com)\n\n/Info 7 0 R\n/Root 6 0 R\n/Size 10\n>>\nstartxref\n1685\n%%EOF\n'),(29,'2025-10-13',200000,1,3,NULL,32,9,_binary '%PDF-1.3\n%���� ReportLab Generated PDF document http://www.reportlab.com\n1 0 obj\n<<\n/F1 2 0 R /F2 3 0 R /F3 4 0 R\n>>\nendobj\n2 0 obj\n<<\n/BaseFont /Helvetica /Encoding /WinAnsiEncoding /Name /F1 /Subtype /Type1 /Type /Font\n>>\nendobj\n3 0 obj\n<<\n/BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding /Name /F2 /Subtype /Type1 /Type /Font\n>>\nendobj\n4 0 obj\n<<\n/BaseFont /ZapfDingbats /Name /F3 /Subtype /Type1 /Type /Font\n>>\nendobj\n5 0 obj\n<<\n/Contents 9 0 R /MediaBox [ 0 0 612 792 ] /Parent 8 0 R /Resources <<\n/Font 1 0 R /ProcSet [ /PDF /Text /ImageB /ImageC /ImageI ]\n>> /Rotate 0 /Trans <<\n\n>> \n  /Type /Page\n>>\nendobj\n6 0 obj\n<<\n/PageMode /UseNone /Pages 8 0 R /Type /Catalog\n>>\nendobj\n7 0 obj\n<<\n/Author (anonymous) /CreationDate (D:20251008195738-05\'00\') /Creator (ReportLab PDF Library - www.reportlab.com) /Keywords () /ModDate (D:20251008195738-05\'00\') /Producer (ReportLab PDF Library - www.reportlab.com) \n  /Subject (unspecified) /Title (Comprobante de Pago) /Trapped /False\n>>\nendobj\n8 0 obj\n<<\n/Count 1 /Kids [ 5 0 R ] /Type /Pages\n>>\nendobj\n9 0 obj\n<<\n/Filter [ /ASCII85Decode /FlateDecode ] /Length 555\n>>\nstream\nGat$sbAQ&g&A70Vp<Z/F,Vl!<h<[Pt`Jt+S7pfATFqr)o6chVY^QcYpM\'4/o\"R*)5R@Tlh%*3k,rte1UKn.hh\"\"#/aJ6BZQX<80XI@U?Jqg&m:f/iU>3/I]/@YcuFEJ3ZTbrXa\"(@t%Y_*\\G&r5[q]LaN`mrs0VNon4Q3*5qsA&CH\'rECV2S#U,@9ZB.qoIsD=]!K%^^GTb_?7bJS\\<\')!r%GC3M23!9\\FLIt]>h@[g/r.*s!r\"9-ArC^TN/,eR<W&\"//Bkr;43I%ETQl4=N$-!p0D-)#%Ua:b<RX#(K7\'XjfIC/F4cNqM#kt=iR)B<K$\"q`5M\'&JW*T_NaZq5gXb\';!;b!/^X#%1b1SUrP.$Yu^P[BurbQ#sW%T<#Qsrf/`&k`%T1L[1b_H#e\\f*N%:V+1,;+`b=$b`RAaRN,ktVb.t!Cq[F3\\lQS3GnsNX)VR33W:b\"HHK/6\"gqkREK\'ai^\'9:)FR9;WZDHnrW0bZ@ON)\\_jtKJ@uEAS$pnVReSSA99&GegcBT.HF&]WO]B_=g`!b@n&)-50FsOr;kaH\"k3~>endstream\nendobj\nxref\n0 10\n0000000000 65535 f \n0000000073 00000 n \n0000000124 00000 n \n0000000231 00000 n \n0000000343 00000 n \n0000000426 00000 n \n0000000619 00000 n \n0000000687 00000 n \n0000000994 00000 n \n0000001053 00000 n \ntrailer\n<<\n/ID \n[<d5468fb886569bde0b830d86d493fb25><d5468fb886569bde0b830d86d493fb25>]\n% ReportLab generated PDF document -- digest (http://www.reportlab.com)\n\n/Info 7 0 R\n/Root 6 0 R\n/Size 10\n>>\nstartxref\n1698\n%%EOF\n');
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
INSERT INTO `turista` VALUES (8,'James Rendon','vanegasjames01@gmail.com','31345658354','2007-08-01','cll 131 b bis # 95 b 34','CC','1028941955','$2b$12$3YbfEvz4/fAiVFmkoGA8pueOaDrxNdiYQk9Hh4jVclhq2cerwekAa',0,NULL,NULL,NULL,NULL,NULL,3,1),(9,'David Rendon','rendondavid328@gmail.com','31345658355','2007-08-01','cll 131 b bis # 95 b 33','CC','1028941954','$2b$12$mf9fJroS9HtkGlKz6FhwiOio3GhWmrNMU5C/JBm0MhHnDilOnvJby',0,NULL,NULL,NULL,NULL,NULL,1,1);
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

-- Dump completed on 2025-10-14 21:28:12
>>>>>>> 13f81b6255cf61ed0f3393c6ea7b830109867bf3

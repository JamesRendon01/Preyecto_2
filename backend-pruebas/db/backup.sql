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

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema eldoom
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema eldoom
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eldoom` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `eldoom` ;

-- -----------------------------------------------------
-- Table `eldoom`.`profesori`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eldoom`.`profesori` (
  `id_profesor` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `ime` VARCHAR(45) NOT NULL,
  `prezime` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_profesor`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `eldoom`.`studenti`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eldoom`.`studenti` (
  `id_student` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `ime` VARCHAR(45) NOT NULL,
  `prezime` VARCHAR(45) NOT NULL,
  `brIndexa` VARCHAR(45) NOT NULL,
  `datumRegistracije` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id_student`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `eldoom`.`kursevi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eldoom`.`kursevi` (
  `id_kurs` INT NOT NULL AUTO_INCREMENT,
  `naziv` VARCHAR(45) NOT NULL,
  `opis` VARCHAR(45) NOT NULL,
  `profesori_id_profesor` INT NOT NULL,
  PRIMARY KEY (`id_kurs`),
  INDEX `fk_kursevi_profesori_idx` (`profesori_id_profesor` ASC) VISIBLE,
  CONSTRAINT `fk_kursevi_profesori`
    FOREIGN KEY (`profesori_id_profesor`)
    REFERENCES `eldoom`.`profesori` (`id_profesor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eldoom`.`kurs_fajl`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eldoom`.`kurs_fajl` (
  `id_kursfajl` INT NOT NULL AUTO_INCREMENT,
  `naziv` VARCHAR(45) NOT NULL,
  `url` BLOB NOT NULL,
  `kursevi_id_kurs` INT NOT NULL,
  PRIMARY KEY (`id_kursfajl`),
  INDEX `fk_kursfajl_kursevi1_idx` (`kursevi_id_kurs` ASC) VISIBLE,
  CONSTRAINT `fk_kursfajl_kursevi1`
    FOREIGN KEY (`kursevi_id_kurs`)
    REFERENCES `eldoom`.`kursevi` (`id_kurs`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eldoom`.`obavestenje`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eldoom`.`obavestenje` (
  `id_obavestenja` INT NOT NULL AUTO_INCREMENT,
  `naslov` VARCHAR(45) NOT NULL,
  `sadrzaj` VARCHAR(45) NOT NULL,
  `kursevi_id_kurs` INT NOT NULL,
  PRIMARY KEY (`id_obavestenja`),
  INDEX `fk_obavestenje_kursevi1_idx` (`kursevi_id_kurs` ASC) VISIBLE,
  CONSTRAINT `fk_obavestenje_kursevi1`
    FOREIGN KEY (`kursevi_id_kurs`)
    REFERENCES `eldoom`.`kursevi` (`id_kurs`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eldoom`.`kurs_prijava`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eldoom`.`kurs_prijava` (
  `studenti_id_student` INT NOT NULL,
  `kursevi_id_kurs` INT NOT NULL,
  `datum_prijave` DATETIME NOT NULL,
  PRIMARY KEY (`studenti_id_student`, `kursevi_id_kurs`, `datum_prijave`),
  INDEX `fk_kurs_prijava_kursevi1_idx` (`kursevi_id_kurs` ASC) VISIBLE,
  CONSTRAINT `fk_kurs_prijava_studenti1`
    FOREIGN KEY (`studenti_id_student`)
    REFERENCES `eldoom`.`studenti` (`id_student`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_kurs_prijava_kursevi1`
    FOREIGN KEY (`kursevi_id_kurs`)
    REFERENCES `eldoom`.`kursevi` (`id_kurs`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

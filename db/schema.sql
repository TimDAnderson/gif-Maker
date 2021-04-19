DROP DATABASE gifMaker;
CREATE DATABASE gifMaker;
USE gifMaker;

CREATE TABLE gifLinks (
  ID INT NOT NULL AUTO_INCREMENT,
  publicLink VARCHAR(255),
  PRIMARY KEY (ID)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < db/schema.sql
 *  to create the database and the tables.*/
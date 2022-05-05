CREATE DATABASE mydb;
--\c into mydb
CREATE TABLE users(
    id VARCHAR(255),
    credentialsid VARCHAR(255),
    fname VARCHAR(255),
    lname VARCHAR(255),
    role VARCHAR(255),
    exprieance VARCHAR(255),
    stackID VARCHAR(255),
    country VARCHAR(255)
);
CREATE TABLE users(
    username VARCHAR(255),
    password VARCHAR(255),
    credentialsid VARCHAR(255))

    CREATE TABLE stack(
    frontend VARCHAR(255),
    backend VARCHAR(255),
    db VARCHAR(255),
    stackID VARCHAR(255))
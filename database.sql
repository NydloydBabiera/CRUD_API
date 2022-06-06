-- CREATE DATABASE db_nydloydapi;

-- create table

CREATE TABLE tbl_userInfo(
    userInfo_id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    middleName VARCHAR(255),
    lastName VARCHAR(255),
    age INT
);
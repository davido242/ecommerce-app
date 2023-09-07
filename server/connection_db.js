const mysql = require("mysql2");
const dotenv = require("dotenv").config();

const dbConnection = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE
  }).promise();

module.exports = { dbConnection };

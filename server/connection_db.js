const mysql = require("mysql2");
require("dotenv").config();

const dbConnection = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE,
  }).promise();

  console.log("Process Message:", process.env.MYSQL_USER, process.env.MYSQL_HOST);

module.exports = { dbConnection };

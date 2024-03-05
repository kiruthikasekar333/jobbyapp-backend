const mysql= require("mysql2");
const { MYSQL_DATABASE, MYSQL_PASSWORD, MYSQL_USERNAME,MYSQL_HOST } = require("../config/config");


const connection = mysql.createConnection({
    host:MYSQL_HOST,
    user:MYSQL_USERNAME,
    password:MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
})

connection.connect((err) => {
    if (err) {
      console.log("error while connecting to db", err);
    }
    console.log("Mysql connected  to Job database successfully");
  });
  
  module.exports = connection;
  
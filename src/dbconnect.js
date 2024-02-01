const mysql = require("mysql2");
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST || process.env.DATABASE_HOST_LOCAL,
  user: process.env.DATABASE_USER || process.env.DATABASE_USER_LOCAL,
  password: process.env.DATABASE_PASSWORD || process.env.DATABASE_PASSWORD_LOCAL,
  port: process.env.DATABASE_PORTNUMBER || process.env.DATABASE_PORTNUMBER_LOCAL,
  database: process.env.DATABASE_NAME || process.env.DATABASE_NAME_LOCAL,
});

db.connect((err, res)=>{
  if(err){
    console.log(`your connection has failed ${err.errno}`);
  }else{
    console.log(`connected to database succesfully ${db.threadId}`);
  }
});

module.exports = db;
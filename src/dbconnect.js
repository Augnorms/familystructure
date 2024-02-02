const mysql = require("mysql2");
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST ,
  user: process.env.DATABASE_USER ,
  password: process.env.DATABASE_PASSWORD ,
  port: process.env.DATABASE_PORTNUMBER ,
  database: process.env.DATABASE_NAME ,
});

db.connect((err, res)=>{
  if(err){
    console.log(`your connection has failed ${err.errno}`);
  }else{
    console.log(`connected to database succesfully ${db.threadId}`);
  }
});

module.exports = db;
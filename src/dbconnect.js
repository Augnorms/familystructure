const mysql = require("mysql2");

const db = mysql.createConnection({
    host:"sql8.freesqldatabase.com",
    user:"sql8665122",
    password:"RU6zwyqmtR",
    database:"sql8665122"
});

db.connect((err, res)=>{
  if(err){
    console.log(`your connection has failed ${err.errno}`);
  }else{
    console.log(`connected to database succesfully ${db.threadId}`);
  }
});

module.exports = db;
const mysql = require("mysql2");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Microvelli@027",
    database:"family_structure"
});

db.connect((err, res)=>{
  if(err){
    console.log(`your connection has failed ${err.errno}`);
  }else{
    console.log(`connected to database succesfully ${db.threadId}`);
  }
});

module.exports = db;
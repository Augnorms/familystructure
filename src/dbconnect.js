const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "bkcmiqf7i6yoxkbmxvaa-mysql.services.clever-cloud.com",
  user: "uhvct5vurjbezpri",
  password: "VSCtjuPhelFUtDCvK7n",
  port: 21733,
  database: "bkcmiqf7i6yoxkbmxvaa",
});

db.connect((err, res)=>{
  if(err){
    console.log(`your connection has failed ${err.errno}`);
  }else{
    console.log(`connected to database succesfully ${db.threadId}`);
  }
});

module.exports = db;
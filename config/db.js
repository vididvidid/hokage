const mysql = require('mysql2');

// Create a MySQL connection
function createSqlConnection(){


  const connection = mysql.createConnection({
    host: 'localhost',  // Your MySQL server's host
    user: 'root', // Your MySQL username
    password: 'Yash@1234', // Your MySQL password
    database:'infinity'//your database name
  });
  
  // Connect to MySQL
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
  });
  
  // Close the MySQL connection when your application exits
  process.on('exit', () => {
    console.log("connection ended");
    connection.end();
  });
  
}

module.exports ={
  createSqlConnection
};


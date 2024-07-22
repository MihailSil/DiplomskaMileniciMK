const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',     // Your database host
  user: 'root', // Your database user
  password: 'root', // Your database password
  database: 'milenici',  // Your database name
  port: 3306
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

module.exports = connection;
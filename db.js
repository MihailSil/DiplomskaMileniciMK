// Paket za konekcija so MySql
const mysql = require('mysql2');

// Konekcija so bazata na podatoci
const connection = mysql.createConnection({
  host: 'localhost',     // Host na bazata
  user: 'root', // Ime na user na bazata
  password: 'root', // Password na bazata
  database: 'milenici',  // Ime na bazata
  port: 3306 // Port za MySql
});

// Pechatenje dali ima konekcija so bazata
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

module.exports = connection;
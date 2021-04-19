var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'gifMaker'
})

connection.connect();

module.exports = connection;
var http = require('http');
var dt = require('./hashTable.js');
var uc = require('natural');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "dbProject",
  password: "password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
  if (err) throw err;
  console.log("Database created");
});
});

// http://localhost:8080
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The keys: " + dt.myOptionalQuery());
  res.end();
}).listen(8080);

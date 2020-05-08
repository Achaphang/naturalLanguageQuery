var http = require('http');
var dt = require('./hashTable.js');
var uc = require('natural');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost:3306",
  user: "root",
  password: "CS360"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The keys: " + dt.myOptionalQuery());
  res.end();
}).listen(8080);

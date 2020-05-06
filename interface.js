var http = require('http');
var dt = require('./hashTable.js');
var uc = require('natural');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The keys: " + dt.myOptionalQuery());
  res.end();
}).listen(8080);

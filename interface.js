var http = require('http');
var dt = require('./hashTable.js');
var uc = require('natural');
var mysql = require('mysql');
var express = require("express");

var con = mysql.createConnection({
  host: "localhost",
  user: "dbProject",
  password: "password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  /*con.query("CREATE DATABASE mydb", function (err, result) {
  if (err) throw err;
  console.log("Database created"); */
});

//use the application off of express.
var app = express();

//define the route for "/"
app.get("/", function (request, response){
    response.sendFile("C:/Users/Arch/Documents/GitHub/naturalLanguageQuery/index.html");
});

app.get("/getquery", function (request, response){
    var queryID = request.query.queryid;

    if (queryID != "") {
        response.send(queryID);
    } else {
        response.send("Please provide us a query");
    }
});

app.get("/gettraininput", function (request, response){
    var trainInput = request.query.traininput;

    if (trainInput != "") {
        response.send(trainInput);
    } else {
        response.send("Please provide us with training input");
    }
});

app.get("/getbackup", function (request, response){
    var backup = request.query.backup;

    if (backup != "") {
        response.send(backup);
    } else {
        response.send("Please provide us with training input");
    }
});

//start the server http://localhost:8080
app.listen(8080);
/*
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The keys: " + dt.myOptionalQuery());
  res.end();
}).listen(8080); */

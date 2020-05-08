var http = require('http');
var dt = require('./hashTable.js');
var uc = require('natural');
var mysql = require('mysql');
var express = require("express");
var sql = "";
var con = mysql.createConnection({
  host: "localhost",
  user: "dbProject",
  password: "password",
  database: "mydb"
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
        sql = response.send(dt.NLPRunQuery(queryID));
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
        response.send(dt.myOptionalQuery(backup));
    } else {
        response.send("Please provide us with training input");
    }
});

app.get("/getquerycode", function (request, response){
    var querycode = request.query.querycode;

    if (querycode != "") {
        response.send(dt.myQueryCodes(querycode));
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

function handle_database(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("select * from user",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
        });
  });
}

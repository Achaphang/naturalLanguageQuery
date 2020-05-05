function HashTable(obj)
{
    this.length = 0;
    this.items = {};
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            this.items[p] = obj[p];
            this.length++;
        }
    }

    this.setItem = function(key, value)
    {
        var previous = undefined;
        if (this.hasItem(key)) {
            previous = this.items[key];
        }
        else {
            this.length++;
        }
        this.items[key] = value;
        return previous;
    }

    this.getItem = function(key) {
        return this.hasItem(key) ? this.items[key] : undefined;
    }

    this.hasItem = function(key)
    {
        return this.items.hasOwnProperty(key);
    }

    this.removeItem = function(key)
    {
        if (this.hasItem(key)) {
            previous = this.items[key];
            this.length--;
            delete this.items[key];
            return previous;
        }
        else {
            return undefined;
        }
    }

    this.keys = function()
    {
        var keys = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                keys.push(k);
            }
        }
        return keys;
    }

    this.values = function()
    {
        var values = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                values.push(this.items[k]);
            }
        }
        return values;
    }

    this.each = function(fn) {
        for (var k in this.items) {
            if (this.hasItem(k)) {
                fn(k, this.items[k]);
            }
        }
    }

    this.clear = function()
    {
        this.items = {}
        this.length = 0;
    }
}

function addNewQueries(addInputQueries, possibleQueries) {
  // We want to create a HashTable to search for keys using tokens
  // Say we have information assurance 7code as string
  // We should generate
  var addInputQueries;
  var keyStr; // This is used insert keys
  var valArr; // This is used to insert values
  var tokens = tokenize.tokenize(addInputQueries);
  // The outer loop controls where we at maximum in the string
  // Example the first run of this we will look at information security
  // Second run information security analyst
  // Third run information security analyst queryCode
  for(var i = 0; i < tokens.length - 1; i++) {
    keyStr = "";
    valArr = [];
    for(var j = 0; j <= i + 1; j++) {
      if(j <= i && i != j) {
        keyStr += (tokens[j] + " ");
      }else if(i == j && i != tokens.length) {
        keyStr += tokens[j].toString();
      }else{
        valArr.push(tokens[j]);
      }

    }

    if(possibleQueries.keys().includes(keyStr)) {
      console.log("Outer True")
      if(!(possibleQueries.getItem(keyStr).includes(valArr[0]))) {
        console.log("Inner True");
        for(var k = 0; k <= possibleQueries.getItem(keyStr).length - 1; k++)
          valArr.push(possibleQueries.getItem(keyStr)[k]);
        console.log(valArr);
        possibleQueries.setItem(keyStr, valArr);
      }
    }else{
        possibleQueries.setItem(keyStr, valArr);
    }
  }
  return possibleQueries;
}

var natural = require('natural');   // Include 'natural' Natural Language Processing library

var tokenize = new natural.WordTokenizer();  // Initialize extension for tokenizing input
var optionalQueries = new HashTable();
var input = "information security assurance querycode";
optionalQueries = addNewQueries(input, optionalQueries);
input = "information analyst querycode";
optionalQueries = addNewQueries(input, optionalQueries);

console.log(optionalQueries);
//array = ["security", "queryCode"]
//possibleQueries.setItem("information", array);
//if(tokens.hasItem("information")) {
//  console.log(tokens.getItem("information").includes("security"));
//  console.log(str);
//}

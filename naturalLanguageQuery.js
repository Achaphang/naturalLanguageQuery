//Designed by Damien Spencer and Tobias Tabladillo

//Our Task: Design a natural language interface that will accept an English sentence query,
//and respond in the form of a relational table. In this approach the emphasis will be in the
//(1) design of the NLP parser and mapping to SQL queries, (2) design of the knowledge rules and
//the canonical database, and (3) identification of an admissible class of queries.


var natural = require('natural');   //Include 'natural' library

var tokenizer = new natural.WordTokenizer();  // Initialize extension for tokenizing Input

var tokens = [];  // This variable is going to store alternating hash tables
// We will check to see if a token exists as a key in the first hash table
// If it doesn't exist then we move on
// If it does exist then we check the value that is associated with interval
// That value will be a boolean that is true if another word can follow
// If false then we stop there and run the query based off of what we have
var tokenDict = new HashTable(); // This is the hash table we want to store Engineer as a key

var toTokenize = "Engineer Software Dude";  // This is our string to tokenize

var tempToken = tokenizer.tokenize(toTokenize); // We want to store the first word as the key and all words after as values

var i;  // this is to iterate through our tokens
// this for loop goes through all our tokens
for(i = 0; i < tempToken.length; i++) {
  // if it is the first token and the key doesn't exist in the dictionary
  // we place it in the dictionary as a key
  // any token after the first is added as a value to the key
  if(!(tempToken[i] in tokenDict) && i == 0)
    tokenDict[tempToken[i]] = {};
  else
    tokenDict.tempToken[0] += tempToken;
}

// I wanted to print it to see if it worked
print(tokenDict.tempToken[0])

// These are functions I copied from the article
// We should try and find the most optimal hash function and use that instead
function NaiveDict(){
    this.keys = []
    this.values = []
}
NaiveDict.prototype.set = function(key, value){
    this.keys.push(key)
    this.values.push(value)
}
NaiveDict.prototype.get = function(lookupKey){
    for (var i=0;i<this.keys.length;i++){
        var key = this.keys[i];
        if (key === lookupKey) {
            return this.values[i]
        }

function HashTable(){
  this.bucketCount = 100000;
  this.buckets = [];
  for (var i=0; i< this.bucketCount;i++){
    this.buckets.push(new NaiveDict())
  }
}

HashTable.prototype.getBucketIndex = function(key){
    return this.hashFunction(key) % this.bucketCount
}
HashTable.prototype.getBucket = function(key){
    return this.buckets[this.getBucketIndex(key)]
}

HashTable.prototype.set = function(key, value){
   this.getBucket(key).set(key, value)
}
HashTable.prototype.get = function(lookupKey){
    return this.getBucket(lookupKey).get(lookupKey)
}

HashTable.prototype.hashFunction = function(key){
    var hash = 0;
    if (key.length == 0) return hash;
    for (var i = 0; i < key.length; i++) {
        hash = (hash<<5) - hash;
        hash = hash + key.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}





/**
var natural = require('natural');   //Include 'natural' library

var tokenizer = new natural.WordTokenizer();   //Initialize variable to tokenize input
var toTokenize = "I want to developer software"   //Sample Input
var tokenized;   //Breaks up input into strings

var flagVal1 = 0;
var flagVal2 = 0;
var flagVal3 = 0;

var i = 0;

var token[2][2];
console.log(token[1].)
console.log(tokenizer.tokenize(toTokenize));   //Tokenize Current Sample Input
tokenized = tokenizer.tokenize(toTokenize);   //

console.log(tokenized);
console.log(tokenized[i].length);
toTokenize = "software developer"
var tokenizedDuhSecond = tokenizer.tokenize(toTokenize);
console.log(tokenizedDuhSecond);
for(i = 0; i < tokenized.length; i++) {
  if(tokenized[i] == tokenizedDuhSecond[0])
    flagVal1 = 1;
  else if(tokenized[i] == tokenizedDuhSecond[1])
    flagVal2 = 1;
  console.log(i);
}

console.log(flagVal1);
console.log(flagVal2);
if(flagVal1 == true && flagVal2 == true)
  console.log("Kek. We about to query software engineering my dudes")
**/

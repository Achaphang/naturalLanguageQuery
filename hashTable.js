/*******************************************************************************
 * Tobias Tabladillo & Damien Spencer
 * Our Task: Design a natural language interface that will accept an English
 * sentence query, and respond in the form of a relational table. In this
 * approach the emphasis will be in the (1) design of the NLP parser and mapping
 * to SQL queries, (2) design of the knowledge rules and the canonical database,
 * and (3) identification of an admissible class of queries.
 *******************************************************************************/

 var natural = require('natural');

 // Initialize extension for tokenizing input
var tokenize = new natural.WordTokenizer();

exports.myOptionalQuery = function() {
  // This our hash table be using to process queries
  var optionalQueries = new HashTable();

  // This is our boolean for if we want to stop accept input for anything
  var keepInputting = "true";
  // This is first input we want to use to update our hash table
  var input = "Information Security Assurance Querycode";
  input = input.toLowerCase();

  // First update of our hash table
  optionalQueries = addNewQueries(input, optionalQueries);

  // This is the second input we want to use to update our hash table
  input = "Information Analyst Querycode";
  input = input.toLowerCase();
  // Second update of our hash table
  optionalQueries = addNewQueries(input, optionalQueries);
  return optionalQueries.keys();
}

// Outputs our hash tables with all it's keys and values as well
// as functionality we can perform on the hash table

/*******************************************************************************
 * addNewQueries
 * The first argument is the string we want to use to add keys and values
 * our hash table. The second argument is our hash table.
 ******************************************************************************/
function addNewQueries(addInputQueries, possibleQueries) {
  var keyStr; // This is used insert keys
  var valArr; // This is used to insert values associated with keys

  // We break up the string into tokens to index for setting
  // keys and values using token indices
  var tokens = tokenize.tokenize(addInputQueries);
  // The outer loop controls the range of tokens we are looking at
  for(var i = 0; i < tokens.length - 1; i++) {
    keyStr = "";  // Resets the string back to empty
    valArr = [];  // Resets the array back to empty
    // The inner loop looks one ahead of i to add the value we want for our key
    for(var j = 0; j <= i + 1; j++) {
      // The first conditional adds a space when we have multiple strings
      // we want to use as a key
      if(j <= i && i != j) {
        keyStr += (tokens[j] + " ");
      }
      // The second conditional adds the last string we want to use as a key
      else if(i == j && i != tokens.length) {
        keyStr += tokens[j].toString();
      }
      // The third condition pushes the value onto the array that we associated
      // with the key value
      else{
        valArr.push(tokens[j]);
      }
    }

    // After setting up our keys and values we check to see if they are already
    // in the hash table. If they don't exist already then they are just added
    // to the hash table. If a key already exists we see if the value
    // we want to add exists in the values associated with that key. If there
    // is no association between that value and the key we push all the other
    // values onto the array. We update the hash table with the key and values
    // we updated

    // First conditional checks if we have this key already
    if(possibleQueries.keys().includes(keyStr)) {
      // Second conditional checks if the value is associated with that key
      if(!(possibleQueries.getItem(keyStr).includes(valArr[0]))) {
        // This loops through our already existing values to push them on our
        // value array
        for(var k = 0; k <= possibleQueries.getItem(keyStr).length - 1; k++)
          valArr.push(possibleQueries.getItem(keyStr)[k]);
      }
    }
    // Assign keys and values to the hash table
    possibleQueries.setItem(keyStr, valArr);
  }

  // This returns our hash table after the outer for loop is done to use for
  // future operations
  return possibleQueries;
}

/*******************************************************************************
 * All the functionality below this comment is for hash tables
 * It all came from this website:
 * http://www.mojavelinux.com/articles/javascript_hashes.html
 *******************************************************************************/
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

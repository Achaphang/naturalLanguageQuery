/*******************************************************************************
 * Tobias Tabladillo & Damien Spencer
 * Our Task: Design a natural language interface that will accept an English
 * sentence query, and respond in the form of a relational table. In this
 * approach the emphasis will be in the (1) design of the NLP parser and mapping
 * to SQL queries, (2) design of the knowledge rules and the canonical database,
 * and (3) identification of an admissible class of queries.
 *******************************************************************************/

 var natural = require('natural');   //Include natural language library
 var fs = require('fs');             //Include file library

 // Initialize extension for tokenizing input
var tokenize = new natural.WordTokenizer();

exports.myOptionalQuery = function(input) {
  // This our hash table be using to process queries
  var optionalQueries = new HashTable();
  var readWriteFile = "C:/Users/Arch/Documents/GitHub/naturalLanguageQuery/testFile.txt"
  optionalQueries = readTableFromFile();

  // Makes input lowercase
  input = input.toLowerCase();

  // Update our hash table
  optionalQueries = addNewQueries(input, optionalQueries);

  // write the update
  writeToFile(optionalQueries);

  // return our table to us
  return optionalQueries;
}

exports.myQueryCodes = function(str) {
  var valArr = [];
  var queryCodes = new HashTable();
  queryCodes = readTableFromQFile();
  var tokens = tokenize.tokenize(str);
  //str = "";
  var updateStr = "";
  for(var i = tokens[0].length + 1; i < str.length; i++)
  {
      updateStr += str[i];
  }
  valArr.push(updateStr);
  queryCodes.setItem(tokens[0].toLowerCase(), valArr);
  writeToQFile(queryCodes);
  return queryCodes;
}

exports.NLPTrainModel = function(str) {
  const { NlpManager } = require('node-nlp');

  const manager = new NlpManager({ languages: ['en'] });

}

exports.NLPRunQuery = function(str) {
  str = str.toLowerCase();
  str = tokenize.tokenize(str);
  return str;
}

/****************************************************************************
 *tokenMatch
 *Checks the tokenized strings against the hash table values and returns the
 *strings from the tables that match.
 ****************************************************************************/
function tokenMatch()
{

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

/****************************************************************************
 *readTableFromFile
 *Opens the local input file and reads from the contents and returns them
 *as a new hash table.
 ****************************************************************************/
function readTableFromFile()
{
    var newTable = new HashTable();   //The new hash table
    var string = "";                  //Data from the file

    // Read the hash table data from the file and put it in a string
    fs.readFile('testFile.txt', function (err, data) {
       //Check for read errors
       if (err) {
          return console.error(err);
       }
       //Convert all of the file data into one string
       string += data.toString() + '\0';
    });
    string = fs.readFileSync("testFile.txt",'utf8');
    string += '\0';

    //Process string
    var keyString = "";
    var valueArray = [];
    var valueString = "";
    var index = 0;

    //Iterate through the entire string, until we reach the end.
    //Everytime we reach a newline character, we write the current
    //keyString and valueArray to the hashTable.
    while(string.charAt(index) != '\0')
    {
        //Increment until we are finished reading the keys
        while(string.charAt(index) != ':')
        {
            //Add next character to keyString
            keyString += string.charAt(index);
            index++;
        }

        index++;

        while(string.charAt(index) != '\n')
        {
            //Add current character to valueString
            if(string.charAt(index) != ',') {
                valueString += string.charAt(index);
            }
            if(string.charAt(index) == ',')
            {
              if(valueString == "")
                console.log("Empty string");

                //Push valueString to the array
                valueArray.push(valueString);
                //Reset valueString
                valueString = '';
            }
            index++;
        }
        //Push valueString to the array
        valueArray.push(valueString);
        //Reset valueString
        valueString = '';

        index++;

        //Add the string and array to the hash table
        newTable.setItem(keyString, valueArray);
        //Clear keyString and valueArray for next key-value pair
        keyString = '';
        valueArray = [];
    }
    return newTable;
}

/*****************************************************************************
 *writeToFile
 *Opens the local input file and writes the current hash table contents to it.
 *Other functions will read from this file to utilize it for queries.
 ****************************************************************************/
function writeToFile(currentTable)
{
    var stringToWrite = "";   //Contains the current string to be written

    //Iterate through each bucket, adding in their keys and items
    for (var i = 0; i < currentTable.length; i++)
    {
        //Assign the current bucket's key to the string
        stringToWrite += currentTable.keys()[i] + ":";

        //Iterate through all of the items of the current bucket and add them to
        for (var k = 0; k < currentTable.getItem(currentTable.keys()[i]).length; k++)
        //for (var k = 0; k < Object.keys(currentTable).length; k++)
        {

            //Assign the current key's next item to the string
            stringToWrite += currentTable.getItem(currentTable.keys()[i])[k];

            //Check if this is the last item
            if(k == currentTable.getItem(currentTable.keys()[i]).length - 1)
            {
                //If last item, write a newline character
                stringToWrite += "\n";
            }
            else
            {
                //Otherwise, write a comma and prepare for next item entry
                stringToWrite += ",";
            }
        }
    }

    //Write items to the file
    fs.writeFile("testFile.txt", stringToWrite, function(err)
    {
      //Check for write errors
      if (err)
      {
          return console.error(err);
      }
    });

    //Clear string variable
    stringToWrite = "";
}

/************************************************************************
 *cleanUpInput
 *Removes non-alpha characters and sets all alpha character to lowercase.
 ***********************************************************************/

 function cleanUpInput(inputString)
 {
     var processedString;   //The string containing the nice formatting
     var letters = /^[a-zA-Z]+$/;   //The characters we want to allow
     var index;
     inputString += '\0';   //Append null character

     //Make inputString characters all lowercase
     inputString.toLowerCase();

     //Iterate through string and reformat until reach null character
     while(inputString.charAt(index) != '\0')
     {
         if(inputString.value.match(letters) || inputString.charAt(index) == ' ')
         {
             processedString += inputString.charAt(index);
         }
         else
         index++;
     }
 }

 /*****************************************************************************
  *writeToFile
  *Opens the local input file and writes the current hash table contents to it.
  *Other functions will read from this file to utilize it for queries.
  ****************************************************************************/
 function writeToQFile(currentTable)
 {
     var stringToWrite = "";   //Contains the current string to be written

     //Iterate through each bucket, adding in their keys and items
     for (var i = 0; i < currentTable.length; i++)
     {
         //Assign the current bucket's key to the string
         stringToWrite += currentTable.keys()[i] + ":";

         //Iterate through all of the items of the current bucket and add them to
         for (var k = 0; k < currentTable.getItem(currentTable.keys()[i]).length; k++)
         //for (var k = 0; k < Object.keys(currentTable).length; k++)
         {

             //Assign the current key's next item to the string
             stringToWrite += currentTable.getItem(currentTable.keys()[i])[k];

             //Check if this is the last item
             if(k == currentTable.getItem(currentTable.keys()[i]).length - 1)
             {
                 //If last item, write a newline character
                 stringToWrite += "\n";
             }
         }
     }

     //Write items to the file
     fs.writeFile("querycode.txt", stringToWrite, function(err)
     {
       //Check for write errors
       if (err)
       {
           return console.error(err);
       }
     });

     //Clear string variable
     stringToWrite = "";
 }

 /****************************************************************************
  *readTableFromQFile
  *Opens the local input file and reads from the contents and returns them
  *as a new hash table.
  ****************************************************************************/
 function readTableFromQFile()
 {
     var newTable = new HashTable();   //The new hash table
     var string = "";                  //Data from the file

     // Read the hash table data from the file and put it in a string
     fs.readFile('testFile.txt', function (err, data) {
        //Check for read errors
        if (err) {
           return console.error(err);
        }
        //Convert all of the file data into one string
        string += data.toString() + '\0';
     });
     string = fs.readFileSync("querycode.txt",'utf8');
     string += '\0';

     //Process string
     var keyString = "";
     var valueArray = [];
     var valueString = "";
     var index = 0;

     //Iterate through the entire string, until we reach the end.
     //Everytime we reach a newline character, we write the current
     //keyString and valueArray to the hashTable.
     while(string.charAt(index) != '\0')
     {
         //Increment until we are finished reading the keys
         while(string.charAt(index) != ':')
         {
             //Add next character to keyString
             keyString += string.charAt(index);
             index++;
         }

         index++;

         while(string.charAt(index) != '\n')
         {
             //Add current character to valueString
             if(string.charAt(index) != ',') {
                 valueString += string.charAt(index);
             }
             if(string.charAt(index) == ',')
             {
               if(valueString == "")
                 console.log("Empty string");

                 //Push valueString to the array
                 valueArray.push(valueString);
                 //Reset valueString
                 valueString = '';
             }
             index++;
         }
         //Push valueString to the array
         valueArray.push(valueString);
         //Reset valueString
         valueString = '';

         index++;

         //Add the string and array to the hash table
         newTable.setItem(keyString, valueArray);
         //Clear keyString and valueArray for next key-value pair
         keyString = '';
         valueArray = [];
     }
     return newTable;
 }

/****************************************************************************
 *readTableFromQFile
 *Opens the local input file and reads from the contents and returns them
 *as a new hash table.
 ****************************************************************************/

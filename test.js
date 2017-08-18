var HubDataFormatter = require('./index.js');
var HubDataParser = require('../hub-data-parser');

// Format some data
var h1 = new HubDataFormatter();
h1.putString('A1W2D');
h1.putFloat(42.5);
h1.putInteger(32767);
h1.putInteger(-1);
h1.putByte(69);
var bf = h1.finalise();

// Prints <Buffer 41 31 57 32 44 00 00 2a 42 ff 7f ff ff 45>
console.log(bf);

// Test by parsing the data
var p1 = new HubDataParser(bf);
var s = p1.getString(5);
var f = p1.getFloat();
var i = p1.getInteger();
var ii = p1.getInteger();
var b = p1.getByte();

// Prints A1W2D,42.5,32767,-1,69
console.log('Parsed: ' + s + ',' + f + ',' + i + ',' + ii + ',' + b);
var loremIpsum = require('lorem-ipsum');
var Underscore = require('underscore');
var Former = require('./former.js');


var phrases = [];
while (phrases.length < Former.QUESTION_LIMIT * Former.QUESTIONNAIRE_COUNT) {
  phrase = loremIpsum({
    count: 5
  , units: 'words'
  });

  if(phrases.indexOf(phrase) == -1) {
    phrases.push(phrase);  
  }
}

console.log((Former.QUESTION_LIMIT * Former.QUESTIONNAIRE_COUNT) + " phrases generated");

Former.generateForm(phrases, "text_input", function (data, i) {
      var output = "Copy the following phrase: "+data[i]+"<br><input type='text' name='fname'><br>"
      return output;
  });
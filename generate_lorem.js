var loremIpsum = require('lorem-ipsum');
var Underscore = require('underscore');
var Former = require('./former.js');


exports = module.exports = function () {

}


exports.getData = function () {

  var phrases = [];
  while (phrases.length < Former.QUESTION_LIMIT * Former.DEFAULT_QUESTIONNAIRE_COUNT) {
    phrase = loremIpsum({
      count: 5
    , units: 'words'
    });

    if(phrases.indexOf(phrase) == -1) {
      phrases.push(phrase);  
    }
  }

  console.log((Former.QUESTION_LIMIT * Former.DEFAULT_QUESTIONNAIRE_COUNT) + " phrases generated");

  console.log(phrases);
  
  return phrases;
}

exports.codeGenerator = function (item, i) {
  var output = "<br>Copy the following phrase: "+item+"<br><input type='text' name='lorem["+i+"]' autocomplete='off'><input type='hidden' value='"+item+"' name='lorem_ans["+i+"]' />";
  return output;
}
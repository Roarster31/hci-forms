var Former = require('./former.js');
var Checkbox = require('./generate_checkboxes.js');
var Lorem = require('./generate_lorem.js');
var Underscore = require('underscore');

var CHECK_BOX_TYPE = 'checkbox';
var TEXT_TYPE = 'text';

exports = module.exports = function () {

}

exports.getData = function () {
  var textArray = Underscore.sample(Lorem.getData(), 25);

  var checkboxes = Underscore.sample(Checkbox.getData(), 25);

  var combinedArray = [];

  for(var i=0; i<textArray.length; i++) {
    combinedArray.push({type: TEXT_TYPE, value: textArray[i]});
  }

  for(var i=0; i<checkboxes.length; i++) {
    combinedArray.push({type: CHECK_BOX_TYPE, value: checkboxes[i]});
  }

  combinedArray = Underscore.shuffle(combinedArray);

  console.log(combinedArray);

  return combinedArray;
}

exports.codeGenerator = function (item, i) {
  console.log(item.type);
  if(item.type == TEXT_TYPE) {
    var value = Lorem.codeGenerator(item.value, i);
    return value;
  } else if (item.type == CHECK_BOX_TYPE) {
    var value = Checkbox.codeGenerator(item.value, i);
    console.log(value);
    return value;
  }
}


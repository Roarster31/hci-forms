var permutations = require('./permutations.js');
var Underscore = require('underscore');


var CHECK_BOX_COUNT = 6;

exports = module.exports = function () {

}

var getPromptText = function (sample) {
  var text = "";
  var boxes = [];

  if(sample[0] == 1) {
    boxes.push("1st");
  }

  if(sample[1] == 1) {
    boxes.push("2nd");
  }

  if(sample[2] == 1) {
    boxes.push("3rd");
  }

  if(sample[3] == 1) {
    boxes.push("4th");
  }

  if(sample[4] == 1) {
    boxes.push("5th");
  }

  if(sample[5] == 1) {
    boxes.push("6th");
  }

  if(sample[6] == 1) {
    boxes.push("7th");
  }

  if(sample[7] == 1) {
    boxes.push("8th");
  }

  if (boxes.length == 1) {
    text = "Check the " + boxes[0] + " box."
  } else if (boxes.length > 1) {
    text = "Check the " + boxes.slice(0, boxes.length-1).join(", ") + " & " + boxes[boxes.length-1] + " boxes."
  } else {
    text = "Check none of the boxes.";
  }

  console.log(boxes);
  console.log("=> "+text);

  return text;

}

exports.getData = function () {
  perms = permutations.getPermutations(CHECK_BOX_COUNT);

  perms = Underscore.shuffle(perms);

  return perms;
}

exports.codeGenerator = function (item, i) {
  var prompt = getPromptText(item);
  var output = "<p>"+prompt+"</p>";
  output += "<div style='vertical-align: middle;'>";

  for(var k=0; k<item.length; k++) {
    output += "<div class='checkboxHolder'>";
    
    output += "<label style='' for='input["+i+"]["+k+"]'>"+(k+1)+"</label>"
    output += "<input type='checkbox' name='input["+i+"]["+k+"]'>" 
    output += "<input type='hidden' name='en_input["+i+"]["+k+"]' value='"+(item[k] == 1)+"'>"  
    output += "</div>"

  }

  output += "<br>"
  output += "<br>"
  output += "</div>";
  return output;
}
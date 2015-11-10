var permutations = require('./permutations.js');
var Former = require('./former.js');
var Underscore = require('underscore');


var CHECK_BOX_COUNT = 6;

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


perms = permutations.getPermutations(CHECK_BOX_COUNT);

perms = Underscore.shuffle(perms);

Former.generateForm(perms, "checkbox", function (data, i) {
      var prompt = getPromptText(data[i]);
      var output = "<br><p>"+prompt+"</p>";
      for(var k=0; k<data[i].length; k++) {
        output += "<input type='checkbox' name='input["+i+"]["+k+"]' >"  
      }
      return output;
  });

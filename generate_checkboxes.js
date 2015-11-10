var permutations = require('./permutations.js');
var Underscore = require('underscore');
var mkdirp = require("mkdirp");
var fs = require('fs');

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

var sampleCount = 3;
var checkBoxCount = 6;

perms = permutations.getPermutations(checkBoxCount);

perms = Underscore.shuffle(perms);

var sampleSize = Math.floor(perms.length / sampleCount);

for(var i=0; i<sampleCount; i++) {
  var sample = perms.slice(0+sampleSize*i, sampleSize + i*sampleSize);
  console.log("sample "+i+":");
  console.log(sample);

  var preForm = "<!DOCTYPE html><html><body><form action=''>";
  var postForm = "</form></body></html>";

  var form = "";

  for(var j=0; j<sample.length; j++) {
    var prompt = getPromptText(sample[j]);
    form += "<br><p>"+prompt+"</p>";
    for(var k=0; k<checkBoxCount; k++) {
      form += "<input type='checkbox' name='input"+j+"' value='"+k+"'>"  
    }
    
  }

  var html = preForm + form + postForm;

  var filePath = __dirname+"/out/sample"+i+".html";
  
  mkdirp(filePath, function (err) {
    fs.writeFile(filePath, html, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("Sample "+i+" was saved!");
  }); 
  })
  

}

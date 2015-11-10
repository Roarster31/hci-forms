var fs = require('fs');
var mkdirp = require("mkdirp");


exports = module.exports = function () {
  
}

var QUESTION_LIMIT = exports.QUESTION_LIMIT = 15;
var QUESTIONNAIRE_COUNT = exports.QUESTIONNAIRE_COUNT = 3;
var OUT_PATH = __dirname+"/out/";

var writeFile = function (filename, data) {
  mkdirp(OUT_PATH, function (err) {
      fs.writeFile(OUT_PATH+filename, data, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log(filename+" was saved!");
    }); 
    })
}

exports.generateForm = function (dataArray, formName, formItemGenerator) {

  var sampleSize = Math.floor(dataArray.length / QUESTIONNAIRE_COUNT);

  for(var i=0; i<QUESTIONNAIRE_COUNT; i++) {
    var sample = dataArray.slice(0+sampleSize*i, sampleSize + i*sampleSize);
    console.log("sample "+i+":");
    console.log(sample);

    var preForm = "<!DOCTYPE html><html><body><form action=''>";
    var postForm = "</form></body></html>";

    var form = "";

    for(var j=0; j<sample.length; j++) {
      form += formItemGenerator(sample, j);
    }

    var html = preForm + form + postForm;

    var filename = formName+"_"+i+".html";

    writeFile(filename, html);
    

  }
}

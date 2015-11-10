Checkbox = require('./generate_checkboxes.js');
Lorem = require('./generate_lorem.js');
Training = require('./generate_training.js');
var Former = require('./former.js');

var all = process.argv.indexOf('--all') != -1;

var runText = process.argv.indexOf('--text') != -1 || all;
var runCheckbox = process.argv.indexOf('--checkbox') != -1 || all;
var runTraining = process.argv.indexOf('--training') != -1 || all;

if (runText) {
  Former.generateForm(Lorem.getData(), "text_input", Lorem.codeGenerator);
} else if (runCheckbox) {
  Former.generateForm(Checkbox.getData(), "checkbox", Checkbox.codeGenerator);
} else if (runTraining) {
  Former.generateForm(Training.getData(), "training", Training.codeGenerator, 1);
} else {

  console.log("Please sepcify an argument:");
  console.log("--text, to generate input text files");
  console.log("--checkbox, to generate checkbox files");
  console.log("--training, to generate training files");
  console.log("--all, to run all generators");

}

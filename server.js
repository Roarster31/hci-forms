/**
 * Created by benallen on 10/11/2015.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');


/* GET home page. */
router.get('/questions-computer-checkbox', function(req, res){
    res.sendFile(__dirname + '/out/checkbox_0.html');
});
router.get('/questions-tablet-checkbox', function(req, res){
    res.sendFile(__dirname + '/out/checkbox_1.html');
});
router.get('/questions-paper-checkbox', function(req, res){
    res.sendFile(__dirname + '/out/checkbox_2.html');
});

router.get('/questions-computer-text', function(req, res){
    res.sendFile(__dirname + '/out/text_input_0.html');
});
router.get('/questions-tablet-text', function(req, res){
    res.sendFile(__dirname + '/out/text_input_1.html');
});
router.get('/questions-paper-text', function(req, res){
    res.sendFile(__dirname + '/out/text_input_2.html');
});

router.get('/training', function(req, res){
    res.sendFile(__dirname + '/out/training_0.html');
});


function saveFile(csvOutput, fileName) {
    csvOutput += "\n";

    fs.appendFile(fileName, csvOutput, function (err) {
        console.log(err)
    });
}
router.get('/sendForm', function(req, res){

    var referer = req.headers['referer'];
    var sectionsOfReferer = referer.split('-');

    var fileName = "out/" + sectionsOfReferer[1] + "-" + sectionsOfReferer[2] + ".csv";

    var qResult = [];
    var csvOutput = "";

    var QUESTION_NUMBER = 15;
    var queryMain = req.query;
    if(queryMain.input != undefined) {
        for (var i = 0; i < QUESTION_NUMBER; i++) {
            var questionCorrect = true;

            for (var x = 0; x < 6; x++) {
                var hasValues = queryMain.input.hasOwnProperty(i);
                var shouldBe = queryMain.en_input[i][x];

                if (hasValues && shouldBe == "true") {
                    var result = queryMain.input[i].hasOwnProperty(x);
                    if (result == false && shouldBe == "true") {
                        questionCorrect = false;
                    }
                    if (result == true && shouldBe == "false") {
                        questionCorrect = false;
                    }
                } else if (hasValues && shouldBe == "false") {
                    var result = queryMain.input[i].hasOwnProperty(x);
                    if (result == true) {
                        questionCorrect = false;
                    }
                } else if (!hasValues && shouldBe == "true") {
                    questionCorrect = false;
                }

            }
            if (i != 0) {
                csvOutput += ",";
            }
            csvOutput += questionCorrect;
            qResult.push(questionCorrect);
        }

        saveFile(csvOutput, fileName);

        res.send("Response received! Thank You");
    } else if(queryMain.lorem != undefined){
        for(var i = 0; i < QUESTION_NUMBER; i++){
            var userContent = queryMain.lorem[i];
            var correctContent = queryMain.lorem_ans[i];

            var qCorrect = false;
            if(userContent == correctContent){
                qCorrect = true;
            }
            if (i != 0) {
                csvOutput += ",";
            }
            csvOutput += qCorrect;
        }

        saveFile(csvOutput, fileName);
        res.send("Response received! Thank You");
    } else {
        res.send("Empty response");
    }
});
router.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html')
});

module.exports = router;



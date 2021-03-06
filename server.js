/**
 * Created by benallen on 10/11/2015.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;


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

router.get('/training-computer', function(req, res){
    res.sendFile(__dirname + '/out/training_0.html');
});

router.get('/training-tablet', function(req, res){
    res.sendFile(__dirname + '/out/training_1.html');
});

router.get('/training-paper', function(req, res){
    res.sendFile(__dirname + '/out/training_2.html');
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



    var QUESTION_NUMBER = 21;
    var queryMain = req.query;

    console.log(queryMain);

    if(queryMain['input_0'] != undefined && queryMain.lorem != undefined){
      // It is the training so do nothing
        res.send("Thank You");
    } else if(queryMain['input_0'] != undefined) {
        for (var i = 0; i < QUESTION_NUMBER; i++) {
            var questionCorrect = true;
            var rootValueName = "input_"+i;
            var rootCorrectValueName = "en_"+rootValueName;

            for (var x = 0; x < 6; x++) {
                var shouldBe = queryMain[rootCorrectValueName][x] == "true";
                var result = queryMain[rootValueName][x] != '';

                console.log("Q"+i+"_"+x+" comparing result: "+result+" to shouldBe: "+shouldBe);

                if(shouldBe != result) {
                    questionCorrect = false;
                    break;
                }
            }
            
            if (i != 0) {
                csvOutput += ",";
            }

            console.log("Q"+i+"_"+x+" questionCorrect: "+questionCorrect);

            csvOutput += questionCorrect;
            qResult.push(questionCorrect);

            questionCorrect = true;
        }

        // console.log(csvOutput);
        saveFile(csvOutput, fileName);

        exec('wc -l < '+fileName, function (error, index) {
            res.send("Response received! Thank You (id: "+index.trim()+")");
        });

    } else if(queryMain.lorem != undefined){
        for(var i = 0; i < QUESTION_NUMBER; i++){
            var userContent = queryMain.lorem[i];
            var correctContent = queryMain.lorem_ans[i];

            var qCorrect = false;
            if(userContent.toLowerCase() == correctContent.toLowerCase()){
                qCorrect = true;
            }

            if (i != 0) {
                csvOutput += ",";
            }
            csvOutput += qCorrect;
        }

        saveFile(csvOutput, fileName);
        
        exec('wc -l < '+fileName, function (error, index) {
            res.send("Response received! Thank You (id: "+index.trim()+")");
        });

    } else {
        res.send("Empty response");
    }
});
router.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html')
});

module.exports = router;



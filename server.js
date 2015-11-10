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


router.get('/sendForm', function(req, res){

    var referer = req.headers['referer'];
    var sectionsOfReferer = referer.split('-');

    var fileName = "" + sectionsOfReferer[1] + "-" + sectionsOfReferer[2] + ".csv";



    if(!path.existsSync(fileName)){
        fs.writeFileSync(fileName, '');
    }
    fs.appendFile(fileName, "hello", function (err) {
        console.log(err);
    });


    var qResult = [];

    for(var i = 0; i < 15; i++) {
        var questionCorrect = true;

        for(var x = 0; x < 6; x++){
            var hasValues = req.query.input.hasOwnProperty(i);
            var shouldBe = req.query.en_input[i][x];

            if(hasValues && shouldBe == "true") {
                var result = req.query.input[i].hasOwnProperty(x);
                if (result == false && shouldBe == "true") {
                    questionCorrect = false;
                }
                if (result == true && shouldBe == "false") {
                    questionCorrect = false;
                }
            } else if(hasValues && shouldBe == "false"){
                var result = req.query.input[i].hasOwnProperty(x);
                if(result == true){
                    questionCorrect = false;
                }
            } else if(!hasValues && shouldBe == "true"){
                questionCorrect = false;
            }

        }
        qResult.push(questionCorrect);
    }
    console.log("hello");
    console.log(qResult);
    res.send("You send" + req.body.name);
});
router.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html')
});

module.exports = router;



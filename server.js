/**
 * Created by benallen on 10/11/2015.
 */
var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/question', function(req, res){
    res.sendFile(__dirname + '/out/checkbox_0.html');
});
router.get('/sendForm', function(req, res){

    var qResult = [];

    for(var i = 0; i < 15; i++) {
        var questionCorrect = true;

        for(var x = 0; x < 5; x++){
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
            } else {
                questionCorrect = false;
            }
        }
        qResult.push(questionCorrect);
    }
    console.log("hello");
    console.log(qResult);
    res.send("You send" + req.body.name);
});
router.get('/', function(req, res, next) {
    res.sendFile('../out/checkbox_0.html');
});

module.exports = router;



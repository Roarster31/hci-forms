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
    res.send("You send" + req.body.name);
    for(var i = 0; i < 15;i++) {
        req.query.input
    }
});
router.get('/', function(req, res, next) {
    res.sendFile('../out/checkbox_0.html');
});

module.exports = router;



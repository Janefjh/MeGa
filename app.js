var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');

var router = require('./backend/router.js');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({dest:'/tmp/'}).array('image'));
app.use(cookieParser());

router(app, __dirname);

app.listen(3000,function(){
    console.log("Express server listening on port "+3000);
});
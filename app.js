var express = require('express'),
	crypto = require('crypto'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	router = require('./backend/router.js'),
	upload = require('jquery-file-upload-middleware');

var app = express();

// 配置upload中间件
upload.configure({
    uploadDir: __dirname + '/public/uploads',
    uploadUrl: '/uploads'
});
app.use('/upload', upload.fileHandler());
upload.on('begin', function(fileInfo){
    // 重命名上传的图片
    crypto.pseudoRandomBytes(16, function (err, raw) {
        if(err) { console.log(err); }

        fileInfo.name = raw.toString('hex') + path.extname(fileInfo.originalName);
    });
})

app.use(express.static('public'));
app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

router(app, __dirname);

app.listen(3000,function(){
    console.log("MeGa服务启动成功，端口号为: "+3000);
});
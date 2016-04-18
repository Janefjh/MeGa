var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({dest:'/tmp/'}).array('image'));
app.use(cookieParser());

//主页（填写用户个人信息）
app.get('/',function(req,res){
    console.log("主页 GET请求.");
    console.log("Cookies: ",req.cookies);
    res.sendFile(__dirname + '/views/'+'index.html');
});
app.get('/user',function(req,res){
    //输出JSON 格式
    var response = {
        userName:req.query.userName,
        userEmail:req.query.userEmail,
        userPsd:req.query.userPsd
    };
    console.log(response);
    console.log("Cookies: ",req.cookies);
    res.end(JSON.stringify(response));
});

//文件上传页
app.get('/file',function(req,res){
    console.log("文件上传页");
    res.sendFile(__dirname + '/views/'+'fileUpload.html');
});
app.post('/file_upload',function(req,res){
    var response;

    var des_file = __dirname + "/public/uploads/" + req.files[0].originalname;//图片上传到服务器的路径
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                response = {
                    status:200,
                    data:{
                        message:'file upload successful.',
                        filename:req.files[0].originalname
                    }
                };
            }
            console.log( response );
            res.end( JSON.stringify( response ) );
        });
    });
});

//获取json文件中的用户列表
app.get('/list_users',function(req,res){
    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function(err,data){
        if(err){
            console.log(err);
        }else{
            console.log(data);
            res.end(data);
        }
    });
});

//添加用户
var user = {
    "user4" : {
        "name" : "mohit",
        "password" : "password4",
        "profession" : "teacher",
        "id": 4
    }
};
app.get('/addUser',function(req,res){
    fs.readFile(__dirname + "/data/users.json",'utf8',function(err,data){
        if(err){
            console.log(err);
        }else{
            data = JSON.parse(data);
            data["user4"] = user["user4"];

            fs.writeFile(__dirname + "/data/users.json",JSON.stringify(data),'utf8',function(err){
                if(err){
                    console.log("add user failed");
                }else{
                    console.log("add user successfully");
                    console.log(data);
                    res.end(JSON.stringify(data));
                }
            });
        }
    });
});

//按id查询用户信息
app.get('/search:id',function(req,res){
    fs.readFile(__dirname + "/data/users.json",'utf8',function(err,data){
        if(err){
            console.log(err);
        }else{
            data = JSON.parse(data);
            var user = data["user" + req.params.id];
            console.log(user);
            res.end(JSON.stringify(user));
        }
    });
});

//按id删除用户信息
app.get('/delete:id',function(req,res){
    fs.readFile(__dirname + "/data/users.json",'utf8',function(err,data){
        if(err){
            console.log(err);
        }else{
            data = JSON.parse(data);
            delete data["user" + req.params.id];
            fs.writeFile(__dirname + "/data/users.json",JSON.stringify(data),'utf8',function(err){
                if(err){
                    console.log("delete user failed");
                }else{
                    console.log("delete user successfully");
                    console.log(data);
                    res.end(JSON.stringify(data));
                }
            });
        }
    });
});

//对页面abXXXXcd等模糊匹配等响应GET请求
app.get('/ab*cd',function(req,res){
    console.log("/ab*cd GET 请求.");
    res.send("正则匹配.");
});

var server = app.listen(8080,function(){
    console.log(server.address());
});
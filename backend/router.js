var Users = require('./models/users.js');
var Brands = require('./models/brands.js');
var colors = require('colors');

module.exports = function(app, baseURL) {
    /********** 页面请求接口 ***********/
    app.get('/', function(req, res) {
        var signedUserName = req.cookies.BookerCookie; 
        if(typeof signedUserName != 'undefined'){   // 如果cookie中有权限，则直接进入首页
            console.log('> Cookie: '+ signedUserName);
            res.sendFile(baseURL + '/public/views/index.html');
        }else{
            res.redirect('/login'); // 如果cookie中没有权限，则重定向到登录页面
        }
    });
    app.get('/login', function(req, res) {
        res.sendFile(baseURL + '/public/views/login.html');
    });
    app.get('/regist', function(req, res) {
        res.sendFile(baseURL + '/public/views/regist.html');
    });
    // 品牌相关页面
    app.get('/brandList', function(req, res) {
        res.sendFile(baseURL + '/public/views/brand/brandList.html');
    });
    app.get('/addBrand', function(req, res) {
        res.sendFile(baseURL + '/public/views/brand/addBrand.html');
    });

    /********** AJAX请求处理接口 **********/
    app.post('/login', function(req, res) {
        console.log("@ 登录请求...".cyan);

        var user = new Users();
        user.login(req.body, function(message){
            // 成功
            console.log(("> " + message).green);
            res.cookie('BookerCookie', req.body.userName, {maxAge: 60000, httpOnly: true});
            res.json({
                "status": 200,
                "cookie": req.body.userName,
                "message": message
            });
            res.end();
        }, function(message){
            // 失败
            console.log(("> " + message).red);
            res.json({
                "status": 202,
                "message": message
            });
            res.end();
        });
    });

    app.post('/regist', function(req, res) {
        console.log("@ 注册请求...".cyan);

        var user = new Users();
        user.regist(req.body, function(message){
            // 成功
            console.log(("> "+message).green);
            res.cookie('BookerCookie', req.body.userName, {maxAge: 60000, httpOnly: true});
            res.json({
                "status": 200,
                "cookie": req.body.userName,
                "message": message
            });
            res.end();
        }, function(message){
            // 失败
            console.log(("> " + message).red);
            res.json({
                "status": 202,
                "message": message
            });
            res.end();
        });
    });

    app.post('/getBrandList', function(req, res) {
        var brand = new Brands();
        brand.getBrandList(req.body.userName, function(data){
            res.json({
                "status": 200,
                "message": "获取品牌列表成功!",
                "data": data
            });
            res.end();
        });
    });

    app.post('/createBrand', function(req, res){
        var brand = new Brands();
        brand.createBrand(req.body, function(data){
            res.json({
                "status": 200,
                "message": "新建品牌成功!",
                "data": data
            });
            res.end();
        });
    });

    app.post('/deleteBrand', function(req, res){
        var brand = new Brands();
        brand.deleteBrand(req.body.brandName, function(data){
            if(data.result.n == 1){
                res.json({
                    "status": 200,
                    "message": "删除品牌成功!",
                    "data": data
                });
            }else{
                res.json({
                    "status": 202,
                    "message": "删除品牌失败!",
                    "data": data
                });
            }
            res.end();
        });
    });

    app.post('/updateBrand', function(req, res){
        console.log("> 修改品牌ajax请求.".green);
        var brand = new Brands();
        brand.updateBrand(req.body.brandName, req.body.brandDoc, function(data){
            if(data.result.n == 1){
                res.json({
                    "status": 200,
                    "message": "修改品牌成功!",
                    "data": data
                });
            }else{
                res.json({
                    "status": 202,
                    "message": "修改品牌失败!",
                    "data": data
                });
            }
            res.end();
        });
    });
};
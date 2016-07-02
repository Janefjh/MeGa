var Users = require('./models/users.js');
var Brands = require('./models/brands.js');
var colors = require('colors');

module.exports = function(app, baseURL) {
    /********** 页面请求接口 ***********/
    app.get('/index', function(req, res) {
        var signedUserName = req.cookies.MeGaUserName; 
        if(typeof signedUserName != 'undefined'){   // 如果cookie中有权限，则直接进入首页
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
        console.log('Cookies: ', req.cookies.MeGaUserName);
        res.sendFile(baseURL + '/public/views/brand/brandList.html');
    });
    app.get('/addBrand', function(req, res) {
        res.sendFile(baseURL + '/public/views/brand/addBrand.html');
    });
    // 产品相关页面
    app.get('/productList', function(req, res) {
        res.sendFile(baseURL + '/public/views/product/productList.html');
    });
    app.get('/addProduct', function(req, res) {
        res.sendFile(baseURL + '/public/views/product/addProduct.html');
    });

    /********** AJAX请求处理接口 **********/
    app.post('/login', function(req, res) {
        console.log("> 登录请求...".green);

        var user = new Users();
        user.login(req.body, function(message){
            // 成功
            console.log(message.blue);
            res.cookie('MeGaUserName', req.body.userName, {maxAge: 60000, httpOnly: true});
            res.json({
                "status": 200,
                "cookie": req.body.userName,
                "message": message
            });
            res.end();
        }, function(message){
            // 失败
            console.log(message.red);
            res.json({
                "status": 202,
                "message": message
            });
            res.end();
        });
    });

    app.post('/regist', function(req, res) {
        console.log("> 注册请求...".green);

        var user = new Users();
        user.regist(req.body, function(message){
            // 成功
            console.log(message.blue);
            res.cookie('MeGaUserName', req.body.userName, {maxAge: 60000, httpOnly: true});
            res.json({
                "status": 200,
                "cookie": req.body.userName,
                "message": message
            });
            res.end();
        }, function(message){
            // 失败
            console.log(message.red);
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

    app.post('/getProductList', function(req, res) {
        console.log("> 获取产品列表post请求.".green);
        console.log(req.body.userName);

        var productList = [{
            "userName": 'Guoer',
            "brandName": '科颜氏 Kiehl’s',
            "productName": '科颜氏高保湿面霜',
            "productDetail": '高保湿面霜高保湿面霜高保湿面霜...',
            "auditStatus": '1',
            "like": '0', 
            "productTags": ["保湿", "护肤"]
        },{
            "userName": 'Guoer',
            "brandName": '兰蔻 Lancome',
            "productName": '兰蔻小瓶',
            "productDetail": '小瓶小瓶小瓶小瓶小瓶...',
            "auditStatus": '0',
            "like": '0', 
            "productTags": ["美白", "护肤"]
        }];
        res.json({
            "status": 1,
            "statusCode":200,
            "data": productList
        });
        res.end();
    });
};
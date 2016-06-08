var Users = require('./models/users.js');
var Brands = require('./models/brands.js');
var colors = require('colors');

module.exports = function(app, baseURL) {
    /********** 页面渲染接口 ***********/
    app.get('/', function(req, res) {
        res.cookie('MeGaUserName', 'Guoer');
        res.sendFile(baseURL + '/public/views/index.html');
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

    app.post('/regist', function(req, res) {
        console.log("> 用户注册ajax请求.".green);

        var user = new Users();
        user.regist(function(data){
            console.log(data);
            res.json(data);
            res.end();
        });
    });

    app.post('/login', function(req, res) {
        console.log("> 登录ajax请求.".green);
        res.end();
    });

    app.get('/vueGet', function(req, res) {
        console.log("> Vue GET请求.".green);
        
        res.json({
            "status": 1,
            "statusCode":200,
            "data":[{
                'id':1,
                'bookName':"《平凡的世界》",
                'author':"路遥"
            },{
                'id':2,
                'bookName':"《沉默的大多数》",
                'author':"王小波"
            },{
                'id':3,
                'bookName':"《黄金时代》",
                'author':"王小波"
            }]
        });
        res.end();
    });
     app.post('/vuePost', function(req, res) {
        console.log("> Vue POST请求.".green);
        console.log(req.body);
        res.json(req.body);
        res.end();
    });

};
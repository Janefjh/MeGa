var colors = require('colors');
var Users = require('./models/users.js').Users;

module.exports = function(app,baseURL) {
    /************************ 页面渲染接口 *************************/
    //主页
    app.get('/index', function(req, res) {
        console.log(("# 来自浏览器的页面渲染请求 : 主页").green);
        res.sendFile(baseURL + '/public/index.html');
    });


    /********************* AJAX请求处理接口 ***********************/
    //  用户注册接口
    app.post('/signup',function(req, res){
        console.log(("# AJAX请求POST : 用户注册").yellow);

        var User = new Users();
        var userInfo = req.body;
        User.signup(userInfo, function(){
            res.json(userInfo);
            res.end();
        });
    });
};
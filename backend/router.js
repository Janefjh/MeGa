var Users = require('./models/users.js');

module.exports = function(app,baseURL) {
    /************************ 页面渲染接口 *************************/
    app.get('/', function(req, res) {
        res.sendFile(baseURL + '/public/views/index.html');
    });
    app.get('/brandList', function(req, res) {
        res.sendFile(baseURL + '/public/views/brand/brandList.html');
    });
     app.get('/addBrand', function(req, res) {
        res.sendFile(baseURL + '/public/views/brand/addBrand.html');
    });


    /********************* AJAX请求处理接口 ***********************/
    app.post('/signup',function(req, res){
        var User = new Users();
        var userInfo = req.body;
        User.signup(userInfo, function(){
            res.json(userInfo);
            res.end();
        });
    });
};
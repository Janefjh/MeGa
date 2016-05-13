var colors = require('colors');
var assert = require('assert');

var MongoClient = require('./models/db.js');
var url = 'mongodb://localhost:27017/tutorial';

module.exports = function(app,baseURL) {
    
    /************************ 页面渲染接口 *************************/
    var insertDocument = function(db, callback) {
        db.collection('movie').insertOne({
            "address": {
                "street": "杭州市滨江区星光大道",
                "zipcode": "10075",
                "building": "1480",
                "coord": [-73.9557413, 40.7720266]
            },
            "borough": "杭州",
            "cuisine": "China",
            "grades": [{
                "date": new Date("2014-10-01T00:00:00Z"),
                "grade": "A",
                "score": 11
            }, {
                "date": new Date("2014-01-16T00:00:00Z"),
                "grade": "B",
                "score": 17
            }],
            "name": "Vella",
            "restaurant_id": "41704620"
        }, function(err, result) {
            assert.equal(err, null);
            console.log(("成功在movie集合中插入了一条数据！").green);
            callback();
        });
    };
    //主页
    app.get('/index', function(req, res) {
        console.log(("来自浏览器的页面渲染请求 : 主页.").green);
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            insertDocument(db, function() {
                db.close();
            });
        });
        res.sendFile(baseURL + '/public/index.html');
    });
    //用户列表页
    app.get('/listUsers', function(req, res) {
        console.log(("页面渲染 : 用户列表页.").green);
        res.sendFile(baseURL + '/public/listUsers.html');
    });


    /********************* AJAX请求处理接口 ***********************/
    //获取所有用户列表
    app.post('/getAllUsers',function(req, res){
        console.log(("ajax请求 : 获取所有用户列表.").yellow);
        var users = new controllers.UserController(baseURL);
        var showUsersList = function(obj, res){
            res.json(JSON.parse(obj));
            res.end();
        }
        users.getAllUsers(showUsersList, res);
    });
};
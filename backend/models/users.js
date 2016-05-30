var Database = require('./db.js');

function Users() {
	this.enterpriseName = '';
	this.userName = '';
	this.email = '';
	this.password = '';
}

// 注册
Users.prototype.regist = function(callback) {
	var db = new Database();
	db.findAllDocuments("users",function(data){
		callback(data);
	});

	// db.insertOneDocument("users", param_document, callback);
};

// 登录
Users.prototype.login = function(){

};

module.exports = Users;
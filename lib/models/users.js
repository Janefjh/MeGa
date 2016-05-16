var Database = require('./db.js').Database;

/**
 * [Users构造器]
 */
function Users() {
}

/**
 * [注册新用户]
 */
Users.prototype.signup = function(param_document, callback) {
	var db = new Database();
	db.insertOneDocument('users', param_document, callback);
};

/**
 * [用户登录]
 */
Users.prototype.login = function(){

};

exports.Users = Users;
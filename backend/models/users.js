var Database = require('./db.js');

function Users() {
	
}

/**
 * [检验用户名]
 * @param  {String}   userName [待检验的用户名]
 * @param  {Function} callback [检验完成的回调函数]
 */
Users.prototype.checkUserName = function(userName, callback){
	var db = new Database();
	db.findDocumentsByFilter('users', {'userName': userName}, function(result){
		callback(result);
	});
};
/**
 * [检验邮箱]
 * @param  {String}   email    [待检验邮箱]
 * @param  {Function} callback [检验完成的回调函数]
 */
Users.prototype.checkEmail = function(email, callback){
	var db = new Database();
	db.findDocumentsByFilter('users', {'email': email}, function(result){
		callback(result);
	});
};

Users.prototype.regist = function(formData, succCallback, failCallback) {
	var that = this;
	that.checkUserName(formData.userName, function(result){
		if(result.length > 0){
			failCallback("该用户名已存在");
		}else{
			that.checkEmail(formData.email, function(result){
				if(result.length > 0){
					failCallback("该邮箱已被注册");
				}else{
					var db = new Database();
					db.insertOneDocument("users", formData, function(result){
						succCallback("注册成功");
					});
				}
			});
		}
	});
};

Users.prototype.login = function(formData, succCallback, failCallback){
	this.checkUserName(formData.userName, function(result){
		if(result.length > 0){
			if(result[0].password == formData.password){
				succCallback("登录成功");
			}else{
				failCallback("密码不正确");
			}
		}else{
			failCallback("该用户不存在, 请先注册");
		}

		return;
	});
	
};

module.exports = Users;
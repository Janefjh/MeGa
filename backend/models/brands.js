var Database = require('./db.js');

function Brands() {
	this.userName = '';
    this.brandName = '';
    this.brandLogo = '';
    this.brandDetail = '';
    this.auditStatus = '';
    this.like = '';
    this.productTag = [];
}

/**
 * [根据用户名获取品牌列表]
 * @param  {String}   user_name [用户名]
 * @param  {Function} callback  [从数据库成功获取品牌列表后的回调函数]
 */
Brands.prototype.getBrandList = function(user_name, callback) {
	var db = new Database();
	db.findDocumentsByFilter("brands", {"userName": user_name}, function(data){
		callback(data);
	});
};
/**
 * [创建新的品牌]
 * @param  {Object}   brand_doc [待插入的品牌信息]
 * @param  {Function} callback  [插入成功的回调函数]
 */
Brands.prototype.createBrand = function(brand_doc, callback){
	var db = new Database();
	db.insertOneDocument("brands", brand_doc, function(data){
		callback(data);
	});
};

/**
 * [根据品牌名称删除某个品牌]
 * @param  {string}   brand_name [品牌名称]
 * @param  {Function} callback  [删除成功回调函数]
 */
Brands.prototype.deleteBrand = function(brand_name, callback){
	var db = new Database();
	db.deleteOneDocument("brands", {brandName: brand_name}, function(data){
		callback(data);
	});
};

/**
 * [根据品牌名称修改某个品牌信息]
 * @param  {String}   brand_name      [品牌名称]
 * @param  {Object}   brand_updateDoc [修改后的品牌信息]
 * @param  {Function} callback        [修改成功回调函数]
 */
Brands.prototype.updateBrand = function(brand_name, brand_updateDoc, callback){
	var db = new Database();
	var brandDoc = {
		userName : brand_updateDoc.userName,
	    brandName : brand_updateDoc.brandName,
	    brandLogo : brand_updateDoc.brandLogo,
	    brandDetail : brand_updateDoc.brandDetail,
	    auditStatus : brand_updateDoc.auditStatus,
	    like : brand_updateDoc.like,
	    productTag : brand_updateDoc.productTag
	};
	console.log(brand_name);
	console.log(brandDoc);
 
	db.updateOneDocument("brands", {brandName: brand_name}, brandDoc, function(data){
		callback(data);
	});
};

module.exports = Brands;
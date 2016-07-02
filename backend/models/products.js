var Database = require('./db.js');

function Products() {
	this.userName = ''; //用户名
	this.brandName = ''; // 所属品牌名(唯一)
    this.productName = ''; // 商品名称
    this.productImg = ''; // 商品图片
    this.productDetail = ''; // 商品介绍
    this.auditStatus = ''; // 审核状态
    this.like = ''; // 被喜欢数
    this.productTags = []; // 商品标签
}

/**
 * [根据用户名获取商品列表]
 * @param  {String}   user_name [用户名]
 * @param  {Function} callback  [从数据库成功获取商品列表后的回调函数]
 */
Products.prototype.getProductList = function(user_name, callback) {
	var db = new Database();
	db.findDocumentsByFilter("products", {"userName": user_name}, function(data){
		callback(data);
	});
};
/**
 * [创建新的商品]
 * @param  {Object}   product_doc [待插入的商品信息]
 * @param  {Function} callback    [插入成功的回调函数]
 */
Products.prototype.createProduct = function(product_doc, callback){
	var db = new Database();
	db.insertOneDocument("products", product_doc, function(data){
		callback(data);
	});
};

/**
 * [根据商品名称删除某个商品]
 * @param  {string}   product_name [商品名称]
 * @param  {Function} callback  [删除成功回调函数]
 */
Products.prototype.deleteProduct = function(product_name, callback){
	var db = new Database();
	db.deleteOneDocument("products", {productName: product_name}, function(data){
		callback(data);
	});
};

/**
 * [根据商品名称修改某个商品信息]
 * @param  {String}   product_name      [商品名称]
 * @param  {Object}   product_updateDoc [修改后的商品信息]
 * @param  {Function} callback          [修改成功回调函数]
 */
Products.prototype.updateProduct = function(product_name, product_updateDoc, callback){
	var db = new Database();
	var productDoc = {
		userName: product_updateDoc.userName,
		brandName: product_updateDoc.brandName,
	    productName: product_updateDoc.productName,
	    productImg: product_updateDoc.productImg,
	    productDetail: product_updateDoc.productDetail,
	    auditStatus: product_updateDoc.auditStatus,
	    like: product_updateDoc.like,
	    productTags: product_updateDoc.productTags
	};
 
	db.updateOneDocument("products", {productName: product_name}, productDoc, function(data){
		callback(data);
	});
};

module.exports = Products;
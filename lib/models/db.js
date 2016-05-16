var assert = require('assert');
var colors = require('colors');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/MeGa';

/**
 * [定义数据库构造器]
 */
function Database() {

}

/**
 * [插入一条记录(注意: 若集合不存在，mongodb会先自动创建集合，再执行插入操作)]
 * @param  {String}		param_collection [待插入记录所在集合的名称]
 * @param  {Object}		param_document [待插入的记录内容]
 * @param  {Function}	callback [插入成功的回调函数。]
 */
Database.prototype.insertOneDocument = function(param_collection, param_document, callback) {
	var insertOneDoc = function(db, cb) {
		var collection = db.collection(param_collection);
		// 插入一条记录
		collection.insertOne(param_document, function(err, result) {
			assert.equal(err, null);
			console.log(("> 成功向集合" + param_collection + "中插入了1条记录.").cyan);
			callback(result);
		});
	};

	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("> 数据库连接成功...".cyan);
		insertOneDoc(db, function() {
			db.close();
		});
	});
};

/**
 * [插入多条记录]
 * @param  {String} 	param_collection [待插入记录的集合名称]
 * @param  {Array}	    param_documents  [待插入的记录内容]
 * @param  {Function}	callback [插入成功的回调函数]
 */
Database.prototype.insertManyDocuments = function(param_collection, param_documents, callback) {
	var insertManyDocs = function(db, cb) {
		var collection = db.collection(param_collection);
		// 插入多条记录
		collection.insertMany(param_documents, function(err, result) {
			assert.equal(err, null);
			console.log(("> 成功向集合" + param_collection + "中插入了" + param_documents.length + "条记录.").cyan);
			callback(result);
		});
	};

	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("> 数据库连接成功...".cyan);
		insertManyDocs(db, function() {
			db.close();
		});
	});
};

/**
 * [查询一个集合中的所有记录]
 * @param  {String}		param_collection [待查询集合名称]
 * @param  {Function}	callback [查询成功的回调函数]
 */
Database.prototype.findAllDocuments = function(param_collection, callback) {
	var findAllDocs = function(db, cb) {
		var collection = db.collection(param_collection);
		// 获取find()方法返回的记录对象
		var result = collection.find();
		callback(result);
	};

	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("> 数据库连接成功...".cyan);
		findAllDocs(db, function() {
			db.close();
		});
	});
};

/**
 * [查询一个集合中的所有记录, 并按照指定条件排序]
 * @param  {String}		param_collection [待查询集合名称]
 * @param  {Object}		param_condition  [排序条件]
 * @param  {Function}	callback [查询成功的回调函数]
 */
Database.prototype.findSortAllDocuments = function(param_collection, param_condition, callback){
	var findSortAllDocs = function(db, cb) {
		var collection = db.collection(param_collection);
		var result = collection.find().sort(param_condition);
		callback(result);
	};
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("> 数据库连接成功...".cyan);
		findSortAllDocs(db, function() {
			db.close();
		});
	});
};

/**
 * [按条件查询集合中的记录]
 * @param  {String}		param_collection [待查询集合名称]
 * @param  {Object}		param_filter	 [查询过滤条件]
 * @param  {Function}	callback [查询成功的回调函数]
 */
Database.prototype.findDocumentsByFilter = function(param_collection, param_filter, callback){
	var findDocsByFilter = function(db, cb){
		var collection = db.collection(param_collection);
		var result = collection.find(param_filter);
		callback(result);
	};
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("> 数据库连接成功...".cyan);
		findDocsByFilter(db, function() {
			db.close();
		});
	});
};

/**
 * [按条件查询集合中的记录, 并按照指定条件排序]
 * @param  {String}		param_collection [待查询集合名称]
 * @param  {Object}		param_condition  [排序条件]
 * @param  {Object}		param_filter	 [查询过滤条件]
 * @param  {Function}	callback [查询成功的回调函数]
 */
Database.prototype.findSortDocumentsByFilter = function(param_collection, param_condition, param_filter, callback){
	var findSortDocsByFilter = function(db, cb){
		var collection = db.collection(param_collection);
		var result = collection.find(param_filter).sort(param_condition);
		callback(result);
	};
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("> 数据库连接成功...".cyan);
		findSortDocsByFilter(db, function() {
			db.close();
		});
	});
};


exports.Database = Database;
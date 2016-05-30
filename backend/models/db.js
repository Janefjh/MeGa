var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/MeGa';

function Database() {}
/**
 * [插入一条记录(注意: 若集合不存在，mongodb会先自动创建集合，再执行插入操作)]
 * @param  {String}   param_collection [待插入记录所在集合的名称]
 * @param  {Object}   param_document [待插入的记录内容]
 * @param  {Function} callback [插入成功的回调函数]
 */
Database.prototype.insertOneDocument = function(param_collection, param_document, callback) {
	"use strict";
	var insertOneDoc = function(db, cb) {
		var collection = db.collection(param_collection);
		collection.insertOne(param_document, function(err, result) {
			assert.equal(err, null);
			callback(result);
		});
	};
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		insertOneDoc(db, function() {
			db.close();
		});
	});
};

/**
 * [根据_id删除一条记录]
 * @param  {String}   param_collection [待删除记录所在集合的名称]
 * @param  {Object}   param_filter     [删除过滤条件]
 * @param  {Function} callback         [删除成功的回调函数]
 */
Database.prototype.deleteOneDocument = function(param_collection, param_filter, callback){
	"use strict";
	var deleteOneDoc = function(db, cb){
		var collection = db.collection(param_collection);
		console.log(param_filter);
		collection.deleteOne(param_filter, function(err, result){
			assert.equal(err, null);
			callback(result);
		});
	};
	MongoClient.connect(url, function(err, db){
		assert.equal(null, err);
		deleteOneDoc(db, function(){
			db.close();
		});
	});
};

/**
 * [按条件修改某条记录]
 * @param  {String}   param_collection [待修改记录所在集合]
 * @param  {Object}   param_filter     [修改过滤条件]
 * @param  {Object}   param_updateDoc [修改后的记录]
 * @param  {Function} callback         [修改成功的回调函数]
 */
Database.prototype.updateOneDocument = function(param_collection, param_filter, param_updateDoc, callback){
	"use strict";
	var updateOneDoc = function(db, cb) {
		var collection = db.collection(param_collection);
		collection.updateOne(param_filter, {$set: param_updateDoc}, function(err, result) {
			assert.equal(err, null);
			assert.equal(1, result.result.n);
			callback(result);
		});
	};
	MongoClient.connect(url, function(err, db){
		assert.equal(null, err);
		updateOneDoc(db, function(){
			db.close();
		});
	});
};

/**
 * [查询一个集合中的所有记录]
 * @param  {String}   param_collection [待查询集合名称]
 * @param  {Function} callback [查询成功的回调函数]
 */
Database.prototype.findAllDocuments = function(param_collection, callback) {
	"use strict";
	var findAllDocs = function(db, cb) {
		var collection = db.collection(param_collection);
		collection.find({}).toArray(function(err, docs){
			callback(docs);
		});
	};
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		findAllDocs(db, function() {
			db.close();
		});
	});
};

/**
 * [按条件查询集合中的记录]
 * @param  {String}   param_collection [待查询集合名称]
 * @param  {Object}	  param_filter [查询过滤条件]
 * @param  {Function} callback [查询成功的回调函数]
 */
Database.prototype.findDocumentsByFilter = function(param_collection, param_filter, callback){
	"use strict";
	var findDocsByFilter = function(db, cb){
		var collection = db.collection(param_collection);
		collection.find(param_filter).toArray(function(err, docs){
			callback(docs);
		});
	};
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		findDocsByFilter(db, function() {
			db.close();
		});
	});
};

module.exports = Database;
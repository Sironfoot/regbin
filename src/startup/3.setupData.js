// Ensure Common Expressions are present
var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var path = require('path');
var fs = require('fs');

exports.task = function(app, next) {

	MongoClient.connect('mongodb://127.0.0.1:27017/regbin', function(err, db) { 
	    if (err) throw err;
	    
	    var collection = db.collection('common');
	    
	    var commonDataPath = path.join(__rootDir, 'lib', 'commonRegex.json');
	    fs.readFile(commonDataPath, { encoding: 'utf-8' }, function(err, data) {
	        if (err) throw err;
	        
	        var commonExpressions = JSON.parse(data.toString());
	        
	        async.each(commonExpressions,
	            function saveToDatabase(expression, done) {
	                
	                collection.findOne({ name: expression.name }, function(err, document) {
	                    if (err) throw err;
	                    
	                    if (document) {
	                        done();
	                    }
	                    else {
	                        collection.insert(expression, function(err, docs) {
	                            if (err) throw err;
	                            done();
	                        });
	                    }
	                });
	            },
	            function finished(err) {
	                next();
	            });
	    });
	});
};
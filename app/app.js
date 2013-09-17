
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var cons = require('consolidate');
var gu = require('guthrie');
var async = require('async');
var fs = require('fs');

var app = express();
app.engine('html', cons.dust);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// Set-up router
var router = new gu.Router(app, __dirname);
router.mapRoute('/', { controller: 'home', action: 'index' });


// Ensure Common Expressions are present
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/regbin', function(err, db) {
    if (err) throw err;
    
    var collection = db.collection('common');
    
    var commonDataPath = path.join(__dirname, 'lib', 'commonRegex.json');
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
                // Finished checking, run app
                http.createServer(app).listen(app.get('port'), function(){
                    console.log('RegBin listening on port ' + app.get('port'));
                });
            });
    });
});





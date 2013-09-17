
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var cons = require('consolidate');
var gu = require('guthrie');

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

var router = new gu.Router(app, __dirname);

router.mapRoute('/', { controller: 'home', action: 'index' });

http.createServer(app).listen(app.get('port'), function(){
  console.log('RegBin listening on port ' + app.get('port'));
});
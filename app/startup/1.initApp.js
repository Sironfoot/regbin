var express = require('express');
var path = require('path');
var cons = require('consolidate');

exports.task = function(app, next) {

	app.engine('html', cons.dust);

	// all environments
	app.set('port', process.env.PORT || 3000);
	
	app.set('views', __rootDir + '/views');
	app.set('view engine', 'html');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	
	app.use(express.static(path.join(__rootDir, 'public')));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	
	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	next();
};
/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var Bootstrapper = require('./lib/bootstrapper');

var app = express();

var bootstrapper = new Bootstrapper({
	path: path.join(__dirname, 'startup'),
	state: app
});

bootstrapper.run(function finished() {
	http.createServer(app).listen(app.get('port'), function(){
        console.log('RegBin listening on port ' + app.get('port'));
    });
});
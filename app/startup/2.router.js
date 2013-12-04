var gu = require('guthrie');
var path = require('path');

exports.task = function(app, next) {
	var rootDir = path.join(__dirname, '..');

	// Set-up router
	var router = new gu.Router(app, rootDir);
	router.mapRoute('/', { controller: 'home', action: 'index' });
	
	next();
};
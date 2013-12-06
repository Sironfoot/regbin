var gu = require('guthrie');

exports.task = function(app, next) {
	// Set-up router
	var router = new gu.Router(app, __rootDir);
	router.mapRoute('/', { controller: 'home', action: 'index' });
	
	next();
};
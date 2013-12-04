var fs = require('fs');
var path = require('path');
var EventEmitter = require('events').EventEmitter;

var Bootstrapper = function(config) {
	config = config || {};
	
	this.path = config.path;
	this.state = config.state;
	
	this.tasks = [];
};

Bootstrapper.prototype = Object.create(EventEmitter.prototype);

Bootstrapper.prototype.addTask = function(task) {
	this.tasks.push(task);
};

Bootstrapper.prototype.run = function(finished) {
	var dirPath = this.path;
	var state = this.state;
	
	var that = this;
	
	if (this.path) {
		fs.readdir(dirPath, function(err, files) {

			processFiles(dirPath, files, [], function(taskModules) {
			
				console.log('Found ' + taskModules.length + ' taskModules');
				// TODO: run taskModules
				taskModules.forEach(function(taskModule) {
				
					console.log(taskModule);
				
					if (taskModule.task) {
						that.tasks.push(taskModule.task);
					}
				
					if (Array.isArray(taskModule.tasks)) {
						taskModule.tasks.forEach(function(task) {
							that.tasks.push(task);
						})
					}
				});
				
				console.log('running tasks: ' + that.tasks.length);
				runTasks(that.tasks, state, function() {
					if (finished) {
						finished(state);
					}
					
					that.emit('finished', state);
				});
			});
		});
	}
	else {
		runTasks(that.tasks, state, function() {
			if (finished) {
				finished(state);
			}
			
			that.emit('finished', state);
		});
	}
};

module.exports = Bootstrapper;


var runTasks = function(tasks, state, done) {
	if (tasks.length === 0) {
		return done();
	}

	var task = tasks.shift();
	
	task(state, function() {
		runTasks(tasks, state, done);
	});
};


var processFiles = function(dir, remainingFiles, taskModules, done) {
	taskModules = taskModules || [];

	if (remainingFiles.length === 0) {
		return done(taskModules);
	}

	var filename = remainingFiles.shift();
	
	var fullpath = path.join(dir, filename);
	
	fs.stat(fullpath, function(err, stats) {
		if (err) throw err;
		
		if (stats) {
		
			if (stats.isFile() && path.extname(filename) === '.js') {
				var taskModule = require(fullpath);
				
				if (taskModule) {
					taskModules.push(taskModule);
				}
			}
			else if (stats.isDirectory()) {
				
			}
			
			processFiles(dir, remainingFiles, taskModules, done);
		}
	});
};
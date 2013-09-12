var gu = require('guthrie');
var fs = require('fs');
var path = require('path');
var async = require('async');

var sampleCode = require('./../lib/sampleCode');

var homeController = gu.controller.create({
    filters: [
        function(req, res, next) {
            this.rootDir = path.join(__dirname, '..');
            next();
        }
    ]
});

homeController.actions = {
    
    // PATH: /
    index: {
        GET: function(req, res) {
                        
            res.view({
                codeSamples: {
                    replace: sampleCode.replace,
                    search: sampleCode.search,
                    match: sampleCode.match,
                    split: sampleCode.split
                }
            });
        }
    }
};

module.exports = homeController;
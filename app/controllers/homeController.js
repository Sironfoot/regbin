var gu = require('guthrie');

var homeController = gu.controller.create();

homeController.actions = {
    
    // PATH: /
    index: {
        GET: function(req, res) {
            res.view();
        }
    }
};

module.exports = homeController;
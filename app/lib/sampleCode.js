var fs = require('fs');
var path = require('path');


var replace = 'var newString = myString.replace(/$1/$2, "$3");';

var match = 'var matches = myString.match(/$1/$2);\n' +
            '\n' +
            '// "matches" will be null if no matches were found\n' +
            'if (matches) {\n' +
            '    matches.forEach(function(match, index) {\n' +
            '        // do something with "match"\n' +
            '    });\n' +
            '}';

var  search = 'var indexPos = myString.search(/$1/$2);\n' +
              '\n' +
              'if (indexPos !== -1) {\n' +
              '    // found\n' +
              '}';

var split = 'var items = myString.split(/$1/$2);\n' +
            '\n' +
            'items.forEach(function(item, index) {\n' +
            '    // do something with "item"\n' +
            '});';


module.exports = {
    replace: replace,
    match: match,
    search: search,
    split: split
};
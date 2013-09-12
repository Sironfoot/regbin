var matches = myString.match(/$1/$2);

// "matches" will be null if no matches were found
if (matches) {
    matches.forEach(function(match, index) {
        // do something with "match"
    });
}
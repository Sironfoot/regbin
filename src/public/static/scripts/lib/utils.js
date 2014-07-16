define([], function() {
    
    return {
         htmlEncode: function(input) {
             return input.replace(/&/g, '&amp;')
                         .replace(/</g, '&lt;')
                         .replace(/>/g, '&gt;')
                         .replace(/'/g, '&#39;')
                         .replace(/"/g, '&quot;');
         }
    };
});
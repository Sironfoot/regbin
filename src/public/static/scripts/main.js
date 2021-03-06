require([ 'lib/resig', 'lib/utils' ], function($, utils) {
    'use strict';
    
    $.domReady(function() {
        $.fromId('copy-button').$_on('click', function(e) {
            var code = $.fromId('exampleCode').textContent.trim();
            window.prompt("Copy to clipboard: Ctrl+C, Enter", code);
        });
        
        var executeRegex = function() {
        
            var input = controls.input.value;
            var method = controls.method.value;
            
            var regexString = controls.regex.value;
            var options = controls.options.value;
            
            if (regexString === '') {
                controls.outputs.allContainers.$_hide(); 
            
                if (method === 'replace') {
                    var result = utils.htmlEncode(input);
                    result = result.replace(/\n/g, '<br />');

                    controls.outputs.replace.result.$_html(result);
                    
                    controls.outputs.replace.container.style.display = 'table-row';
                }
                else if (method === 'search') {
                    controls.outputs.search.result.$_text('Not found');
                        
                    controls.outputs.search.found
                        .$_text('-')
                        .$_removeClass('found')
                        .$_addClass('notFound');
                
                    controls.outputs.search.marker.$_html('&nbsp;');
                    controls.outputs.search.indexPos.$_html('&nbsp;');
                    
                    controls.outputs.search.container.style.display = 'table-row';
                }
                else if (method === 'match') {
                    controls.outputs.match.found.$_text('No matches found');
                    controls.outputs.match.result.$_html('<li></li>');
                    
                    controls.outputs.match.container.style.display = 'table-row';
                }
                else if(method === 'split') {
                    controls.outputs.split.found.$_text('No items found');
                    controls.outputs.split.result.$_html('<li></li>');
                
                    controls.outputs.split.container.style.display = 'table-row';
                }
                
                controls.exampleCode.textContent = '-';
                
                controls.regex.$_removeClass('error');
                controls.regexError.$_html('&nbsp;');
                
                return;
            }
                        
            try {
                var regex = new RegExp(regexString, options);
                
                if (method === 'replace') {
                    var replacement = controls.replacement.value;
                    
                    var result = input.replace(regex, '####' + replacement + '####');
                    result = utils.htmlEncode(result);
                    result = result.replace(/####(.*?)####/g, '<mark>$1</mark>');
                    
                    controls.outputs.replace.result.$_html(result.replace(/\n/g, '<br />'));
                    
                    controls.exampleCode.innerHTML = codePlaceholders.replace
                        .replace(/\n/g, '\n<br />')
                        .replace(/  /g, '&nbsp;&nbsp;')
                        .replace('$1', utils.htmlEncode(regexString))
                        .replace('$2', options)
                        .replace('$3', utils.htmlEncode(replacement));
                        
                    controls.outputs.allContainers.$_hide();
                    controls.outputs.replace.container.style.display = 'table-row';
                }
                else if (method === 'search') {
     
                    var indexPos = input.search(regex);
                    
                    if (indexPos !== -1) {
                        var markRegex = new RegExp('(' + regexString + ')', options.replace('g', ''));
                
                        var result = input.replace(markRegex, '####$1####');
                        result = utils.htmlEncode(result);
                        result = result.replace(/####(.*?)####/g, '<mark>$1</mark>');
                        controls.outputs.search.result.$_html(result.replace(/\n/g, '<br />'));
                        
                        controls.outputs.search.found
                            .$_text('Found')
                            .$_removeClass('notFound')
                            .$_addClass('found');
                    
                        var spaces = new Array(indexPos + 1).join('&nbsp;');
                        
                        controls.outputs.search.marker.$_html(spaces + '^');
                        controls.outputs.search.indexPos.$_html(spaces + 'index pos: ' + indexPos);
                    }
                    else {
                        controls.outputs.search.result.$_text('Not found');
                        
                        controls.outputs.search.found
                            .$_text('Not Found')
                            .$_removeClass('found')
                            .$_addClass('notFound');
                    
                        controls.outputs.search.marker.$_html('&nbsp;');
                        controls.outputs.search.indexPos.$_html('index pos: -1');
                    }
                    
                    controls.exampleCode.innerHTML = codePlaceholders.search
                        .replace(/\n/g, '\n<br />')
                        .replace(/  /g, '&nbsp;&nbsp;')
                        .replace('$1', utils.htmlEncode(regexString))
                        .replace('$2', options);
                    
                    controls.outputs.allContainers.$_hide();
                    controls.outputs.search.container.style.display = 'table-row';
                }
                else if (method === 'match') {
                
                    var matches = input.match(regex);
                    var numMatches = matches ? matches.length : 0;
                    
                    var foundText = numMatches === 0 ? 'No' : numMatches;
                    foundText += ' match' + (numMatches !== 1 ? 'es' : '') + ' found';
                    controls.outputs.match.found.$_text(foundText);
                    
                    var resultText = '';
                    if (numMatches > 0) {
                        for (var i = 0; i < matches.length; i++) {
                            var match = matches[i];
                            
                            console.log(match);
                            
                            if (match === null || typeof match === 'undefined') {
                                resultText += '<li>null</li>';
                            }
                            else {
                                resultText += '<li>"' + utils.htmlEncode(matches[i]) + '"</li>';
                            }
                        }
                    }
                    controls.outputs.match.result.$_html(resultText);
                
                    controls.exampleCode.innerHTML = codePlaceholders.match
                        .replace(/\n/g, '\n<br />')
                        .replace(/  /g, '&nbsp;&nbsp;')
                        .replace('$1', utils.htmlEncode(regexString))
                        .replace('$2', options);
                
                    controls.outputs.allContainers.$_hide();
                    controls.outputs.match.container.style.display = 'table-row';
                }
                else if (method === 'split') {
                    var items = input.split(regex);
                    
                    var foundText = items.length === 0 ? 'No' : items.length;
                    foundText += ' item' + (items.length !== 1 ? 's' : '');
                    controls.outputs.split.found.$_text(foundText);
                    
                    var resultText = '';
                    for (var i = 0; i < items.length; i++) {
                        resultText += '<li>"' + utils.htmlEncode(items[i]) + '"</li>';
                    }
                    controls.outputs.split.result.$_html(resultText);
                    
                    controls.exampleCode.innerHTML = codePlaceholders.split
                        .replace(/\n/g, '\n<br />')
                        .replace(/  /g, '&nbsp;&nbsp;')
                        .replace('$1', utils.htmlEncode(regexString))
                        .replace('$2', options);

                    controls.outputs.allContainers.$_hide();
                    controls.outputs.split.container.style.display = 'table-row';
                }
                
                controls.regex.$_removeClass('error');
                controls.regexError.$_html('&nbsp;');
            }
            catch (err) {
                controls.regex.$_addClass('error');
                
                var errorMessage = err.message;
                errorMessage = errorMessage.replace('/' + regexString + '/:', '');
                
                controls.regexError.$_text(errorMessage);
            }
        };
        
        var controls = {
            input: $.fromId('inputString'),
            regex: $.fromId('inputRegex'),
            regexError: $.fromId('regexError'),
            method: $.fromId('stringFunction'),
            options: $.fromId('inputRegexOptions'),
            replacement: $.fromId('inputReplacement'),
            exampleCode: $.fromId('exampleCode'),
            outputs: {
                replace: {
                    container: $.query('.outputControl.replace'),
                    result: $.query('.outputControl.replace .resultOutput')
                },
                search: {
                    container: $.query('.outputControl.search'),
                    found: $.query('.outputControl.search .foundResult'),
                    result: $.query('.outputControl.search .searchOutput'),
                    marker: $.query('.outputControl.search .searchMarker'),
                    indexPos: $.query('.outputControl.search .searchIndexPos')
                },
                match: {
                    container: $.query('.outputControl.match'),
                    found: $.query('.outputControl.match .foundResult'),
                    result: $.query('.outputControl.match .resultOutput')
                },
                split: {
                    container: $.query('.outputControl.split'),
                    found: $.query('.outputControl.split .foundResult'),
                    result: $.query('.outputControl.split .resultOutput')
                },
                allContainers: $.queryAll('.outputControl')
            },
            containers: {
                replacement: $.query('.replacementContainer'),
                blank: $.query('.blankContainer')
            }
        };
        
        var codePlaceholders = {
            replace: $.fromId('CodeSampleReplace').$_html(),
            search: $.fromId('CodeSampleSearch').$_html(),
            match: $.fromId('CodeSampleMatch').$_html(),
            split: $.fromId('CodeSampleSplit').$_html()
        };
        
        controls.input.$_on('keyup', executeRegex);
        controls.regex.$_on('keyup', executeRegex);
        controls.options.$_on('change', executeRegex);
        controls.replacement.$_on('keyup', executeRegex);
        
        controls.method.$_on('change', function(e) {
            var method = this.value;
            
            if (method === 'replace') {
                controls.containers.blank.$_hide();
                controls.containers.replacement.$_show(); 
            }
            else if (method === 'match' || method === 'split' || method === 'search') {
                controls.containers.blank.$_show();
                controls.containers.replacement.$_hide(); 
            }
            
            executeRegex();
        });
    });
});
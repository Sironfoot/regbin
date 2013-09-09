define([], function() {

    var global = window;
    
    var resig = {
        
        query: document.querySelector.bind(document),
        queryAll: document.querySelectorAll.bind(document),
        fromId: document.getElementById.bind(document),
        fromClass: document.getElementsByClassName.bind(document),
        fromTag: document.getElementsByTagName.bind(document),
        
        domReady: function(callback) {
        
            if (document.readyState === 'interactive' ||
                document.readyState === 'complete') {
                
                var fakeEvent = {
                    bubbles: false,
                    cancelBubble: false,
                    cancelable: false,
                    currentTarget: null,
                    defaultPrevented: false,
                    eventPhase: 0,
                    returnValue: true,
                    srcElement: document,
                    target: document,
                    timeStamp: new Date().getTime(),
                    type: 'DOMContentLoaded'
                };
                
                callback(fakeEvent);
            }
            else {
                document.addEventListener('DOMContentLoaded', callback, false);
            }
        }
    };
    
    Element.prototype.$_on = function(event, callback) {
        this.addEventListener(event, callback, false);
        return this;
    };
    
    NodeList.prototype.$_on = function(event, callback) {
        for (var i = 0; i < this.length; i++) {
            var element = this[i];
            if (element.$_on) {
                element.$_on(event, callback);
            }
        }
    };
    
    Element.prototype.$_off = function(event, callback) {
        this.removeEventListener(event, callback, false);
        return this;  
    };
    
    Element.prototype.$_addClass = function(className) {
        var classes = (this.className || '').trim().split(' ');
        
        var classNameExists = classes.some(function(item) { 
            return item === className;
        })
        
        if (!classNameExists) {
            classes.push(className);
            
            this.className = classes.join(' ');
        }
        
        return this;
    };
    
    Element.prototype.$_removeClass = function(className) {
        var classes = (this.className || '').trim().split(' ');
        
        var indexOfClass = classes.indexOf(className);
        if (indexOfClass !== -1) {
            classes.splice(indexOfClass, 1);
            this.className = classes.join(' ');
        }
        
        return this;
    };
    
    Element.prototype.$_hasClass = function(className) {
        var classes = (this.className || '').trim().split(' ');
        
        return classes.indexOf(className) !== -1;
    };
    
    Element.prototype.$_hide = function() {
        this.style.display = 'none';
        return this;
    };
    
    NodeList.prototype.$_hide = function() {
        for (var i = 0; i < this.length; i++) {
            var element = this[i];
            if (element.$_hide) {
                element.$_hide();
            }
        }
    }
    
    Element.prototype.$_show = function() {
        this.style.display = 'block';
        return this;
    };
    
    NodeList.prototype.$_show = function() {
        for (var i = 0; i < this.length; i++) {
            var element = this[i];
            if (element.$_show) {
                element.$_show();
            }
        }
    };
    
    Element.prototype.$_text = function(text) {
        if (text === null || typeof text === 'undefined') {
            return this.textContent;
        }
        else {
            this.textContent = text;
            return this;
        }
    };
    
    NodeList.prototype.$_text = function(text) {
        if (text === null || typeof text === 'undefined') {
            var returnText = '';
            
            for (var i = 0; i < this.length; i++) {
                var element = this[i];
                if (element.$_text) {
                    returnText += (' ' + element.$_text());
                }
            }
            
            return returnText;
        }
        else {
            for (var i = 0; i < this.length; i++) {
                var element = this[i];
                if (element.$_text) {
                    element.$_text(text);
                }
            }
            
            return this;
        }
    };
    
    Element.prototype.$_html = function(html) {
        if (html === null || typeof html === 'undefined') {
            return this.innerHTML;
        }
        else {
            this.innerHTML = html;
            return this;
        }
    };
    
    NodeList.prototype.$_html = function(html) {
        if (html === null || typeof html === 'undefined') {
            var returnHtml = '';
            
            for (var i = 0; i < this.length; i++) {
                var element = this[i];
                if (element.$_html) {
                    returnHtml += (' ' + element.$_html());
                }
            }
            
            return returnHtml;
        }
        else {
            for (var i = 0; i < this.length; i++) {
                var element = this[i];
                if (element.$_html) {
                    element.$_html(html);
                }
            }
            
            return this;
        }
    };
    
    

    return resig;
    
});
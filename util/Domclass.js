module.exports = (function() {
    var hasClass = function(el, className) {
        return !!(el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)')));
    };

    var addClass = function(el, className) {
        if (hasClass(el, className)) {
            return;
        }
        el.className += ' ' + className;
    };

    var removeClass = function(el, className) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, '');
    };

    return {
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass
    };
})();

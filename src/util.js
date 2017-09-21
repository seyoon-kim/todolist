
module.exports = Domutil = (function() {

    var _toArray = function(likeArray) {
        var result = [];
        var i = 0;
        var likeArrayLength = likeArray.length;

        for (; i < likeArrayLength; i += 1) {
            result.push(likeArray[i]);
        }

        return result;
    };

    var _indexOf = function(arr, obj) {
        var i = 0;
        var arrLength = arr.length;

        for (; i < arrLength; i += 1) {
            if (arr[i] === obj) {
                return i;
            }
        }

        return -1;
    };

    // getElementsByClassName*() IE 8 이하 버전 호환
    var _getElementsByClassNamePolyfill = function(rootEle, selector) {
        var result = [];
        var allElements;
        var testClassName;
        var i;
        var allElementsLength;

        if (document.getElementsByClassName) {
            return _toArray(rootEle.getElementsByClassName(selector));
        }

        allElements = rootEle.getElementsByTagName('*');
        testClassName = new RegExp(selector);

        i = 0;
        allElementsLength = allElements.length;
        for (; i < allElementsLength; i += 1) {
            if (testClassName.test(allElements[i].className)) {
                result.push(allElements[i]);
            }
        }

        return result;
    };

    /**
     * selector의 앞에 문자열에 따라 id, class, tagName을 구별하여 해당하는 엘리멘트들의 배열을 반환하는 함수
     * @param {object} rootEle 는 이전에 받은 결과값으로서 해당 값으로 다시 다음번째의 selector 값을 이용하여 값을 찾을때 사용한다.
     * @param {string} selectors 검색해야하는 selector 값
     * @returns {array} result 는 해당 selector에 의해 검색되어진 결과값 배열
     */
    var _findElementsOfMatchingSelector = function(rootEle, selectors) {
        var result = [];
        var rMatchedClassName = /^\./g;
        var rMatchedIdName = /^#/g;

        if (rMatchedClassName.test(selectors)) {
            selectors = selectors.replace(rMatchedClassName, '');
            result = _getElementsByClassNamePolyfill(rootEle, selectors);
        } else if (rMatchedIdName.test(selectors)) {
            selectors = selectors.replace(rMatchedIdName, '');
            result = document.getElementById(selectors);
            result = (result === null) ? [] : [result];
        } else {
            result = rootEle.getElementsByTagName(selectors);
            result = _toArray(result);
        }

        return result;
    };

    // from에 있는 요소 중에 중복되어 있는 요소를 제거한 배열을 반환
    var _removeSameElement = function(from) {
        var temp = [];
        var numFrom = 0;
        var fromLength = from.length;

        for (; numFrom < fromLength; numFrom += 1) {
            if (numFrom === 0) {
                temp.push(from[0]);
            } else if (_indexOf(temp, from[numFrom]) > -1) {
                break;
            } else {
                temp.push(from[numFrom]);
            }
        }

        return temp;
    };

    // selector를 만족 시키는 요소들을 담은 배열을 생성하여 반환
    var _makeArrayMatchingToSelctor = function(selectors) {
        var founded = []; // founded, from 중에서 arrSeletor의 원소에 해당하는 결과를 저장하는 값
        var from = [document]; // from, 찾아야 하는 대상이 되는 엘리멘트
        var result = [];
        var arrSeletor;
        var numArrSelector;
        var numFrom;
        var arrSeletorLength;
        var fromLength;

        if (!selectors) {
            return [];
        }

        arrSeletor = selectors.split(/\s+/);
        numArrSelector = 0;
        arrSeletorLength = arrSeletor.length;
        for (; numArrSelector < arrSeletorLength; numArrSelector += 1) {
            numFrom = 0;
            fromLength = from.length;
            for (; numFrom < fromLength; numFrom += 1) {
                founded = founded.concat(_findElementsOfMatchingSelector(from[numFrom], arrSeletor[numArrSelector]));
                //console.log(founded)
            }

            from = founded;
            founded = [];
        }

        result = _removeSameElement(from);

        return result;
    };

    var querySelector = function(selectors) {
        var from = [];
        var result = [];

        from = _makeArrayMatchingToSelctor(selectors);

        if (from.length < 1) {
            result = [];
        } else {
            result.push(from[0]);
        }

        return result;
    };

    var querySelectorAll = function(selectors) {
        var from = [];
        var result = [];

        from = _makeArrayMatchingToSelctor(selectors);

        if (from.length < 1) {
            result = [];
        } else {
            result = from;
        }

        return result;
    };

    return {
        querySelector: querySelector,
        querySelectorAll: querySelectorAll
    };
})();

module.exports = Domclass = (function() {
    var hasClass = function(el, className) {
        var result = el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));

        return !!result;
    };

    var addClass = function(el, className) {
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

// JavaScript for Web Developers 참고
module.exports = Eventutil = (function() {
    var addHandler = function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    };

    var removeHandler = function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    };

    return {
        addHandler: addHandler,
        removeHandler: removeHandler
    };
})();

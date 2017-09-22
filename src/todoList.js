var Domclass = require('../util/Domclass');
var Eventutil = require('../util/Eventutil');
var snippet = require('tui-code-snippet');

//함수 표현식 -> 함수 선언문으로 바꾸기 eslint에서 jsdoc검사때문에

module.exports = (function() {
    var todoObjects = []; // 모든 todoData
    var completeTodoObjects = []; // isChecked가 true인 값
    var incompleteTodoObjects = []; // isChecked가 false인 값

    var TODO_LIST_WRAP_ELEMENT;
    var COMPLETE_LIST_ELEMENT;
    var INCOMPLETE_LIST_ELEMENT;
    var LEFT_ITEM_NUM_ELEMENT;
    var COMPLETE_ITEMS_NUM_ELEMENT;
    var KEY_ENTER;

    var _initConstant = function() {
        TODO_LIST_WRAP_ELEMENT = document.getElementById('todoListWrap');
        COMPLETE_LIST_ELEMENT = document.getElementById('completeList');
        INCOMPLETE_LIST_ELEMENT = document.getElementById('incompleteList');
        LEFT_ITEM_NUM_ELEMENT = document.getElementById('leftItemsNum');
        COMPLETE_ITEMS_NUM_ELEMENT = document.getElementById('completeItemsNum');
        KEY_ENTER = 13;
    };

    var _forEach = function(arr, func) {
        var i = 0;
        var arrLength = arr.length;
        for (; i < arrLength; i += 1) {
            func.call(this, i, arr[i]);
        }
    };

    /**
     * 객체가 등록된 시간을 기준으로 내림차순으로 정렬 하는 함수
     * @param {array} arr 는 정렬하고 싶은 배열
     */
    var _sortRegDateOfTodoObject = function(arr) {
        arr.sort(function(a, b) {
            if (a.regDate < b.regDate) {
                return 1;
            } else if (a.regDate > b.regDate) {
                return -1;
            }

            return 0;
        });
    };

    /**
     * 인자로 받은 데이터 정보를 todoObjects에 담고, isChecked = false인것은 incompleteTodoObjects,
     * isChecked = true인것은 completeTodoObjects 배열에 담은 뒤 오름차순 정렬
     * @param {array} todoData 는 todo 데이터 정보
     */
    var _loadTodoData = function(todoData) {
        todoObjects = todoData;

        completeTodoObjects = snippet.filter(todoObjects, function(value) {
            return value.isChecked;
        });

        _sortRegDateOfTodoObject(completeTodoObjects);

        incompleteTodoObjects = snippet.filter(todoObjects, function(value) {
            return !value.isChecked;
        });

        _sortRegDateOfTodoObject(incompleteTodoObjects);
    };

    var _renderCompleteTodoList = function() {
        var htmlLi = '';
        var todoId, todoTitle;

        _forEach(completeTodoObjects, function(index, value) {
            todoId = value.id;
            todoTitle = value.title;
            htmlLi += '<li class="todo" data-id="' + todoId + '"><input type="checkbox" class="todoChk" checked/><p class="todoTitle">' + todoTitle + '</p></li>';
        });

        COMPLETE_LIST_ELEMENT.innerHTML = htmlLi;
    };

    var _renderIncompleteTodoList = function() {
        var htmlLi = '';
        var todoId, todoTitle;

        _forEach(incompleteTodoObjects, function(index, value) {
            todoId = value.id;
            todoTitle = value.title;
            htmlLi += '<li class="todo" data-id="' + todoId + '"><input type="checkbox" class="todoChk"/><p class="todoTitle">' + todoTitle + '</p></li>';
        });

        INCOMPLETE_LIST_ELEMENT.innerHTML = htmlLi;
    };

    var _renderTodoList = function() {
        _renderCompleteTodoList();
        _renderIncompleteTodoList();
    };

    var _renderInfoList = function() {
        LEFT_ITEM_NUM_ELEMENT.innerText = incompleteTodoObjects.length;
        COMPLETE_ITEMS_NUM_ELEMENT.innerText = completeTodoObjects.length;
    };

    var _renderView = function() {
        _renderTodoList();
        _renderInfoList();
    };

    /**
     * 텍스트박스에서 받은 값을 가지고 새로운 todo 객체를 만들고 todoObjects에 넣어 둔뒤 재 렌더링
     * @param {object} target 는 inputTxt 객체
     */
    var _addTodoObject = function(target) {
        var objTodo = {
            id: 'todo' + snippet.stamp({}),
            title: target.value,
            isChecked: false,
            regDate: snippet.timestamp()
        };
        todoObjects.push(objTodo);
        target.value = '';

        _loadTodoData(todoObjects);
        _renderView();
    };

    var _keypressEvent = function(e) {
        var target, key, targetId;
        e = e || window.event;
        target = e.target || e.srcElement;
        key = e.keyCode;
        targetId = target.getAttribute('id');

        if (!target.value) {
            return;
        }

        if (key === KEY_ENTER && targetId === 'todoInputTxt') {
            _addTodoObject(target);
        }
    };

    /**
     * 해당 todo의 checkbox를 클릭하면 isChecked의 값을 변경한 뒤 재 렌더링
     * @param {string} idTodo 는 todo의 id값
     * @param {object} isCheckedTarget 는 클릭된 checkbox의 isChecked값
     */
    var _toggleTodo = function(idTodo, isCheckedTarget) {
        _forEach(todoObjects, function(index, value) {
            if (value.id === idTodo) {
                value.isChecked = (!!isCheckedTarget);
            }
        });
        _loadTodoData(todoObjects);
        _renderView();
    };

    /**
     * 완료된 모든 todo항목들을 제거 하는 함수
     */
    var _removeComplteList = function() {
        if (completeTodoObjects.length === 0) {
            return;
        }
        completeTodoObjects = [];
        todoObjects = snippet.filter(todoObjects, function(value) {
            return (value.isChecked === false);
        });
        _renderView();
    };

    var _removeClassHideOfList = function() {
        Domclass.removeClass(COMPLETE_LIST_ELEMENT, 'hide');
        Domclass.removeClass(INCOMPLETE_LIST_ELEMENT, 'hide');
    };

    /**
     * filter Button 중에 하나를 클릭하면 해당 동작에 맞게 hide클래스를 추가하여 List의 속성값 display:none으로 변경
     * @param {object} target 는 filter Button 객체 중 하나
     */
    var _clickFilterBtn = function(target) {
        if (target.id === 'btnAllList') {
            _removeClassHideOfList();
        } else if (target.id === 'btnActiveList') {
            _removeClassHideOfList();
            Domclass.addClass(COMPLETE_LIST_ELEMENT, 'hide');
        } else if (target.id === 'btnCompleteList') {
            _removeClassHideOfList();
            Domclass.addClass(INCOMPLETE_LIST_ELEMENT, 'hide');
        }
    };

    var _clickEvent = function(event) {
        var event = event || window.event;
        var target = event.target || event.srcElement;
        var todoElement = target.parentElement;
        var todoId;

        if (target.type === 'checkbox' && Domclass.hasClass(todoElement, 'todo')) {
            todoId = todoElement.getAttribute('data-id');
            _toggleTodo(todoId, target.checked);
        } else if (target.id === 'btnDelCompleteList') {
            _removeComplteList();
        } else if (target.id === 'btnAllList' || target.id === 'btnActiveList' || target.id === 'btnCompleteList') {
            _clickFilterBtn(target);
        }
    };

    var _bindEvent = function() {
        Eventutil.addHandler(TODO_LIST_WRAP_ELEMENT, 'keypress', _keypressEvent);
        Eventutil.addHandler(TODO_LIST_WRAP_ELEMENT, 'click', _clickEvent);
    };

    var init = function(todoData) {
        _initConstant();
        _loadTodoData(todoData);
        _renderView();
        _bindEvent();
    };

    /**
     * @returns {Object}
     */
    function getTodoObjects() {
        return todoObjects;
    }

    return {
        init: init,
        // test에서 사용하기 위해 함수를 노출시켜두었습니다.
        _clickFilterBtn: _clickFilterBtn,
        _removeComplteList: _removeComplteList,
        _toggleTodo: _toggleTodo,
        _addTodoObject: _addTodoObject,
        getTodoObjects: getTodoObjects
    };
})();

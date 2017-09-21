var util = require('./util');
var snippet = require('tui-code-snippet');

module.exports = todoList = (function() {
    var arrTodoObject = []; // 모든 todoData
    var completeTodoObject = []; // isChecked가 true인 값
    var incompleteTodoObject = []; // isChecked가 false인 값

    var _sortRegDate = function(arr) {
        arr.sort(function(a, b) {
            if (a.regDate < b.regDate) {
                return 1;
            } else if (a.regDate > b.regDate) {
                return -1;
            } else {
                return 0;
            }
        });
    }

    var _loadTodoData = function(todoData) {
        arrTodoObject = todoData;

        completeTodoObject = snippet.filter(arrTodoObject, function(value) {
            return (value.isChecked === true);
        });

        _sortRegDate(completeTodoObject);

        incompleteTodoObject = snippet.filter(arrTodoObject, function(value) {
            return (value.isChecked === false);
        });

        _sortRegDate(incompleteTodoObject);
    }

    var _renderView = function() {
        _renderTodoList();
    }

    var _renderTodoList = function() {
        _renderCompleteTodoList();
        _renderIncompleteTodoList();
    }

    var _renderCompleteTodoList = function() {
        var eleHtml = "";
        var todoId;
        var todoTitle;
        var eleCompleteList;

        var i = 0;
        var completeTodoObjectLength = completeTodoObject.length;
        for (; i < completeTodoObjectLength; i += 1) {
            todoId = completeTodoObject[i].id;
            todoTitle = completeTodoObject[i].title;
            eleHtml += '<li class="todo" data-id="'+todoId+'"><input type="checkbox" class="todoChk" checked/><p class="todoTitle">'+todoTitle+'</p></li>';
        }

        eleCompleteList = Domutil.querySelector('.completeList')[0];
        eleCompleteList.innerHTML = eleHtml;
    }

    var _renderIncompleteTodoList = function() {
        var eleHtml = "";
        var todoId;
        var todoTitle;
        var eleIncompleteList;

        var i = 0;
        var incompleteTodoObjectLength = incompleteTodoObject.length;
        for (; i < incompleteTodoObjectLength; i += 1) {
            todoId = incompleteTodoObject[i].id;
            todoTitle = incompleteTodoObject[i].title;
            eleHtml += '<li class="todo" data-id="'+todoId+'"><input type="checkbox" class="todoChk"/><p class="todoTitle">'+todoTitle+'</p></li>';
        }

        eleIncompleteList = Domutil.querySelector('.incompleteList')[0];
        eleIncompleteList.innerHTML = eleHtml;
    }

    // var _renderBottomInfo = function() {
    //
    // }

    var _addArrTodoObject = function(target){
        todoTitle = target.value;
        arrTodoObject.push({
          id : 'todo' + (arrTodoObject.length),
          title : target.value,
          isChecked : false,
          regDate : snippet.timestamp()
        });

        target.value = '';

        _loadTodoData(arrTodoObject);
        _renderView();
    }

    var _addEventKeypress = function(e) {
        var target = e.target;
        var key = e.keyCode;
        var targetId = target.getAttribute('id');

        if (target.value.length === 0) {
            return;
        }
        // todoInputTxt enter 키를 입력한 경우
        if (key === 13 && targetId === 'todoInputTxt') {
            _addArrTodoObject(target);
        }
    }

    // 해당 todo의 checkbox를 클릭하면 isChecked의 값을 변경한 뒤 재 렌더링
    var _toggleTodo = function(idTodo, isCheckedTarget) {
        var i = 0;
        var arrTodoObjectLength = arrTodoObject.length;
        for (; i < arrTodoObjectLength; i += 1) {
            if (arrTodoObject[i].id === idTodo) {
                arrTodoObject[i].isChecked = (!!isCheckedTarget);
                _loadTodoData(arrTodoObject);
                _renderView();
            }
        }
    }

    var _addEventClick = function(e) {
        var target;
        var eleTodo;
        e = e || window.event;
        target = e.target || e.srcElement;
        eleTodo = target.parentElement;

        // todo 안에 checkbox를 클릭한 경우
        if (target.type === 'checkbox' && Domclass.hasClass(eleTodo, 'todo')) {
            var idTodo = eleTodo.getAttribute('data-id');
            _toggleTodo(idTodo, target.checked);
        }
    }

    var _addEvent = function() {
        var eleTodoListWrap = Domutil.querySelector('.todoListWrap')[0];
        Eventutil.addHandler(eleTodoListWrap, 'keypress', _addEventKeypress);
        Eventutil.addHandler(eleTodoListWrap, 'click', _addEventClick);
    }

    var init = function(todoData) {
        _loadTodoData(todoData);
        _renderView();
        _addEvent();
    }


    var getArrTodoObject = function() {
        return arrTodoObject;
    }

    return {
        init : init,


        _toggleTodo : _toggleTodo,
        _addArrTodoObject : _addArrTodoObject,
        getArrTodoObject : getArrTodoObject

    }
})();

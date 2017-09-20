var util = require('./util');
var snippet = require('tui-code-snippet');

module.exports = todoList = (function() {
    var arrTodoObject = []; // 모든 todoData
    var completeTodoObject = []; // isCheck가 true인 값
    var incompleteTodoObject = []; // isCheck가 false인 값


    var _loadTodoData = function(todoData) {
        arrTodoObject = todoData;

        completeTodoObject = snippet.filter(arrTodoObject, function(value) {
            return (value.isCheck === true);
        });

        incompleteTodoObject = snippet.filter(arrTodoObject, function(value) {
            return (value.isCheck === false);
        });
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
          eleHtml += '<li class="todo" data-id="'+todoId+'"><input type="checkbox" class="todoChk"/><p class="todoTitle">'+todoTitle+'</p></li>';
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

    var _renderBottomInfo = function() {
        
    }

    var init = function(todoData) {
        _loadTodoData(todoData);
        _renderView();
    }


    var getArrTodoObject = function() {
        return arrTodoObject;
    }

    return {
        init : init,
        getArrTodoObject : getArrTodoObject
    }
})();

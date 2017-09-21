describe('todoList listArea', function() {
    var data = [
      {
        id : 'todo0',
        title : '제목01',
        isChecked : false,
        regDate : 1000
      },
      {
        id : 'todo1',
        title : '제목02',
        isChecked : true,
        regDate : 2000
      },
      {
        id : 'todo2',
        title : '제목03',
        isChecked : false,
        regDate : 3000
      }
    ];

    beforeEach(function() {
        document.body.innerHTML = '<div class="todoListWrap"><div class="inputArea"><input type="text" class="inputTxt"/></div><div class="listArea"><ul class="incompleteList"></ul><ul class="completeList"></ul></div></div><div class="infoArea"><p class="leftItems"> <span id="leftItemsNum"></span> items left </p><div class="filterArea"><button type="button" name="button">All</button><button type="button" name="button">Active</button><button type="button" name="button">Completed</button></div><button type="button" name="button"><span id="completeItemsNum"></span> Clear completed</button></div>';
        todoList.init(data);
    });

    it ('loadTodoData arrTodoObject 저장확인', function() {
        expect(todoList.getArrTodoObject()).toEqual(data);
    });

    it ('completeList에 해당 엘리멘트가 추가되었는지 확인', function() {
        var eleCompleteList = Domutil.querySelector('.completeList')[0];
        var eleLi = '<li class="todo" data-id="todo1"><input type="checkbox" class="todoChk" checked=""><p class="todoTitle">제목02</p></li>';
        expect(eleCompleteList.innerHTML).toEqual(eleLi);
    });

    it ('incompleteList에 해당 엘리멘트가 추가되었는지 확인', function() {
        var eleIncompleteList = Domutil.querySelector('.incompleteList')[0];
        var eleLi = '<li class="todo" data-id="todo2"><input type="checkbox" class="todoChk"><p class="todoTitle">제목03</p></li><li class="todo" data-id="todo0"><input type="checkbox" class="todoChk"><p class="todoTitle">제목01</p></li>';
        expect(eleIncompleteList.innerHTML).toEqual(eleLi);
    });

    it ('todo에 false값을 가진 checkbox를 클릭한 경우 해당 데이터의 isChecked값이 true로 올바르게 변경되었는가', function() {
        var idTodo = 'todo2';
        var eleIdTodo2 = todoList.getArrTodoObject()[2];
        todoList._toggleTodo(idTodo, true);
        expect(eleIdTodo2.isChecked).toBe(true);
    });

    it ('todo에 false값을 가진 checkbox를 클릭한 경우 completeList에 해당 todo가 추가되는지 확인', function() {
        var eleCompleteList = Domutil.querySelector('.completeList')[0];
        var idTodo = 'todo2';
        var eleIdTodo2 = todoList.getArrTodoObject()[2];
        var eleLis= '<li class="todo" data-id="todo2"><input type="checkbox" class="todoChk" checked=""><p class="todoTitle">제목03</p></li><li class="todo" data-id="todo1"><input type="checkbox" class="todoChk" checked=""><p class="todoTitle">제목02</p></li>';
        todoList._toggleTodo(idTodo, true);
        expect(eleCompleteList.innerHTML).toEqual(eleLis);
    });
});


describe('todoList inputArea', function() {
    beforeEach(function() {
        var data = [
          {
            id : 'todo0',
            title : '제목01',
            isChecked : false,
            regDate : 1000
          },
          {
            id : 'todo1',
            title : '제목02',
            isChecked : true,
            regDate : 2000
          },
          {
            id : 'todo2',
            title : '제목03',
            isChecked : false,
            regDate : 3000
          }
        ];
        document.body.innerHTML = '<div class="todoListWrap"><div class="inputArea"><input type="text" class="inputTxt"/></div><div class="listArea"><ul class="incompleteList"></ul><ul class="completeList"></ul></div></div><div class="infoArea"><p class="leftItems"> <span id="leftItemsNum"></span> items left </p><div class="filterArea"><button type="button" name="button">All</button><button type="button" name="button">Active</button><button type="button" name="button">Completed</button></div><button type="button" name="button"><span id="completeItemsNum"></span> Clear completed</button></div>';
        todoList.init(data);
    });

    it ('inputTxt의 value값이 제대로 저장되었는지확인', function() {
        var eleInputTxt = Domutil.querySelector('.inputTxt')[0];
        var arrTodoObject;
        eleInputTxt.value = 'test text';
        todoList._addArrTodoObject(eleInputTxt);
        arrTodoObject = todoList.getArrTodoObject();
        expect(arrTodoObject[arrTodoObject.length-1].title).toEqual("test text");
    });

    it ('inputTxt에서 엔터를 누르는 경우 incompleteList에 엘리멘트가 첫번째로 추가되었는지 확인', function() {
        var eleInputTxt = Domutil.querySelector('.inputTxt')[0];
        var arrTodoObject;
        var firstEle;
        eleInputTxt.value = 'test text';
        todoList._addArrTodoObject(eleInputTxt);
        firstEle = Domutil.querySelector('.incompleteList')[0].firstChild;
        expect(firstEle.getAttribute('data-id')).toEqual('todo3');
    });
});


describe('todoList infoArea', function() {
    var data = [
      {
        id : 'todo0',
        title : '제목01',
        isChecked : false,
        regDate : 1000
      },
      {
        id : 'todo1',
        title : '제목02',
        isChecked : true,
        regDate : 2000
      },
      {
        id : 'todo2',
        title : '제목03',
        isChecked : false,
        regDate : 3000
      }
    ];

    beforeEach(function() {
        document.body.innerHTML = '<div class="todoListWrap"><div class="inputArea"><input type="text" class="inputTxt"/></div><div class="listArea"><ul class="incompleteList"></ul><ul class="completeList"></ul></div></div><div class="infoArea"><p class="leftItems"> <span id="leftItemsNum"></span> items left </p><div class="filterArea"><button type="button" name="button">All</button><button type="button" name="button">Active</button><button type="button" name="button">Completed</button></div><button type="button" name="button"><span id="completeItemsNum"></span> Clear completed</button></div>';
        todoList.init(data);
    });

    it ('현재 남아있는 완료 전 Todo의 갯수를 출력한다', function() {
        var eleLeftItemsNum = Domutil.querySelector('#leftItemsNum')[0];
        expect(eleLeftItemsNum.innerText).toEqual('2');
    });

    //현재 완료된 Todo의 갯수가 몇개인지 보여주고 버튼을 클릭하면 완료된 todo를 삭제하는 버튼
    it ('현재 완료된 Todo의 갯수가 몇개인지 보여주는 버튼', function() {
        var eleCompleteItemsNum = Domutil.querySelector('#completeItemsNum')[0];
        expect(eleCompleteItemsNum.innerText).toEqual('1');
    });

    it ('현재 완료된 Todo의 갯수가 몇개인지 보여주는 버튼을 누르면 completeList에 있는 모든 li를 삭제한다.', function() {
        var eleCompleteList = Domutil.querySelector('.completeList')[0];
        todoList._removeComplteList();
        expect(eleCompleteList.children.length).toEqual(0);
    });

});

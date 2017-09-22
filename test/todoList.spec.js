var Domutil = require('../util/Domutil');
var Domclass = require('../util/Domclass');
var todoList = require('../src/todoList');

describe('todoList listArea', function() {
    var data = [
        {
            id: 'todo0',
            title: '제목01',
            isChecked: false,
            regDate: 1000
        },
        {
            id: 'todo1',
            title: '제목02',
            isChecked: true,
            regDate: 2000
        },
        {
            id: 'todo2',
            title: '제목03',
            isChecked: false,
            regDate: 3000
        }
    ];

    beforeEach(function() {
        document.body.innerHTML = '<div class="todoListWrap" id="todoListWrap"><div class="inputArea"><input type="text" class="inputTxt"/></div><div class="listArea"><ul class="incompleteList" id="incompleteList"></ul><ul class="completeList" id="completeList"></ul></div></div><div class="infoArea"><p class="leftItems"> <span id="leftItemsNum"></span> items left </p><div class="filterArea"><button type="button" name="button" id="btnAllList">All</button><button type="button" name="button" id="btnActiveList">Active</button><button type="button" name="button" id="btnCompleteList">Completed</button></div><button type="button" name="button" id="btnDelCompleteList"><span id="completeItemsNum"></span> Clear completed</button></div>';
        todoList.init(data);
    });

    it('loadTodoData todoObjects 저장확인', function() {
        expect(todoList.getTodoObjects()).toEqual(data);
    });

    it('completeList에 해당 엘리멘트가 추가되었는지 확인', function() {
        var completeListElement = Domutil.querySelector('.completeList');
        var eleLi = '<li class="todo" data-id="todo1"><input type="checkbox" class="todoChk" checked=""><p class="todoTitle">제목02</p></li>';
        expect(completeListElement.innerHTML).toEqual(eleLi);
    });

    it('incompleteList에 해당 엘리멘트가 추가되었는지 확인', function() {
        var incompleteListElement = Domutil.querySelector('.incompleteList');
        var eleLi = '<li class="todo" data-id="todo2"><input type="checkbox" class="todoChk"><p class="todoTitle">제목03</p></li><li class="todo" data-id="todo0"><input type="checkbox" class="todoChk"><p class="todoTitle">제목01</p></li>';
        expect(incompleteListElement.innerHTML).toEqual(eleLi);
    });

    it('todo에 false값을 가진 checkbox를 클릭한 경우 해당 데이터의 isChecked값이 true로 올바르게 변경되었는가', function() {
        var idTodo = 'todo2';
        var eleIdTodo2 = todoList.getTodoObjects()[2];
        todoList._toggleTodo(idTodo, true);
        expect(eleIdTodo2.isChecked).toBe(true);
    });

    it('todo에 false값을 가진 checkbox를 클릭한 경우 completeList에 해당 todo가 추가되는지 확인', function() {
        var completeListElement = Domutil.querySelector('.completeList');
        var idTodo = 'todo2';
        var eleLis = '<li class="todo" data-id="todo2"><input type="checkbox" class="todoChk" checked=""><p class="todoTitle">제목03</p></li><li class="todo" data-id="todo1"><input type="checkbox" class="todoChk" checked=""><p class="todoTitle">제목02</p></li>';
        todoList._toggleTodo(idTodo, true);
        expect(completeListElement.innerHTML).toEqual(eleLis);
    });
});

describe('todoList inputArea', function() {
    beforeEach(function() {
        var data = [
            {
                id: 'todo0',
                title: '제목01',
                isChecked: false,
                regDate: 1000
            },
            {
                id: 'todo1',
                title: '제목02',
                isChecked: true,
                regDate: 2000
            },
            {
                id: 'todo2',
                title: '제목03',
                isChecked: false,
                regDate: 3000
            }
        ];
        var eleInputTxt;

        document.body.innerHTML = '<div class="todoListWrap" id="todoListWrap"><div class="inputArea"><input type="text" class="inputTxt"/></div><div class="listArea"><ul class="incompleteList" id="incompleteList"></ul><ul class="completeList" id="completeList"></ul></div></div><div class="infoArea"><p class="leftItems"> <span id="leftItemsNum"></span> items left </p><div class="filterArea"><button type="button" name="button" id="btnAllList">All</button><button type="button" name="button" id="btnActiveList">Active</button><button type="button" name="button" id="btnCompleteList">Completed</button></div><button type="button" name="button" id="btnDelCompleteList"><span id="completeItemsNum"></span> Clear completed</button></div>';
        todoList.init(data);
        eleInputTxt = Domutil.querySelector('.inputTxt');
        eleInputTxt.value = 'test text';
        todoList._addTodoObject(eleInputTxt);
    });

    it('inputTxt의 value값이 제대로 저장되었는지확인', function() {
        var todoObjects = todoList.getTodoObjects();
        expect(todoObjects[todoObjects.length - 1].title).toEqual('test text');
    });

    it('inputTxt에서 엔터를 누르는 경우 incompleteList에 엘리멘트가 추가되었는지 확인', function() {
        var incompleteListElementLength = Domutil.querySelector('.incompleteList').children.length;
        expect(incompleteListElementLength).toEqual(3);
    });
});

describe('todoList infoArea', function() {
    var data = [
        {
            id: 'todo0',
            title: '제목01',
            isChecked: false,
            regDate: 1000
        },
        {
            id: 'todo1',
            title: '제목02',
            isChecked: true,
            regDate: 2000
        },
        {
            id: 'todo2',
            title: '제목03',
            isChecked: false,
            regDate: 3000
        }
    ];

    beforeEach(function() {
        document.body.innerHTML = '<div class="todoListWrap" id="todoListWrap"><div class="inputArea"><input type="text" class="inputTxt"/></div><div class="listArea"><ul class="incompleteList" id="incompleteList"></ul><ul class="completeList" id="completeList"></ul></div></div><div class="infoArea"><p class="leftItems"> <span id="leftItemsNum"></span> items left </p><div class="filterArea"><button type="button" name="button" id="btnAllList">All</button><button type="button" name="button" id="btnActiveList">Active</button><button type="button" name="button" id="btnCompleteList">Completed</button></div><button type="button" name="button" id="btnDelCompleteList"><span id="completeItemsNum"></span> Clear completed</button></div>';
        todoList.init(data);
    });

    it('현재 남아있는 완료 전 Todo의 갯수를 출력한다', function() {
        var eleLeftItemsNum = Domutil.querySelector('#leftItemsNum');
        expect(eleLeftItemsNum.innerText).toEqual('2');
    });

    it('현재 완료된 Todo의 갯수가 몇개인지 보여주는 버튼', function() {
        var completeItemsNumElement = Domutil.querySelector('#completeItemsNum');
        expect(completeItemsNumElement.innerText).toEqual('1');
    });

    it('현재 완료된 Todo의 갯수가 몇개인지 보여주는 버튼을 누르면 completeList에 있는 모든 li를 삭제한다.', function() {
        var completeListElement = Domutil.querySelector('.completeList');
        todoList._removeComplteList();
        expect(completeListElement.children.length).toEqual(0);
    });

    it('btnAllList을 누른 경우 completeList, incompleteList는 hide 클래스를 갖지 않는다', function() {
        var btnAllListElement = Domutil.querySelector('#btnAllList');
        var completeListElement = Domutil.querySelector('.completeList');
        var incompleteListElement = Domutil.querySelector('.incompleteList');
        todoList._clickFilterBtn(btnAllListElement);
        expect(Domclass.hasClass(completeListElement, 'hide')).toBe(false);
        expect(Domclass.hasClass(incompleteListElement, 'hide')).toBe(false);
    });

    it('btnActiveList을 누른 경우 completeList hide 클래스를 안 갖는다. incompleteList는 hide 클래스를 갖는다', function() {
        var btnActiveListElement = Domutil.querySelector('#btnActiveList');
        var completeListElement = Domutil.querySelector('.completeList');
        var incompleteListElement = Domutil.querySelector('.incompleteList');
        todoList._clickFilterBtn(btnActiveListElement);
        expect(Domclass.hasClass(completeListElement, 'hide')).toBe(true);
        expect(Domclass.hasClass(incompleteListElement, 'hide')).toBe(false);
    });

    it('btnCompleteList을 누른 경우 completeList hide 클래스를 갖는다. incompleteList는 hide 클래스를 안 갖는다', function() {
        var btnCompleteListElement = Domutil.querySelector('#btnCompleteList');
        var completeListElement = Domutil.querySelector('.completeList');
        var incompleteListElement = Domutil.querySelector('.incompleteList');
        todoList._clickFilterBtn(btnCompleteListElement);
        expect(Domclass.hasClass(completeListElement, 'hide')).toBe(false);
        expect(Domclass.hasClass(incompleteListElement, 'hide')).toBe(true);
    });
});

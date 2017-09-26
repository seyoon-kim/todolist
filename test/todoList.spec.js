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
        jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
        loadFixtures('todoList.html');
        todoList.init(data);
    });

    it('loadTodoData todoObjects 저장확인', function() {
        expect(todoList.getTodoObjects()).toEqual(data);
    });

    it('completeList에 해당 엘리멘트가 추가되었는지 확인', function() {
        var completeListElement = document.getElementById('completeList');
        expect(completeListElement.firstChild.getAttribute('data-id')).toEqual('todo1');
    });

    it('incompleteList에 해당 엘리멘트가 추가되었는지 확인', function() {
        var incompleteListElement = document.getElementById('incompleteList');
        expect(incompleteListElement.children[0].getAttribute('data-id')).toEqual('todo2');
        expect(incompleteListElement.children[1].getAttribute('data-id')).toEqual('todo0');
    });

    it('todo에 false값을 가진 checkbox를 클릭한 경우 해당 데이터의 isChecked값이 true로 올바르게 변경되었는가', function() {
        var idTodo = 'todo2';
        var eleIdTodo2 = todoList.getTodoObjects()[2];
        todoList._toggleTodo(idTodo, true);
        expect(eleIdTodo2.isChecked).toBe(true);
    });

    it('todo에 false값을 가진 checkbox를 클릭한 경우 completeList에 해당 todo가 추가되는지 확인', function() {
        var completeListElement = document.getElementById('completeList');
        var idTodo = 'todo2';
        todoList._toggleTodo(idTodo, true);
        expect(completeListElement.firstChild.getAttribute('data-id')).toEqual('todo2');
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
        jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
        loadFixtures('todoList.html');
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
        jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
        loadFixtures('todoList.html');
        todoList.init(data);
    });

    it('현재 남아있는 완료 전 Todo의 갯수를 출력한다', function() {
        var eleLeftItemsNum = document.getElementById('leftItemsNum');
        expect(eleLeftItemsNum.innerText).toEqual('2');
    });

    it('현재 완료된 Todo의 갯수가 몇개인지 보여주는 버튼', function() {
        var completeItemsNumElement = document.getElementById('completeItemsNum');
        expect(completeItemsNumElement.innerText).toEqual('1');
    });

    it('현재 완료된 Todo의 갯수가 몇개인지 보여주는 버튼을 누르면 completeList에 있는 모든 li를 삭제한다.', function() {
        var completeListElement = document.getElementById('completeList');
        todoList._removeComplteList();
        expect(completeListElement.children.length).toEqual(0);
    });

    it('btnAllList을 누른 경우 completeList, incompleteList는 hide 클래스를 갖지 않는다', function() {
        var btnAllListElement = document.getElementById('btnAllList');
        var completeListElement = document.getElementById('completeList');
        var incompleteListElement = document.getElementById('incompleteList');
        todoList._clickFilterBtn(btnAllListElement);
        expect(Domclass.hasClass(completeListElement, 'hide')).toBe(false);
        expect(Domclass.hasClass(incompleteListElement, 'hide')).toBe(false);
    });

    it('btnActiveList을 누른 경우 completeList hide 클래스를 안 갖는다. incompleteList는 hide 클래스를 갖는다', function() {
        var btnActiveListElement = document.getElementById('btnActiveList');
        var completeListElement = document.getElementById('completeList');
        var incompleteListElement = document.getElementById('incompleteList');
        todoList._clickFilterBtn(btnActiveListElement);
        expect(Domclass.hasClass(completeListElement, 'hide')).toBe(true);
        expect(Domclass.hasClass(incompleteListElement, 'hide')).toBe(false);
    });

    it('btnCompleteList을 누른 경우 completeList hide 클래스를 갖는다. incompleteList는 hide 클래스를 안 갖는다', function() {
        var btnCompleteListElement = document.getElementById('btnCompleteList');
        var completeListElement = document.getElementById('completeList');
        var incompleteListElement = document.getElementById('incompleteList');
        todoList._clickFilterBtn(btnCompleteListElement);
        expect(Domclass.hasClass(completeListElement, 'hide')).toBe(false);
        expect(Domclass.hasClass(incompleteListElement, 'hide')).toBe(true);
    });
});

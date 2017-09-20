var data = [
  {
    id : 'todo0',
    title : '제목01',
    isCheck : false
  },
  {
    id : 'todo1',
    title : '제목02',
    isCheck : true
  },
  {
    id : 'todo2',
    title : '제목03',
    isCheck : false
  }
];

describe('todoList', function() {
    document.body.innerHTML = '<div class="listArea"><ul class="completeList"></ul><ul class="completeList"></ul><ul class="incompleteList"></ul><ul class="completeList"></ul></div>';
    todoList.init(data);

    it ('loadTodoData arrTodoObject 저장확인', function() {
        expect(todoList.getArrTodoObject()).toEqual(data);
    });

    it ('compleList에 해당 엘리멘트가 추가되었는지 확인', function() {
        var eleCompleteList = Domutil.querySelector('.completeList')[0];
        var eleLi = '<li class="todo" data-id="todo1"><input type="checkbox" class="todoChk"><p class="todoTitle">제목02</p></li>';
        expect(eleCompleteList.innerHTML).toEqual(eleLi);
    });

    it ('incompleList에 해당 엘리멘트가 추가되었는지 확인', function() {
        var eleIncompleteList = Domutil.querySelector('.incompleteList')[0];
        var eleLi = '<li class="todo" data-id="todo0"><input type="checkbox" class="todoChk"><p class="todoTitle">제목01</p></li><li class="todo" data-id="todo2"><input type="checkbox" class="todoChk"><p class="todoTitle">제목03</p></li>';
        expect(eleIncompleteList.innerHTML).toEqual(eleLi);
    });
});

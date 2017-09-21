var util = require('./util');
var todoList = require('./todoList');
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
todoList.init(data);

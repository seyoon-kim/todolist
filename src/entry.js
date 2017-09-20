var util = require('./util');
var todoList = require('./todoList');
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
todoList.init(data);

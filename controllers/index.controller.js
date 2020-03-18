var db = require('../db');
const shortid = require('shortid');

module.exports.index = function(req, res) {
  res.render('index', {
    todos: db.get('todos').value(),
  });
};
module.exports.create = function(req, res) {
  req.body.id = shortid.generate();
  req.body.done = 'Đang làm';
  db.get('todos')
    .push(req.body)
    .write();
  res.redirect('/');
};
module.exports.delete = function(req, res) {
  var idDel = req.params.id;
  todoDel = db.get('todos').findIndex({ id: idDel });
  db.get('todos')
    .splice(todoDel, 1)
    .write();
  res.redirect('/');
};

module.exports.getEdit = function(req, res) {
  var matchedTodo = db
    .get('todos')
    .value()
    .filter(todo => {
      return todo.id.indexOf(req.params.id) !== -1;
    });
  res.render('edit', {
    todos: matchedTodo,
  });
};
module.exports.postEdit = function(req, res) {
  var idEdit = req.params.id;
  var index = db.get('todos').findIndex({ id: idEdit });
  console.log(req.body.todo);
  obEdit = db
    .get('todos')
    .find({ id: idEdit })
    .value();
  obEdit.name = req.body.nameTodo;
  db.get('todos')
    .fill(obEdit, index, index + 1)
    .write();
  res.redirect('/');
};
module.exports.postDone = function(req, res) {
  var idEdit = req.params.id;
  var index = db.get('todos').findIndex({ id: idEdit });
  obEdit = db
    .get('todos')
    .find({ id: idEdit })
    .value();
  if (obEdit.done === 'Đang làm') {
    obEdit.done = 'Hoàn thành';
  } else {
    obEdit.done = 'Đang làm';
  }
  db.get('todos')
    .fill(obEdit, index, index + 1)
    .write();
  res.redirect('/');
};

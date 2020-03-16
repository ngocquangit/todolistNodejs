var db = require('../db');
const shortid = require('shortid');
module.exports.index = function(req, res) {
  res.render('index', {
    todos: db.get('todos').value(),
  });
};
module.exports.create = function(req, res) {
  req.body.id = shortid.generate();
  req.body.done = false;
  db.get('todos')
    .push(req.body)
    .write();
  res.redirect('/');
};
module.exports.delete = function(req, res) {
  var id = req.params.id;
  var todo = db.get('todos').find({ id: id });
  console.log(todo);
  // res.redirect('/');
  res.render('index', {
    todos: db.get('todos').value(),
  });
};

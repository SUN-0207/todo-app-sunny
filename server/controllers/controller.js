const todoModel = require("../models/Todo");

module.exports.addTodo = async (req, res) => {
  const todo = req.body;
  const dbTodo = new todoModel({
    id: todo.id,
    text: todo.text,
    completed: todo.completed,
    day: todo.day,
  });
  dbTodo.save();
  console.log("Successfully");
};

module.exports.getTodo = async (req, res, next) => {
  const todos = await todoModel.find({});
  res.send(todos);
};

module.exports.deleteTodo = async (req, res) => {
  todoModel.findOneAndDelete({ id: req.body.identify }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted Todo : ", docs);
    }
  });
};

module.exports.updateTodo = async (req, res) => {
  const tempTodo = req.body;
  todoModel.findOneAndUpdate(
    { id: tempTodo.identify },
    { $set: { completed: tempTodo.checked } },
    { new: true },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Todo : ", docs);
      }
    }
  );
};

module.exports.deleteCompletedTodo = async (req, res) => {
  todoModel.deleteMany({ completed: true }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted todo : ", docs);
    }
  });
};

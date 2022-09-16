const todoModel = require("../models/Todo");

module.exports.addTodo = async (req, res) => {
  const user_id = req.user._id;
  todoModel.create({ ...req.body, user_id }, (error, data, next) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
};

module.exports.getTodo = async (req, res) => {
  const user_id = req.user._id;
  todoModel.find({ user_id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

module.exports.deleteTodo = async (req, res) => {
  todoModel.findOneAndDelete({ _id: req.params.id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted Todo : ", docs);
      res.json(docs);
    }
  });
};

module.exports.checkedTodo = async (req, res) => {
  todoModel.findOneAndUpdate(
    { _id: req.body.params.id },
    { $set: { completed: req.body.params.checked } },
    { new: true },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.json(docs);
        console.log("Todo Updated Completed: ", docs);
      }
    }
  );
};

module.exports.deleteCompletedTodo = async (req, res) => {
  const user_id = req.user._id;
  todoModel.deleteMany({ completed: true, user_id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted todo : ", docs);
      res.json(docs);
    }
  });
};

module.exports.updatedTodo = async (req, res) => {
  todoModel.findOneAndUpdate(
    { _id: req.body.params.id },
    { $set: { text: req.body.params.text } },
    { new: true },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.json(docs);
        console.log("Todo Updated Text: ", docs);
      }
    }
  );
};

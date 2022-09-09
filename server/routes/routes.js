const express = require("express");
const todoController = require("../controllers/controller");
const router = express.Router();

router.post("/", todoController.addTodo);
router.get("/get-todo", todoController.getTodo);
router.delete("/delete-todo", todoController.deleteTodo);
router.put("/update-todo", todoController.updateTodo);
router.delete("/delete-completed-todo", todoController.deleteCompletedTodo);

module.exports = router;

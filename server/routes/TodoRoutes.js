const express = require("express");
const todoController = require("../controllers/todoController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth);

router.post("/", todoController.addTodo);
router.get("/", todoController.getTodo);
router.delete("/:id", todoController.deleteTodo);
router.put("/:id", todoController.checkedTodo);
router.delete("/", todoController.deleteCompletedTodo);
router.put("/updated/:id", todoController.updatedTodo);

module.exports = router;

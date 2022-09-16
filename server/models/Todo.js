const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    id: {
      type: "string",
      required: true,
    },
    text: {
      type: "string",
      required: true,
    },
    completed: {
      type: "boolean",
      required: true,
    },
    day: {
      type: "string",
      require: true,
    },
    user_id: {
      type: "string",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("todos", todoSchema);

import React, { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as genUUID4 } from "uuid";
import { useTodosContext } from "../../hook/useTodosContext";
import { useAuthContext } from "../../hook/useAuthContext";

import "./TodoInput.css";
import "animate.css";
import moment from "moment";

const axios = require("axios");

const TodoInput = () => {
  const [currentText, setCurrentText] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuthContext();

  const { dispatch } = useTodosContext();

  const newTodo = useMemo(() => {
    return {
      id: genUUID4(),
      text: currentText,
      completed: false,
      day: moment(startDate).format("L"),
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const createTodo = newTodo;
    await axios
      .post("/api/todos", createTodo, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
    dispatch({ type: "ADD_TODO", todo: createTodo });
    setCurrentText("");
  };

  const handleChange = (e) => {
    setCurrentText(e.target.value);
  };

  return (
    <div className={"container-todo-form"}>
      <form onSubmit={handleSubmit}>
        <div className="container-input">
          <input
            className="container-input-task"
            placeholder="Task ?"
            value={currentText}
            onChange={handleChange}
            autofocus
          ></input>
          <DatePicker
            className="date-picker"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <button
          className="container-button"
          disabled={currentText.length > 0 ? "" : "true"}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default TodoInput;

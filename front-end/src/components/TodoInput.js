import React, { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as genUUID4 } from "uuid";

import "./TodoInput.css";
import "animate.css";
import moment from "moment";

const TodoInput = (props) => {
  const [currentText, setCurrentText] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const newTodo = useMemo(() => {
    return {
      id: genUUID4(),
      text: currentText,
      completed: false,
      day: moment(startDate).format("L"),
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleAddTodo(newTodo);
    setCurrentText("");
  };

  const handleChange = (e) => {
    setCurrentText(e.target.value);
  };

  return (
    <div className="container-todo-form">
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

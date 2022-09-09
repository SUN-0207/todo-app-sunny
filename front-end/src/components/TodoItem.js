import React, { useState } from "react";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import "./TodoItem.css";

const TodoItem = (props) => {
  const [currentText, setCurrentText] = useState("");

  const handleChange = (e) => {
    setCurrentText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.todo.text = currentText;
    setCurrentText("");
  };

  return (
    <div className="item-container">
      <div className="item-infor">
        <input
          className="item-check"
          type="checkbox"
          value={props.todo.completed}
          onChange={() =>
            props.handleTodoChecked(props.todo.id, !props.todo.completed)
          }
        />
        <label className="item-text">{props.todo.text}</label>
        <label className="item-day">{props.todo.day}</label>
      </div>
      <div className="item-icon">
        <Popup
          trigger={
            <div className="icon-pen">
              <FontAwesomeIcon icon={faPen} />
            </div>
          }
          position="left"
          nested
        >
          {(close) => (
            <div className="modal-container">
              <div className="modal-input">
                <input value={currentText} onChange={handleChange} />
              </div>
              <div className="modal-button">
                <button onClick={handleSubmit}>Modify</button>
                <button onClick={() => close()}>Cancel</button>
              </div>
            </div>
          )}
        </Popup>
        <div
          className="icon-trash"
          onClick={() => props.handleRemoveTodo(props.todo.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;

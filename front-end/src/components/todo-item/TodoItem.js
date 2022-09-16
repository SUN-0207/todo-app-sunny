import React, { useState } from "react";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import "./TodoItem.css";
import { useTodosContext } from "../../hook/useTodosContext";
import { useAuthContext } from "../../hook/useAuthContext";

const axios = require("axios");

const TodoItem = (props) => {
  const { dispatch } = useTodosContext();
  const [currentText, setCurrentText] = useState("");
  const { user } = useAuthContext();

  const handleChange = (e) => {
    setCurrentText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(
        "/api/todos/updated/" + props.todo._id,
        {
          params: { id: props.todo._id, text: currentText },
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    props.todo.text = currentText;
    setCurrentText("");
  };

  const handleRemoveTodo = async () => {
    await axios
      .delete(
        "/api/todos/" + props.todo._id,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
        {
          params: { id: props.todo._id },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    dispatch({ type: "REMOVE_TODO", id: props.todo.id });
  };

  const handleCheckedTodo = async () => {
    await axios
      .put(
        "/api/todos/" + props.todo._id,
        {
          params: {
            id: props.todo._id,
            checked: !props.todo.completed,
          },
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    dispatch({
      type: "CHECKED_TODO",
      id: props.todo.id,
      checked: !props.todo.completed,
    });
  };

  return (
    <div className="item-container">
      <div className="item-infor">
        <input
          className="item-check"
          type="checkbox"
          value={props.todo.completed}
          onChange={() => handleCheckedTodo()}
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
        <div className="icon-trash" onClick={() => handleRemoveTodo()}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;

import React from "react";

import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = (props) => {
  return (
    <div className="list-container">
      {props.todos.length === 0 && <h1>List Empty!!!</h1>}
      {props.todos.filter((todo) => todo.completed).length > 0 && (
        <button onClick={() => props.handleRemoveCompletedTodo()}>
          Remove Completed Task!!
        </button>
      )}
      {props.todos.length > 0 &&
        props.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleTodoChecked={props.handleTodoChecked}
            handleRemoveTodo={props.handleRemoveTodo}
          />
        ))}
    </div>
  );
};

export default TodoList;

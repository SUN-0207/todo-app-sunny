import React from "react";

import TodoInput from "../components/todo-input/TodoInput";
import TodoList from "../components/todo-list/TodoList";

function HomePage() {
  return (
    <div>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default HomePage;

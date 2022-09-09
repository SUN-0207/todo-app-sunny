import React, { useState, useEffect } from "react";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Header from "./components/Header";

function App() {
  const [todos, setTodos] = useState([]);
  // const [preventEmptySave, setPreventEmptySave] = useState(true);

  // useEffect(() => {
  //   if (todos.length < 1 && preventEmptySave) {
  //     return;
  //   }
  //   setPreventEmptySave(true);
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  // useEffect(() => {
  //   const todos = JSON.parse(localStorage.getItem("todos"));
  //   if (todos) {
  //     setTodos(todos);
  //   }
  // }, []);

  useEffect(() => {
    fetch("/get-todo")
      .then((res) => res.json())
      .then((todos) => setTodos(todos));
  }, []);

  const handleAddTodo = (todo) => {
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((response) => console.log("Success:", JSON.stringify(response)))
      .catch((error) => console.error("Error:", error));
    setTodos((preTodos) => [todo, ...preTodos]);
  };

  const handleTodoChecked = (id, check) => {
    const temp = {
      identify: id,
      checked: check,
    };

    fetch("/update-todo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(temp),
    })
      .then((res) => console.log(res.status))
      .catch((error) => console.error("Error: ", error));

    setTodos((prevTodo) =>
      prevTodo.map((todo) => {
        if (todo.id === id) {
          todo.completed = check;
        }
        return todo;
      })
    );
  };

  const handleRemoveTodo = (id) => {
    const ID = {
      identify: id,
    };
    fetch("/delete-todo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ID),
    }).then((res) => console.log(res.status));
    // setPreventEmptySave(false);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleRemoveCompletedTodo = () => {
    // setPreventEmptySave(false);
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    fetch("/delete-completed-todo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hi: "hello" }),
    }).then((res) => console.log(res.status));
  };

  return (
    <div>
      <Header />
      <TodoInput handleAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        handleTodoChecked={handleTodoChecked}
        handleRemoveTodo={handleRemoveTodo}
        handleRemoveCompletedTodo={handleRemoveCompletedTodo}
      />
    </div>
  );
}

export default App;

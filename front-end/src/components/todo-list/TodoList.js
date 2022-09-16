import React, { useEffect, useState } from "react";

import TodoItem from "../todo-item/TodoItem";
import "./TodoList.css";
import { useTodosContext } from "../../hook/useTodosContext";
import { useAuthContext } from "../../hook/useAuthContext";
import ReactLoading from "react-loading";

const axios = require("axios");

const TodoList = () => {
  const { state, dispatch } = useTodosContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  const handleRemoveCompletedTodo = async () => {
    await axios
      .delete("/api/todos", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    dispatch({ type: "REMOVE_COMPLETED_TODO" });
  };

  useEffect(() => {
    async function fetchData() {
      if (user) {
        await axios
          .get("/api/todos", {
            headers: { Authorization: `Bearer ${user.token}` },
          })
          .then((res) => {
            setLoading(false);
            dispatch({
              type: "SET_TODO",
              todo: res.data,
            });
          })
          .catch((err) => console.log(err));
      }
    }
    setTimeout(() => fetchData(), 1500);
  }, [user, dispatch]);

  return (
    <div className="list-container">
      {state.length === 0 && <h1>List Empty!!!</h1>}
      {loading && (
        <ReactLoading type="spin" color="gray" height={50} width={50} />
      )}
      {state.filter((todo) => todo.completed).length > 0 && (
        <button onClick={() => handleRemoveCompletedTodo()}>
          Remove Completed Task!!
        </button>
      )}
      {state.length > 0 &&
        state.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
};

export default TodoList;

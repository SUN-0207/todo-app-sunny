import React, { createContext, useReducer } from "react";

const initialTodos = [];

export const TodosContext = createContext();

export const todosReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODO":
      return action.todo;
    case "ADD_TODO":
      return [...state, action.todo];
    case "CHECKED_TODO":
      return state.map((todo) => {
        if (todo.id === action.id) {
          todo.completed = action.checked;
        }
        return todo;
      });
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    case "REMOVE_COMPLETED_TODO":
      return state.filter((todo) => !todo.completed);
    default:
      return state;
  }
};

export const TodosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, initialTodos);
  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

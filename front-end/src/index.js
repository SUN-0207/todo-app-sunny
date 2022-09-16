import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { TodosContextProvider } from "./context/TodoContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TodosContextProvider>
        <App />
      </TodosContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

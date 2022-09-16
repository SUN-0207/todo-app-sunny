import React from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Header from "../src/components/header/Header";
import { useAuthContext } from "./hook/useAuthContext";

const App = () => {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Header />
      <div className="pages">
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

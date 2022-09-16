import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { useLogout } from "../../hook/useLogout";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hook/useAuthContext.js";

import "./Header.css";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="header-wrapper">
      <div className="header-title">
        <h1>Todo App By Sunny</h1>
        <FontAwesomeIcon className="icon-sun" icon={faSun} />
      </div>
      {user && (
        <div className="header-user-wrapper">
          <p>
            <span>Chao Xin</span> {user.email}
          </p>
          <button className="header-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      {!user && (
        <div className="header-button-wrapper">
          <Link to="/login">
            <button className="header-button">Login</button>
          </Link>
          <Link to="/register">
            <button className="header-button">Register</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

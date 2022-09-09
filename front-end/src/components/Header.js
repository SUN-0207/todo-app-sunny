import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";

import "./Header.css";

const Header = () => {
  return (
    <div className="header-wrapper">
      <h1>Todo App By Sunny</h1>
      <FontAwesomeIcon className="icon-sun" icon={faSun} />
    </div>
  );
};

export default Header;

import React, { useState } from "react";
import { useLogin } from "../../hook/useLogin";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-wrapper">
      <div className="login-wrapper__left-content">
        <div className="login-wrapper__left-content__image">
          <img
            src={require("../../assets/images/header-image.png")}
            alt="Person"
          />
        </div>
      </div>
      <div className="login-wrapper__right-content">
        <div className="login-wrapper__right-content__form-wrapper">
          <h1>Login</h1>
          <form
            className="login-wrapper__right-content__form"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="User Name"
              />
            </div>
            <div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>
            <button>Submit</button>
            {error && (
              <div className="login-wrapper__right-content__form__error">
                {Error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

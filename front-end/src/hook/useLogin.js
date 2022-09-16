import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
const axios = require("axios");

export const useLogin = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);

    await axios
      .post("/api/users/login", { email, password })
      .then((res) => {
        console.log(res.statusText);
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({ type: "LOGIN", user: res.data });
      })
      .catch((err) => setError(err.response.data.error));
  };

  return { error, login };
};

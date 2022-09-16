import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
const axios = require("axios");

export const useRegister = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (email, password) => {
    setError(null);

    await axios
      .post("/api/users/register", { email, password })
      .then((res) => {
        console.log(res.statusText);
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({ type: "LOGIN", user: res.data });
      })
      .catch((err) => setError(err.response.data.error));
  };

  return { error, register };
};

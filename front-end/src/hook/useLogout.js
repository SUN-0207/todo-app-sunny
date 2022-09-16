import { useAuthContext } from "./useAuthContext";
import { useTodosContext } from "./useTodosContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const todosContex = useTodosContext();

  const logout = () => {
    // remove user from storage
    todosContex.dispatch({ type: "SET_TODO", todo: [] });
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};

import { createContext, useContext, useReducer } from "react";

const initialState = {
  user: null,
  isAuthenticated: false,
};
const FAKE_USER = {
  email: "a@gmail.com",
  password: "1234",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return { ...initialState };

    default:
      throw new Error("Unknown Action");
  }
}

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: email });
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };

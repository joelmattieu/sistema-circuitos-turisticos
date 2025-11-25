import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  login: (userData) => {},
  register: (userData) => {},
  logout: () => {},
});

export default AuthContext;

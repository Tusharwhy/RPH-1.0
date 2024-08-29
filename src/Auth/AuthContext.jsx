import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const hardcodedAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  const accessToken = sessionStorage.getItem("accessToken");
  const [isAuthenticated, setIsAuthenticated] = useState(
    accessToken ? true : false
  );
  console.log(isAuthenticated);

  // useEffect(() => {
  //   const accessToken = sessionStorage.getItem('accessToken');
  //   setIsAuthenticated(!!accessToken);
  // }, []);

  const login = (response) => {
    if (response) {
      sessionStorage.setItem("accessToken", hardcodedAccessToken);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

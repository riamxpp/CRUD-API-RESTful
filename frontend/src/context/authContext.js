import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [token, setToken] = useState();

  const login = (data) => {
    setName(data.name);
    setId(data.id);
    setToken(data.token);

    localStorage.setItem('name', data.name);
    localStorage.setItem('id', data.id);
    localStorage.setItem('token', data.token);
  };

  const logOut = () => {
    setName('');
    setId('');
    setToken('');

    localStorage.removeItem('name');
    localStorage.removeItem('id');
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ id, name, token, login, logOut }}>
      {children}
    </AuthContext.Provider>
  )
};
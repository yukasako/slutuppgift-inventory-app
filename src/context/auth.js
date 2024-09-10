"use client";

import { createContext, useContext, useEffect, useState } from "react";

const defaultState = {
  token: null,
  setToken: () => {},
  logout: () => {},
};

const AuthContext = createContext(defaultState);

function AuthProvider({ children }) {
  // tokenの状態を管理。useState で token を保持します。
  // この token は、ユーザーがログインしているかどうかを判断するために使います。
  const [token, setToken] = useState(defaultState.token);

  // トークンをlocalStorageから取得
  useEffect(() => {
    const _token = localStorage.getItem("@library/token");
    // if (_token) {
    //   setToken(_token);
    // }
  }, []);

  function logout() {
    localStorage.removeItem("@library/token");
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };

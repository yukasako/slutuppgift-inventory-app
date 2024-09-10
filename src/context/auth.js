// このコードの目的は、アプリケーション全体でユーザーの認証状態を管理し、
// 認証に関連する情報（トークンなど）や操作（ログアウトなど）を提供することです。
// これにより、アプリケーションの任意の部分から認証状態を簡単に管理し、利用することができます。

"use client";
import { createContext, useContext, useEffect, useState } from "react";

// 1. AuthContextの作成
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
    if (_token) {
      setToken(_token);
    }
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

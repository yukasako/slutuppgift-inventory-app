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

// tokenの状態を管理する機能。tokenは、ユーザーがログインしているかどうかの判断に使う。
function AuthProvider({ children }) {
  const [token, setToken] = useState(defaultState.token);

  // AuthProviderがレンダーされる度（つまりページ更新時）に、localStorageから取得。
  useEffect(() => {
    const _token = localStorage.getItem("@library/token");
    if (_token) {
      setToken(_token);
    }
  }, []);

  // ログアウトしたらトークン削除。
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

// Tokenを取りだす時（POST, PUT, DELETE時）や設定する時（Login時）に使う。
function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };

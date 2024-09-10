"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

function AuthForm() {
  // useRouter: ルート（ページ）の操作を行うフック（ページ遷移やクエリパラメータの取得など）。
  const router = useRouter();
  // useAuth: 認証関連の情報を管理するカスタムフック（ユーザー情報やログイン・ログアウト処理など）。
  const auth = useAuth();
  console.log("Auth", auth);

  //　Inputデータを取得
  const [action, setAction] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userData = {
    email,
    password,
    name,
  };

  async function handleSubmit(e) {
    e.preventDefault();
    // ログイン＆登録処理
    const url = `/api/auth/${action}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // 通ったよ
    if (response.ok) {
      const data = await response.json();
      if (action === "register") {
        alert("User is registered");
      }

      if (action === "login") {
        console.log("data", data);
        localStorage.setItem("@library/token", data.token);
        auth.setToken(data.token);
        router.push("/items");
        return;
      }
    }

    if (!response.ok) {
      const data = await response.json();
      if (
        data.error ===
        "\nInvalid `prisma.user.create()` invocation:\n\n\nUnique constraint failed on the fields: (`email`)"
      ) {
        alert(
          "This email is already registered. Please use a different email."
        );
      }
      return;
    }
  }

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Name input */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email input */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password input */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Buttons for Login and Register */}
        <div className="form-actions">
          <button type="submit" onClick={() => setAction("login")}>
            Login
          </button>
          <button type="submit" onClick={() => setAction("register")}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;

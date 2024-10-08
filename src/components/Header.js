"use client";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

function Header() {
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    auth.logout();
    router.push("/"); // ログアウト後にログインページにリダイレクト
  };

  return (
    <header>
      <h1>Inventory App</h1>
      {auth.token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <div></div>
      )}
    </header>
  );
}
export default Header;

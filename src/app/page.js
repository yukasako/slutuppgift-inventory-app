export default async function Home() {
  let items = [];

  const fetchItems = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/items");
      items = await response.json();
      // デバッグのために items の長さをログに出力
      console.log("アイテムの数:", items);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  };
  return (
    <div>
      <h1>Login Page</h1>
    </div>
  );
}

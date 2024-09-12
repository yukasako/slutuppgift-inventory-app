"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth";

function ItemForm() {
  // 認証確認
  const auth = useAuth();

  // 入力情報を引っ張る
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1); // 初期値を1に設定
  const [category, setCategory] = useState("");

  async function handleSubmit(event) {
    event.preventDefault(); // フォームのデフォルトの送信動作を防ぐ

    // POST リクエスト
    const url = "/api/items";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        name,
        description,
        quantity,
        category,
      }),
    });
    if (response.ok) {
      window.location.reload(); // ページを再読み込み
      const data = await response.json();
      console.log("Response Data:", data);
    } else {
      // middlewareからの認証エラー。エラーメッセージはBodyに入ってるからデータとして取り出し。
      const data = await response.json();
      const errorMessage = await data.error;
      console.log(data);
      alert(errorMessage);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create Item</h2>
        <div>
          <label className="bold" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="bold" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="bold" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value); // 状態を更新
            }}
          >
            <option value="">Choose category</option>
            <option value="food">Food</option>
            <option value="cosmetic">Cosmetic</option>
            <option value="furniture">Furniture</option>
            <option value="book">Book</option>
            <option value="clothes">Clothes</option>
          </select>
        </div>

        <div>
          <label className="bold" htmlFor="quantity">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="0"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default ItemForm;

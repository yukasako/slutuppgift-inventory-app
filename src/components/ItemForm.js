"use client";

import { useState } from "react";

// import { useAuth } from "@/context/auth";

function ItemForm() {
  //   const auth = useAuth();
  //   async function handleSubmit(e) {
  //     e.preventDefault();

  //     const response = await fetch("/api/books", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${auth.token}`,
  //       },
  //       body: JSON.stringify({
  //         title: "Dune 4",
  //         author: "Frank Herbert",
  //         genre: "Sci-fi",
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();

  //       console.log(data);
  //       return;
  //     }

  //     //TODO: error handling
  //   }

  // AuthFormからauth.tokenをとってきてる
  //   if (!auth.token) {
  //     return <div>You have to be logged in to create a book. :)</div>;
  //   }

  // 入力情報を引っ張る
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1); // 初期値を1に設定
  const [category, setCategory] = useState("");

  async function handleSubmit(event) {
    event.preventDefault(); // フォームのデフォルトの送信動作を防ぐ

    // POST リクエストなど
    const url = "/api/items";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      console.error("Failed to submit:", response.statusText);
    }
  }

  return (
    <div>
      <h2>Create Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
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
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value); // 状態を更新
            }}
          >
            <option value="food">Food</option>
            <option value="cosmetic">Cosmetic</option>
            <option value="furniture">Furniture</option>
            <option value="book">Book</option>
            <option value="clothes">Clothes</option>
          </select>
        </div>

        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <div>
          <button type="submit">Add Item</button>
          <button type="button">Update Item</button>
        </div>
      </form>
    </div>
  );
}

export default ItemForm;

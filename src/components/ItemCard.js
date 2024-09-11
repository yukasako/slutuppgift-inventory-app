"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/auth";

export default function ItemCard(props) {
  // 認証確認
  const auth = useAuth();

  //編集モードをトグルする。初期値はFalseだが、クリックでTrueになった時、{isEditing && 以下の内容を表示に。
  const [isEditing, setIsEditing] = useState(false);
  // IsEditingがTrueの時に表示されるフォームの内容。
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [quantity, setQuantity] = useState(props.quantity);
  const [category, setCategory] = useState(props.category);

  //編集
  async function handleUpdate(event) {
    event.preventDefault();

    // auth.tokenがない（ログインしていない）場合。
    if (!auth.token) {
      alert("You have to login to UPDATE items");
    }

    const response = await fetch(
      `http://localhost:3000/api/items/${props.id}`,
      {
        method: "PUT",
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
      }
    );
    if (response.ok) {
      window.location.reload(); // 成功後にページを再読み込み
      console.log("Item updated successfully");
    } else {
      console.error("Failed to update item");
    }
  }

  //　Delete
  async function handleDelete() {
    if (!auth.token) {
      alert("You have to login to DELETE");
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/items/${props.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (response.ok) {
        window.location.reload(); // 削除後にページを再読み込み
        console.log("Item deleted successfully");
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="item-card">
      <div>
        <p className="bold">Name: {props.name}</p>
        <p>Description: {props.description}</p>
        <p>Quantity: {props.quantity}</p>
        <p>Category: {props.category}</p>
      </div>
      <div>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
      </div>

      {/* 編集モードだった場合Formを表示 */}
      {isEditing && (
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
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
              onChange={(e) => setCategory(e.target.value)}
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
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div>
            <button type="submit">Update Item</button>
          </div>
        </form>
      )}
    </div>
  );
}

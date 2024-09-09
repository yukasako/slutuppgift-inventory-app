import React from "react";
// import "./ItemCard.css"; // スタイルは別ファイルに分ける場合

export default function ItemCard(props, onEdit, onDelete) {
  return (
    <div className="item-card">
      <div>
        <h3>Name: {props.name}</h3>
        <p>Description: {props.description}</p>
        <p>Quantity: {props.quantity}</p>
        <p>Category: {props.category}</p>
      </div>
      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";

export default function FilterItem() {
  return (
    <div className="filter-container">
      <div className="category-checkboxes">
        <label>
          <input type="checkbox" value="food" />
          Food
        </label>
        <label>
          <input type="checkbox" value="cosmetic" />
          Cosmetic
        </label>
        <label>
          <input type="checkbox" value="furniture" />
          Furniture
        </label>
        <label>
          <input type="checkbox" value="book" />
          Book
        </label>
        <label>
          <input type="checkbox" value="clothes" />
          Clothes
        </label>
      </div>
      <div>
        <select className="stock-select">
          <option value="">All</option>
          <option value="1">In Stock</option>
          <option value="0">Out of Stock</option>
        </select>
        <button className="filter-button">Filter</button>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import { useState } from "react";

export default function FilterItem({ filterParams }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectStock, setSelectStock] = useState("");

  // カテゴリー選択の変更を処理する
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, value]); // チェックされた場合、選択肢に追加
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value) // チェックが外された場合、削除
      );
    }
  };

  // 在庫選択の変更を処理する
  const handleStockChange = (e) => {
    setSelectStock(e.target.value); // 選択された在庫ステータスを保存
  };

  // 取得した値でクエリ作成
  let queryString = "";
  if (selectedCategories.length > 0) {
    queryString += selectedCategories
      .map((category) => `category=${category}`)
      .join("&");
  }
  if (selectStock) {
    queryString += (queryString ? "&" : "") + `quantity=${selectStock}`;
  }

  // 親コンポーネントにデータを送る
  const handleClick = () => {
    filterParams(queryString);
  };

  return (
    <div className="filter-container">
      <div className="category-checkboxes">
        <label>
          <input type="checkbox" value="food" onChange={handleCategoryChange} />
          Food
        </label>
        <label>
          <input
            type="checkbox"
            value="cosmetic"
            onChange={handleCategoryChange}
          />
          Cosmetic
        </label>
        <label>
          <input
            type="checkbox"
            value="furniture"
            onChange={handleCategoryChange}
          />
          Furniture
        </label>
        <label>
          <input type="checkbox" value="book" onChange={handleCategoryChange} />
          Book
        </label>
        <label>
          <input
            type="checkbox"
            value="clothes"
            onChange={handleCategoryChange}
          />
          Clothes
        </label>
      </div>
      <div>
        <select className="stock-select" onChange={handleStockChange}>
          <option value="">All</option>
          <option value="1">In Stock</option>
          <option value="0">Out of Stock</option>
        </select>
        <button onClick={handleClick} className="filter-button">
          Filter
        </button>
      </div>
    </div>
  );
}

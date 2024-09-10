"use client";

// useState: コンポーネント内で状態を管理するフック。
// useEffect: コンポーネントの副作用（データフェッチやDOM操作など）を管理するフック。
import React, { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";
import ItemForm from "@/components/ItemForm";
import FilterItem from "@/components/Filter";

export default function ItemPage() {
  const [items, setItems] = useState([]);
  const [params, setParams] = useState("");

  // データを受け取る関数を定義
  const paramsChange = (newParams) => {
    console.log("Received data:", newParams);
    setParams(newParams);
  };

  useEffect(() => {
    async function fetchData(param) {
      const url = param
        ? `http://localhost:3000/api/items/filter${param}`
        : "http://localhost:3000/api/items";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    // paramsが変更されるたびにデータをフェッチする
    fetchData(params);
  }, [params]); // paramsが変更されるたびに実行

  return (
    <div>
      <ItemForm />
      <FilterItem filterParams={paramsChange} />
      {items &&
        items.map((item) => {
          return <ItemCard {...item} key={item.id} />;
        })}
    </div>
  );
}

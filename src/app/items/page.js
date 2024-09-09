import ItemCard from "@/components/ItemCard";
import ItemForm from "@/components/ItemForm";

export default async function ItemPage() {
  let items = [];
  const response = await fetch("http://localhost:3000/api/items");
  items = await response.json();
  console.log("アイテム", items.length);

  return (
    <div>
      <ItemForm />
      {items &&
        items.map((item) => {
          return <ItemCard {...item} key={item.id} />;
        })}
    </div>
  );
}

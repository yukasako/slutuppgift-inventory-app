import ItemCard from "@/components/ItemCard";
import ItemForm from "@/components/ItemForm";
import FilterItem from "@/components/Filter";

export default async function ItemPage() {
  let items = [];
  const response = await fetch("http://localhost:3000/api/items");
  items = await response.json();

  return (
    <div>
      <ItemForm />
      <FilterItem />
      {items &&
        items.map((item) => {
          return <ItemCard {...item} key={item.id} />;
        })}
    </div>
  );
}

import { useState } from "react";

//static items
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Sek", quantity: 12, packed: true },
//   { id: 3, description: "Power Bank", quantity: 1, packed: true },
// ];


//parent component
export default function App() {
  //destructuring array states
  const [items, setItems] = useState([]);

  //handle add items to state
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(itemId) {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  }

  function handleUpdateItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  //render components inside parent
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem}/>
      <Stats items={items}/>
    </div>
  );
}

//component logo
function Logo() {
  return <h1> JALAN JALAN KUY</h1>;
}

//component form
function Form({ onAddItems }) {
  //destructuring array state
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  
  function handleSubmit(e) {
    e.preventDefault();

    //if empty description
    if (!description) return;

    const newItem = { description, quantity, packed: false, };
    console.log(newItem); //testing new data

    //store new item in array from parent state
    onAddItems(newItem);

    //return this state
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Apa aja yang akan dibawa </h3>
      {/* <h3>Checklist Barang  </h3> */}
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 2000  }, (_, i) => i + 1).map((num) => (
          <option value={num}>{num}</option>
        ))}
      </select>
      <input type="text" placeholder="Barang yang mau dibawa" value={description} onChange={(e) => setDescription(e.target.value)}/>
      <button>Bawa </button>
    </form>
  );
}

//child component PackingList
function PackingList({ items, onDeleteItem, onUpdateItem}) {

  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDelete={() => onDeleteItem(item.id)}  onUpdateItem={onUpdateItem}  />
        ))}
      </ul>
    </div>
  );
}

//component PackingList
function Item({ item, onDelete, onUpdateItem}) {
  return (
    <li>
       <input
        type="checkbox"
        value={item.packed}
        onChange={() => onUpdateItem(item.id)}
      />
      {/* ternary operator to check condition */}

      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}

//child Component
function Stats({items}) {

  if (!items.length)

  return (
    <p className="stats">
      <em>Mulai Tambahkan Barang</em>
    </p>
  );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100)

  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? "siap berangkat?" :
        `💼 Kamu punya ${numItems} barang di daftar, dan sudah packing ${numPacked} barang (${percentage }%)`}
      </em>
    </footer>
  );
}
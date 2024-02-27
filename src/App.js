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
      <NamaList items={items} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem}/>
      <Stats items={items}/>
    </div>
  );
}

//component logo
function Logo() {
  return <h1> Daftar Pengunjung</h1>;
}

//component form
function Form({ onAddItems }) {
  //destructuring array state
  const [description, setDescription] = useState("");
  const [selectedClass, setSelectedClass] = useState('');
  const [date, setDate] = useState("");

  
  function handleSubmit(event) {
    event.preventDefault();

    //if empty description
    if (!description) return;

    const newItem = { description, packed: false,id: Date.now(),selectedClass, date};
    console.log(newItem); //testing new data

    //store new item in array from parent state
    onAddItems(newItem);

    //return this state
    setDescription("");
    setSelectedClass("");
    setDate("");

  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Masukkan Data Anda </h3>
      {/* <h3>Checklist Barang  </h3> */}
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              <option value="X PPLG">X PPLG</option>
              <option value="XI PPLG">XI PPLG</option>
              <option value="XII PPLG">XII PPLG</option>
              {/* Add more options as needed */}
            </select>
      <input type="text" placeholder="Nama" value={description} onChange={(e) => setDescription(e.target.value)}/>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button>Confirm </button>
    </form>
  );
}

//child component PackingList
function NamaList({ items, onDeleteItem, onUpdateItem}) {

  return (
    <div className="list">
      {/* <h4 > Kelas </h4>
      <h4 > Nama </h4>
      <h4 > Tanggal </h4>
      <h4 > Jam </h4> */}
      <ul>
        {items.map((item) => (
          <Nama item={item} key={item.id} onDelete={() => onDeleteItem(item.id)}  onUpdateItem={onUpdateItem}  />
        ))}
      </ul>
    </div>
  );
}

//component PackingList
function Nama({ item, onDelete, onUpdateItem}) {
  return (
    <li>

      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.selectedClass} {item.description} {item.date}
      </span>

       <input
        type="checkbox"
        value={item.packed}
        onChange={() => onUpdateItem(item.id)}
        
      />
      <button onClick={() => onDelete(item.id)}>❌</button>
      {/* ternary operator to check condition */}
    </li>
  );
}

//child Component
function Stats({items}) {

  if (!items.length)

  return (
    <p className="stats">
      <em>Daftar Nama Kosong</em>
    </p>
  );

  // const numItems = items.length;
  // const numPacked = items.filter((item) => item.packed).length;
  // const percentage = Math.round((numPacked / numItems) * 100)

  return (
    <footer className="stats">
      <em>
        {`Check list jika sudah selesai`}
      </em>
    </footer>
  );
}
import React, { useState } from 'react';
import InventoryTable from './components/InventoryTable';
import AddItemForm from './components/AddItemForm';
import './styles/App.css';

const initialItems = [
  { id: '1', name: 'Laptop', category: 'Electronics', quantity: 15, price: 999.99 },
  { id: '2', name: 'Desk Chair', category: 'Furniture', quantity: 8, price: 199.99 },
  { id: '3', name: 'Coffee Maker', category: 'Appliances', quantity: 12, price: 79.99 },
  { id: '4', name: 'Monitor', category: 'Electronics', quantity: 5, price: 299.99 },
];

function App() {
  const [items, setItems] = useState(initialItems);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const addItem = (newItem) => {
    setItems([...items, { ...newItem, id: Date.now().toString() }]);
    setShowAddForm(false);
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (item) => {
    setItems(items.map(i => i.id === item.id ? item : i));
    setEditingItem(null);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="header-title">Inventory Management</h1>
        <p className="header-subtitle">Manage your stock efficiently</p>
      </header>

      {showAddForm && (
        <div className="mb-6">
          <AddItemForm
            onSubmit={addItem}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      <InventoryTable
        items={items}
        onDelete={deleteItem}
        onEdit={(item) => setEditingItem(item)}
        editingItem={editingItem}
        onSaveEdit={editItem}
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
      />
    </div>
  );
}

export default App;
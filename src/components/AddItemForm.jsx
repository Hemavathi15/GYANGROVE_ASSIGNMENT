import React, { useState } from 'react';
import { X } from 'lucide-react';
import '../styles/Form.css';

function AddItemForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    price: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value
    }));
  };

  return (
    <div className="form-container " >
      <div className="form-header">
        <h2 className="form-title">Add New Item</h2>
        <button onClick={onCancel} className="form-close">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter item name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter category"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="0"
            className="form-input"
            placeholder="Enter quantity"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="form-input"
            placeholder="Enter price"
            required
          />
        </div>

        <button type="submit" className="form-button">
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddItemForm;
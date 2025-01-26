import React, { useState } from "react";
import { Trash2, Edit2, Save, X, PlusCircle } from "lucide-react";
import "../styles/Table.css";

function InventoryTable({
  items,
  onDelete,
  onEdit,
  editingItem,
  onSaveEdit,
  showAddForm,
  setShowAddForm,
}) {
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterCategory, setFilterCategory] = useState("");
  const [editForm, setEditForm] = useState({});

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEditChange = (field, value) => {
    setEditForm({ ...editForm, [field]: value });
  };

  const startEdit = (item) => {
    onEdit(item);
    setEditForm(item);
  };

  const saveEdit = () => {
    onSaveEdit(editForm);
    setEditForm({});
  };

  const categories = [...new Set(items.map((item) => item.category))];

  const filteredItems = items
    .filter((item) => !filterCategory || item.category === filterCategory)
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const modifier = sortDirection === "asc" ? 1 : -1;

      if (typeof aValue === "string") {
        return aValue.localeCompare(bValue) * modifier;
      }
      return (aValue - bValue) * modifier;
    });

  return (
    <div className="table-container">
      <div
        className="table-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="filter-container">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="btn-container">
          <button onClick={() => setShowAddForm(true)} className="add-button">
            <PlusCircle  className="plus-icon" size={20} />
            <span>Add New Item</span> 
          </button>
        </div>
      </div>

      <table className="table">
        <thead className="table-head">
          <tr>
            <th className="table-head-cell" onClick={() => handleSort("name")}>
              Name
            </th>
            <th
              className="table-head-cell"
              onClick={() => handleSort("category")}
            >
              Category
            </th>
            <th
              className="table-head-cell"
              onClick={() => handleSort("quantity")}
            >
              Quantity
            </th>
            <th className="table-head-cell" onClick={() => handleSort("price")}>
              Price
            </th>
            <th className="table-head-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {filteredItems.map((item) => (
            <tr key={item.id} className="table-row">
              {editingItem?.id === item.id ? (
                <>
                  <td className="table-cell-edit">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => handleEditChange("name", e.target.value)}
                      className="form-input"
                    />
                  </td>
                  <td className="table-cell-edit">
                    <input
                      type="text"
                      value={editForm.category}
                      onChange={(e) =>
                        handleEditChange("category", e.target.value)
                      }
                      className="form-input"
                    />
                  </td>
                  <td className="table-cell-edit">
                    <input
                      type="number"
                      value={editForm.quantity}
                      onChange={(e) =>
                        handleEditChange("quantity", Number(e.target.value))
                      }
                      className="form-input"
                    />
                  </td>
                  <td className="table-cell-edit">
                    <input
                      type="number"
                      step="0.01"
                      value={editForm.price}
                      onChange={(e) =>
                        handleEditChange("price", Number(e.target.value))
                      }
                      className="form-input"
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className="table-cell">{item.name}</td>
                  <td className="table-cell">{item.category}</td>
                  <td className="table-cell">{item.quantity}</td>
                  <td className="table-cell">{item.price}</td>
                  <td className="table-cell table-actions">
                    <button
                      onClick={() => startEdit(item)}
                      className="table-action-icon"
                    >
                      <Edit2 strokeWidth={1} />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="table-action-icon"
                    >
                      <Trash2 strokeWidth={1} />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;

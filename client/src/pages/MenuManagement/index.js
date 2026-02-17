import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useDebounce } from "../../hooks/useDebounce";
import MenuCard from "../../components/MenuCard";
import { FaPlus, FaEdit, FaSyncAlt } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import "./index.css";

const API = process.env.REACT_APP_API_URL;

const CATEGORY_OPTIONS = [
  "Main Course",
  "Beverage",
  "Dessert",
  "Appetizer",
];

export default function MenuManagement() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    preparationTime: "",
    ingredients: "",
    imageUrl: "",
  });

  const formRef = useRef(null);
  const fetchMenu = useCallback(async () => {
    setLoading(true);
    try {
      const url = debouncedSearch.trim()
        ? `${API}/api/menu/search?q=${debouncedSearch}`
        : `${API}/api/menu`;

      const res = await axios.get(url);
      setMenu(res.data);
    } catch (err) {
      console.error("Fetch menu error:", err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveMenuItem = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
      preparationTime: Number(formData.preparationTime),
      ingredients: formData.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
    };

    setLoading(true);
    try {
      if (editingItem) {
        await axios.put(`${API}/api/menu/${editingItem._id}`, payload);
      } else {
        await axios.post(`${API}/api/menu`, payload);
      }

      resetForm();
      fetchMenu();
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save menu item");
    } finally {
      setLoading(false);
    }
  };

  const editItem = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || "",
      description: item.description || "",
      price: item.price || "",
      category: item.category || "",
      preparationTime: item.preparationTime || "",
      ingredients: item.ingredients?.join(", ") || "",
      imageUrl: item.imageUrl || "",
    });
    setShowForm(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`${API}/api/menu/${id}`);
      fetchMenu();
    } catch (err) {
      alert("Failed to delete item");
    }
  };

  const toggleAvailability = async (id, currentStatus) => {
    const previousMenu = [...menu];

    setMenu((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, isAvailable: !currentStatus } : item
      )
    );

    try {
      await axios.patch(`${API}/api/menu/${id}/availability`);
    } catch {
      alert("Failed to update availability");
      setMenu(previousMenu);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      preparationTime: "",
      ingredients: "",
      imageUrl: "",
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const groupedMenu = menu.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="page">
      <h1>🍽️ Menu Management</h1>

      {showForm && (
        <form ref={formRef} className="menu-form" onSubmit={saveMenuItem}>
          <input
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            name="preparationTime"
            placeholder="Prep Time (mins)"
            value={formData.preparationTime}
            onChange={handleChange}
          />

          <input
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            name="ingredients"
            placeholder="Ingredients (comma separated)"
            value={formData.ingredients}
            onChange={handleChange}
          />

          <div className="form-actions">
            <button type="submit" className="btn submit-btn">
              {editingItem ? (
                <>
                  <FaEdit /> Update
                </>
              ) : (
                <>
                  <FaPlus /> Add
                </>
              )}
            </button>

            <button type="button" className="btn-cancel" onClick={resetForm}>
              <FaSyncAlt /> Cancel
            </button>
          </div>
        </form>
      )}

      <div className="search-add">
        <input
          className="search-input"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {!showForm && (
          <button className="add-btn" onClick={() => setShowForm(true)}>
            <FaPlus /> Add Item
          </button>
        )}
      </div>

      {loading && (
        <div className="loader">
          <TailSpin height={50} width={50} color="#2563eb" />
        </div>
      )}
      {Object.keys(groupedMenu).map((cat) => (
        <div key={cat} className="category-section">
          <h2>{cat}</h2>
          <div className="grid">
            {groupedMenu[cat].map((item) => (
              <MenuCard
                key={item._id}
                item={item}
                toggleAvailability={toggleAvailability}
                editItem={editItem}
                deleteItem={deleteItem}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

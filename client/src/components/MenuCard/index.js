import React from "react";
import { FiEdit2, FiTrash2, FiRefreshCw} from "react-icons/fi";
import "./index.css";

export default function MenuCard({
  item,
  toggleAvailability,
  editItem,
  deleteItem,
}) {
  return (
    <div className="card1">
      <img
        src={item.imageUrl || "https://via.placeholder.com/300x200?text=Food+Image"}
        alt={item.name}
        className="card-img"
      />

      <div className="card1-body">
        <h3 className="title">{item.name}</h3>

        <p className="category">{item.category}</p>

        <p className="description">
          {item.description || "No description available"}
        </p>

        <div className="meta">
          <span className="price">₹ {item.price}   </span>
          <span className="prep-time">⏱ {item.preparationTime} mins</span>
        </div>

        <p className="ingredients">
          <strong>Ingredients:</strong>{" "}
          {item.ingredients?.length
            ? item.ingredients.join(", ")
            : "Not specified"}
        </p>

        <span
          className={`status ${
            item.isAvailable ? "available" : "unavailable"
          }`}
        >
          {item.isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="menu-card-actions">
        <button 
          className="action-btn toggle" 
          onClick={() => toggleAvailability(item._id, item.isAvailable)}
          title="Toggle Availability"
        >
          <FiRefreshCw />
        </button>
        <button 
          className="action-btn edit" 
          onClick={() => editItem(item)}
        >
          <FiEdit2 /> Edit
        </button>
        <button 
          className="action-btn delete" 
          onClick={() => deleteItem(item._id)}
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}

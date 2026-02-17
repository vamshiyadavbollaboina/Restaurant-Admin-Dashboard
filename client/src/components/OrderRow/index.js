import "./index.css";
import {FaUtensils, FaRupeeSign, FaShoppingBasket} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

export default function OrderRow({ order, updateStatus, onDelete }) {
  const isCompleted = order.status === "Delivered";

  return (
    <div className={`order-card ${order.status.toLowerCase()} ${isCompleted ? 'completed' : ''}`}>
      <div className="card-accent"></div>
      
      <div className="order-header">
        <div className="customer-section">
          <div className="avatar">
            {order.customerName.charAt(0).toUpperCase()}
          </div>
          <div className="customer-details">
            <h3>{order.customerName}</h3>
            <span className="table-pill"><FaUtensils size={10} /> Table {order.tableNumber}</span>
          </div>
        </div>
        <div className="price-tag">
          <FaRupeeSign className="currency-icon" />
          <span>{order.totalAmount}</span>
        </div>
      </div>

      <div className="order-content">
        <div className="item-container">
          <div className="label"><FaShoppingBasket /> Order Items</div>
          <div className="items-grid">
            {order.items.map((item, idx) => (
              <span key={idx} className="item-chip">
                {item.itemName} <small>x{item.quantity}</small>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="order-footer">
        <div className="time-info">
          <IoMdTime /> <span>Just now</span>
        </div>

        <div className="actions-group">
          <div className="select-wrapper">
            <select
              className="modern-select"
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Ready">Ready</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
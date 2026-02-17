import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import OrderRow from "../../components/OrderRow";
import "./index.css";

import { FiPlus, FiFilter, FiShoppingBag, FiUser, FiHash } from "react-icons/fi";
import { MdOutlineFastfood } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";

const API = process.env.REACT_APP_API_URL;

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [menu, setMenu] = useState([]);

  const [newOrder, setNewOrder] = useState({
    customerName: "",
    tableNumber: "",
    items: [{ category: "", itemName: "", quantity: 1, price: 0 }],
  });


  const fetchOrders = useCallback(async () => {
    try {
      const url = statusFilter
        ? `${API}/api/orders?status=${statusFilter}`
        : `${API}/api/orders`;

      const res = await axios.get(url);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  }, [statusFilter]);

  const fetchMenu = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/api/menu`);
      setMenu(res.data);
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
  }, []);


  useEffect(() => {
    fetchOrders();
    fetchMenu();
  }, [fetchOrders, fetchMenu]);


  const menuByCategory = menu.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});


  const updateStatus = async (id, status) => {
    await axios.patch(`${API}/api/orders/${id}/status`, { status });
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status } : o))
    );
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    await axios.delete(`${API}/api/orders/${id}`);
    setOrders((prev) => prev.filter((o) => o._id !== id));
  };


  const handleItemChange = (e, index, field) => {
    const updatedItems = [...newOrder.items];

    if (field === "category") {
      updatedItems[index] = {
        category: e.target.value,
        itemName: "",
        quantity: 1,
        price: 0,
      };
    }

    if (field === "itemName") {
      const selected = menuByCategory[updatedItems[index].category]?.find(
        (i) => i.name === e.target.value
      );
      if (!selected) return;

      updatedItems[index].itemName = selected.name;
      updatedItems[index].price = selected.price;
    }

    if (field === "quantity") {
      updatedItems[index].quantity = Number(e.target.value);
    }

    setNewOrder({ ...newOrder, items: updatedItems });
  };

  const createOrder = async (e) => {
    e.preventDefault();

    const totalAmount = newOrder.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    await axios.post(`${API}/api/orders`, {
      ...newOrder,
      totalAmount,
    });

    setNewOrder({
      customerName: "",
      tableNumber: "",
      items: [{ category: "", itemName: "", quantity: 1, price: 0 }],
    });

    fetchOrders();
  };


  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>
          <HiOutlineDocumentText /> Order Management
        </h1>

        <div className="filter-wrapper">
          <FiFilter />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Orders ({orders.length})</option>
            <option>Pending</option>
            <option>Preparing</option>
            <option>Ready</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      </header>

      <div className="dashboard-grid">
        <aside className="form-card">
          <div className="card-header">
            <FiPlus />
            <h2>New Order</h2>
          </div>

          <form onSubmit={createOrder}>
            <div className="input-group">
              <div className="field">
                <label>
                  <FiUser /> Customer
                </label>
                <input
                  type="text"
                  value={newOrder.customerName}
                  required
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      customerName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="field">
                <label>
                  <FiHash /> Table
                </label>
                <input
                  type="number"
                  value={newOrder.tableNumber}
                  required
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      tableNumber: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="items-builder">
              <label>
                <MdOutlineFastfood /> Items
              </label>

              {newOrder.items.map((item, index) => (
                <div className="item-row-input" key={index}>
                  <select
                    value={item.category}
                    onChange={(e) =>
                      handleItemChange(e, index, "category")
                    }
                    required
                  >
                    <option value="">Category</option>
                    {Object.keys(menuByCategory).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  <select
                    value={item.itemName}
                    onChange={(e) =>
                      handleItemChange(e, index, "itemName")
                    }
                    required
                  >
                    <option value="">Item</option>
                    {item.category &&
                      menuByCategory[item.category].map((m) => (
                        <option
                          key={m._id}
                          value={m.name}
                          disabled={!m.isAvailable}
                        >
                          {m.name}
                          {!m.isAvailable ? " (Not Available)" : ""}
                        </option>
                      ))}
                  </select>

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(e, index, "quantity")
                    }
                  />

                  {index > 0 && (
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() =>
                        setNewOrder({
                          ...newOrder,
                          items: newOrder.items.filter(
                            (_, i) => i !== index
                          ),
                        })
                      }
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="btn-add"
                onClick={() =>
                  setNewOrder({
                    ...newOrder,
                    items: [
                      ...newOrder.items,
                      {
                        category: "",
                        itemName: "",
                        quantity: 1,
                        price: 0,
                      },
                    ],
                  })
                }
              >
                <FiPlus /> Add Item
              </button>
            </div>

            <button type="submit" className="btn-submit">
              <FiShoppingBag /> Confirm Order
            </button>
          </form>
        </aside>

        <main className="orders-feed">
          {orders.map((order) => (
            <OrderRow
              key={order._id}
              order={order}
              updateStatus={updateStatus}
              onDelete={deleteOrder}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

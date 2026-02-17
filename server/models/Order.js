const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true },

    items: [
      {
        category: String,
        itemName: String,   
        quantity: Number,
        price: Number
      }
    ],

    totalAmount: Number,

    status: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"],
      default: "Pending"
    },

    customerName: String,
    tableNumber: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

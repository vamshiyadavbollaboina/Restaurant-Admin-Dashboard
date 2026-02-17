const Order = require("../models/Order");

exports.getOrders = async (req, res) => {
  const { page = 1, status } = req.query;
  const limit = 50;

  const filter = status ? { status } : {};

  const orders = await Order.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
};

exports.createOrder = async (req, res) => {
  const order = new Order({
    ...req.body,
    orderNumber: "ORD-" + Date.now()
  });

  await order.save();
  res.status(201).json(order);
};

exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(order);
};

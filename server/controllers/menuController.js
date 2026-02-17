const MenuItem = require("../models/MenuItem");

exports.getMenu = async (req, res) => {
  const { category, availability, minPrice, maxPrice } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (availability !== undefined) filter.isAvailable = availability === "true";
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = minPrice;
    if (maxPrice) filter.price.$lte = maxPrice;
  }

  const items = await MenuItem.find(filter);
  res.json(items);
};

exports.searchMenu = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);

  const items = await MenuItem.find({ $text: { $search: q } });
  res.json(items);
};

exports.getMenuItem = async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  res.json(item);
};

exports.createMenuItem = async (req, res) => {
  const item = new MenuItem(req.body);
  await item.save();
  res.status(201).json(item);
};

exports.updateMenuItem = async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(item);
};

exports.deleteMenuItem = async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

exports.toggleAvailability = async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  item.isAvailable = !item.isAvailable;
  await item.save();
  res.json(item);
};

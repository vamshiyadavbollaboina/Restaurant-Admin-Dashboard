const express = require("express");
const router = express.Router();
const controller = require("../controllers/menuController");

router.get("/", controller.getMenu);
router.get("/search", controller.searchMenu);
router.get("/:id", controller.getMenuItem);
router.post("/", controller.createMenuItem);
router.put("/:id", controller.updateMenuItem);
router.delete("/:id", controller.deleteMenuItem);
router.patch("/:id/availability", controller.toggleAvailability);

module.exports = router;

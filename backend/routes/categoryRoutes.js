const express = require("express");
const {
  getAllCategories,
  getCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoriesControllers");
const { authenticateAdmin } = require("../middlewares/authentication");
const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategory);
categoryRouter.post("/", authenticateAdmin, addCategory);
categoryRouter.patch("/:id", authenticateAdmin, updateCategory);
categoryRouter.delete("/:id", authenticateAdmin, deleteCategory);

module.exports = categoryRouter;

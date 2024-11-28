const Category = require("../model/Category");
const path = require("path");
const fs = require("fs/promises");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, msg: "No such category found!" });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const addCategory = async (req, res) => {
  try {
    const image = req.files.image;

    if (!image) {
      return res
        .status(400)
        .json({ success: false, msg: "Image is required!" });
    }

    const uniqueName = Date.now() + "-" + image.name;
    const uploadPath = path.join(__dirname, "../uploads", uniqueName);

    await image.mv(uploadPath);

    const addedCategory = await Category.create({
      ...req.body,
      image: `${process.env.BASE_URL}/uploads/${uniqueName}`,
    });

    res.status(200).json({ success: true, data: addedCategory });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let body = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, msg: "No such category found!" });
    }

    if (req.files) {
      const image = req.files.image;
      const fileToBeDeleted = path.parse(category.image).base;
      const filesInUploads = await fs.readdir(
        path.join(__dirname, "../uploads")
      );

      if (filesInUploads.includes(fileToBeDeleted)) {
        await fs.unlink(path.join(__dirname, "../uploads", fileToBeDeleted));
      }

      const uniqueName = Date.now() + "-" + image.name;
      const uploadPath = path.join(__dirname, "../uploads", uniqueName);

      await image.mv(uploadPath);

      body = {
        ...body,
        image: `${process.env.BASE_URL}/uploads/${uniqueName}`,
      };
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, body);

    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, msg: "No such category found!" });
    }

    const fileToBeDeleted = path.parse(category.image).base;
    const filesInUploads = await fs.readdir(path.join(__dirname, "../uploads"));

    if (filesInUploads.includes(fileToBeDeleted)) {
      await fs.unlink(path.join(__dirname, "../uploads", fileToBeDeleted));
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({ success: true, msg: "Category Deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};

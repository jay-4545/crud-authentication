import React, { useEffect, useState } from "react";
import AdminTitlePage from "../../components/admin/AdminTitlePage";
import { deleteCategory, getAllCategories } from "../../services/apiServices";
import CategoryListItem from "./CategoryListItem";

function CategoryList() {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategory(data.data);
    });
  }, []);

  async function fetchData() {
    try {
      const result = await getAllCategories();
      setCategory(result.data);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(id) {
    const userInput = window.confirm("Are you sure?");
    try {
      if (userInput) {
        await deleteCategory(id);
        alert("deleted successfully!");
        fetchData();
      }
    } catch (error) {
      alert("Failed to delete");
    }
  }

  return (
    <div>
      <AdminTitlePage
        text="Categories"
        hasBtn
        btnText="Add Category"
        btnLink="/admin/categories/add"
      />
      <div className="px-12">
        {category?.map((item) => {
          return (
            <CategoryListItem
              key={item._id}
              category={item}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CategoryList;

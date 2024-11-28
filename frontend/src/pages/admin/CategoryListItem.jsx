import { Delete, Edit } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function CategoryListItem({ category, handleDelete }) {
  return (
    <div>
      <li className="flex items-center gap-4 py-4">
        <Avatar src={category.image} alt={category.name} />
        <div className="flex-grow-[1]">
          <h2 className="">{category.name}</h2>
        </div>
        <div className="shrink-0">
          <IconButton
            LinkComponent={Link}
            to={`${category._id}`}
            color="secondary"
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => {
              handleDelete(category._id);
            }}
            color="error"
          >
            <Delete />
          </IconButton>
        </div>
      </li>
    </div>
  );
}

export default CategoryListItem;

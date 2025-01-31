import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import { Button, Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminTitlePage from "../../components/admin/AdminTitlePage";
import {
  addCategory,
  getCategory,
  updateCategory,
} from "../../services/apiServices";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function AddUpdateCategoriesForm() {
  const { id } = useParams();
  const isAdd = id === "add";
  const navigate = useNavigate();
  const [formState, setFormState] = useState(
    isAdd
      ? {
          name: "",
          slug: "",
          desc: "",
          image: null,
        }
      : null
  );
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (!isAdd) {
      getCategory(id).then((data) => {
        setFormState(data.data);
        setImageURL(data.data.image);
      });
    }
  }, []);

  function handleNameChange(e) {
    if (e.target.name === "name") {
      setFormState({
        ...formState,
        name: e.target.value,
        slug: e.target.value.toLowerCase().replaceAll(" ", "-"),
      });
    } else {
      setFormState({ ...formState, desc: e.target.value });
    }
  }

  function handleImageChange(e) {
    setFormState({ ...formState, image: e.target.files[0] });
    const url = URL.createObjectURL(e.target.files[0]);
    setImageURL(url);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("slug", formState.slug);
    formData.append("desc", formState.desc);
    formData.append("image", formState.image);

    try {
      if (isAdd) {
        await addCategory(formData);
      } else {
        await updateCategory(formState._id, formData);
      }
      navigate("/admin/categories");
    } catch (error) {
      alert(error.message);
    }
  }

  if (!formState) return null;

  return (
    <div>
      <AdminTitlePage text={(isAdd ? "Add" : "update") + "Category"} />
      <Paper
        className="p-6 mt-8 m-12 gap-4 grid grid-cols-1 md:grid-cols-2"
        variant="outlined"
      >
        <Paper variant="outlined" className="overflow-hidden w-full h-[300px]">
          <img src={imageURL} alt="" className="w-full h-full object-contain" />
        </Paper>
        <Paper variant="outlined" className="overflow-hidden w-full p-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField
              id="name"
              label="Category Name"
              variant="outlined"
              name="name"
              value={formState.name}
              onChange={handleNameChange}
            />
            <TextField
              id="slug"
              disabled
              label="Category Slug"
              variant="outlined"
              name="slug"
              value={formState.slug}
            />
            <TextField
              id="desc"
              label="Category Description"
              variant="outlined"
              name="desc"
              onChange={handleNameChange}
              multiline
              value={formState.desc}
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Category Image
              <VisuallyHiddenInput
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </Button>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
          </form>
        </Paper>
      </Paper>
    </div>
  );
}

export default AddUpdateCategoriesForm;

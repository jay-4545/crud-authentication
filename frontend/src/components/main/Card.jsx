import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../services/apiServices";
import CardItems from "./CardItems";

function Card() {
  const [categories, setCategories] = useState("");

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategories(data.data);
    });
  }, []);

  if (!categories) return null;

  return (
    <div className="grid grid-cols-5 gap-8 p-10">
      {categories.map((category) => {
        return <CardItems category={category} />;
      })}
    </div>
  );
}

export default Card;

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";

function CardItems({ category }) {
  // console.log("category", category);
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={category.image}
        title={category.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {category.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {category.desc}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardItems;

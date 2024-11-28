import Add from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function AdminTitlePage({ text, hasBtn, btnText, btnLink }) {
  return (
    <div className="flex items-center justify-between p-12">
      <Typography variant="h5">{text}</Typography>
      {hasBtn && (
        <Button
          LinkComponent={Link}
          to={btnLink}
          variant="contained"
          startIcon={<Add />}
        >
          {btnText}
        </Button>
      )}
    </div>
  );
}

export default AdminTitlePage;

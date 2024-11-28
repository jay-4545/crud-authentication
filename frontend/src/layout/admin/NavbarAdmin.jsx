import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../helpers/authHelper";
import { useDispatch } from "react-redux";

function NavbarAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function goToHomePage() {
    navigate("/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            onClick={goToHomePage}
            className="cursor-pointer"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Authentication
          </Typography>
          <div className="flex gap-4">
            <Typography className="cursor-pointer" onClick={goToHomePage}>
              Home
            </Typography>
            <Typography
              className="cursor-pointer"
              onClick={() => {
                handleLogout(dispatch);
                navigate("/");
              }}
            >
              Log-out
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavbarAdmin;

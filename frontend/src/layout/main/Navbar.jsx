import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../helpers/authHelper";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => {
    return store.user.user;
  });

  function goToSignUp() {
    navigate("/signup");
  }

  function goToAdminPage() {
    navigate("/admin/categories");
  }

  function render() {
    if (user) {
      if (user.role === "admin") {
        return (
          <div className="flex items-center gap-4">
            <Typography onClick={goToAdminPage} className="cursor-pointer">
              Category
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
        );
      } else {
        return (
          <Typography
            className="cursor-pointer"
            onClick={() => {
              handleLogout(dispatch);
              navigate("/");
            }}
          >
            Log-out
          </Typography>
        );
      }
    } else {
      return (
        <Typography className="cursor-pointer" onClick={goToSignUp}>
          LogIn / SignUp
        </Typography>
      );
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            // onClick={goToHomePage}
            className="cursor-pointer"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Authentication
          </Typography>
          {render()}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;

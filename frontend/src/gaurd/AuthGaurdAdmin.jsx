import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkUser } from "../services/apiServices";
import { clearToken } from "../helpers/authHelper";

function AuthGaurdAdmin({ children }) {
  const dispatch = useDispatch();

  const user = useSelector((store) => {
    return store.user.user;
  });

  console.log("user", user);

  useEffect(() => {
    checkUser()
      .then((data) => {
        console.log("lll", data);
        if (data.invalidToken) {
          clearToken(dispatch);
        }
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  });

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default AuthGaurdAdmin;

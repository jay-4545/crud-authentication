import React from "react";
import NavbarAdmin from "./NavbarAdmin";
import { Outlet } from "react-router-dom";

function LayoutAdmin() {
  return (
    <div>
      <NavbarAdmin />
      <Outlet />
    </div>
  );
}

export default LayoutAdmin;

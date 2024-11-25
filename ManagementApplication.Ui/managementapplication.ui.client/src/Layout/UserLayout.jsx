import React from "react";
import { Outlet } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const Layout = () => {
  return (
    <div className="container mt-3">
      <Navbar color="light" light expand="md">
      <NavbarBrand href="#">CRM</NavbarBrand>
      <Nav className="me-auto" navbar> 
          <NavItem>
            <NavLink href="/UserListComponent/">Case Yönetimi</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
 
      <div style={{ padding: "20px" }}>
        <Outlet />  
      </div>
    </div>
  );
};

export default Layout;

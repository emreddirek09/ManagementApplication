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
            <NavLink href="/AdminComponent/">Kullanıcılar</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/AdminAllCaseComponent/">Case Yönetim</NavLink>
          </NavItem>
        </Nav>
        <NavbarBrand href="/">Hoşgeldin</NavbarBrand>
      </Navbar>
 
      <div style={{ padding: "20px" }}>
        <Outlet />  
      </div>
    </div>
  );
};

export default Layout;

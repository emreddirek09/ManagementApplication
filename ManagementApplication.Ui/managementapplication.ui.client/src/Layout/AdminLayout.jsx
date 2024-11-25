import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";

const Layout = () => {
  const fullName = localStorage.getItem("fullName");
  const navigate = useNavigate(); // useNavigate hook'u ile yönlendirme yapacağız

  // Çıkış fonksiyonu
  const handleLogout = () => {
    // localStorage'dan kullanıcı bilgilerini temizle
    localStorage.removeItem("fullName");
    localStorage.removeItem("token");
    // Ana sayfaya yönlendir
    navigate("/");
  };

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
        {fullName && (
          <>
            <NavbarBrand href="/">Hoşgeldin, {fullName}</NavbarBrand>
            <Button color="danger" onClick={handleLogout}>Çıkış Yap</Button>
          </>
        )}
      </Navbar>

      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

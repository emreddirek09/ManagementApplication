import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="container  mt-3">
      <Navbar color="light" expand="md" light>
          <NavbarBrand href="/">CRM</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink to="/AdminComponent" className="nav-link">
                  Kullanıcılar
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/AdminAllCaseComponent" className="nav-link">
                  Case Yönetim
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
       </Navbar>
    </div>
  );
};

export default HomePage;

// import React, { Component } from "react";
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink, 
//   NavbarText,
// } from "reactstrap";

// import AdminComponents from "../Components/AdminComponents";

// export default class HomePage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isOpen: false,  
//     };
//   }

//   toggle = () => {
//     this.setState({ isOpen: !this.state.isOpen }); 
//   };

//   render() {
//     return (
//       <div>
//         <Navbar color="light" expand="md" light>
//           <div className="container">
//             <NavbarToggler onClick={this.toggle} />
//             <Collapse isOpen={this.state.isOpen} navbar>
//             <NavbarBrand href="/">CRM</NavbarBrand>

//               <Nav className="me-auto" navbar>
//                 <NavItem>
//                   <NavLink href="/AdminComponents/">Kullanıcılar</NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink href="/UserListCompents/">Case Tönetim</NavLink>
//                 </NavItem> 
//               </Nav>
//               <NavbarText>Emre Direk</NavbarText>
//             </Collapse>
//           </div>
//         </Navbar>

//         <AdminComponents />
//       </div>
//     );
//   }
// }

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
    <div>
      <Navbar color="light" expand="md" light>
        <div className="container">
          <NavbarBrand href="/">CRM</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink to="/AdminComponents" className="nav-link">
                  Kullanıcılar
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/UserListCompents" className="nav-link">
                  Case Yönetim
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default HomePage;

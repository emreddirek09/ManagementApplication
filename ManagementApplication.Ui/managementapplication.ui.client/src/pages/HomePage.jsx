import React, { Component } from 'react'
import { Navbar, NavbarBrand } from 'reactstrap';
import UserListCompents from '../Components/UserListCompents';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" expand="md" light>
          <div className='container'>
          <NavbarBrand href="/">CRM</NavbarBrand>
          </div>
        </Navbar>

        <UserListCompents/> 
      </div>
    );
  }
}

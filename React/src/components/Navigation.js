import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar,Nav, NavbarToggle, NavbarCollapse } from 'react-bootstrap'

export class Navigation extends Component {
  render() {
    return (
      <Navbar bg='dark' expand='lg'>
        <NavbarToggle aria-controls='basic-navbar-nav'/>
        <NavbarCollapse id='basic-navbar-nav'>
            <Nav>
            <NavLink className='d-inline p-2 bg-dark text-white' to="/">Home</NavLink>
            <NavLink className='d-inline p-2 bg-dark text-white' to="/department">Department</NavLink>
            <NavLink className='d-inline p-2 bg-dark text-white' to="/employee">Employee</NavLink>
            </Nav>
        </NavbarCollapse>
      </Navbar>
    )
  }
}

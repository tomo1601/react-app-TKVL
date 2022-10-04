import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logoutIcon from '../../assets/people-icon.png'
import Button from 'react-bootstrap/esm/Button'
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const NavbarMenu = () => {

  const {authState: {isAuthenticated, isUser, isEmployer}, logoutSection} = useContext(AuthContext)
  
  const logout =() => logoutSection()
  
  let body

  if(isAuthenticated && isUser){
    body = (
      <Navbar expand = 'lg' bg ='primary' variant='dark' className='sc-fjqEFS cOCOrx menu-homepage'>
        <Navbar.Brand className='font-weigth-border text-white'>
          <Link className='link-to-dashboard-24' to='/dashboard'>
            Predictive Resume
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nar' />
        <Navbar.Collapse id='basic-navbar-nar'>
          <Nav className='mr-auto'>
            <Nav.Link className='font-weigth-border link-to-dashboard-20' to='/dashboard' as={Link}>
              Home
            </Nav.Link>
            <Nav.Link className='font-weigth-border link-to-dashboard-20' to='/dashboard' as={Link}>
              Job
            </Nav.Link>
            <Nav.Link className='font-weigth-border link-to-dashboard-20' to='/profile' as={Link}>
              Profile
            </Nav.Link>
          </Nav>
          <Nav className='sc-geuGuN cpxZcn rightNavigation-homepage'>
            <Nav.Link className='font-weigth-border link-to-dashboard-20' to='/employer/login' as={Link} >
              EMPLOYER
            </Nav.Link>
            <Button variant='secondary' className='font-weigth-border text-white' onClick={logout}>
              <img src={logoutIcon} alt='img' width='32' height='32' className='mr-2'/>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      
      </Navbar>
    )
  }
  else if(isAuthenticated && isEmployer){
    body = (
      <Navbar expand = 'lg' bg ='primary' variant='dark' className='sc-fjqEFS cOCOrx menu-homepage'>
        <Navbar.Brand className='font-weigth-border text-white'>
          <Link className='link-to-dashboard-24' to='/dashboard'>
            Predictive Resume
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nar' />
        <Navbar.Collapse id='basic-navbar-nar'>
          <Nav className='mr-auto'>
            <Nav.Link className='font-weigth-border link-to-dashboard-20' to='/dashboard' as={Link}>
              Home
            </Nav.Link>
            <Nav.Link className='font-weigth-border link-to-dashboard-20' to='/employer/posts' as={Link}>
              Job
            </Nav.Link>
            <Nav.Link className='font-weigth-border link-to-dashboard-20' to='dashboard' as={Link}>
              Company
            </Nav.Link>
            <Nav.Link className='font-weigth-border link-to-dashboard-20' to='/employer/profile' as={Link}>
              Profile
            </Nav.Link>
          </Nav>
          <Nav className='sc-geuGuN cpxZcn rightNavigation-homepage'>
            <Nav.Link className='font-weigth-border link-to-dashboard-20' to='/user/login' as={Link} >
              Employee
            </Nav.Link>
            <Button variant='secondary' className='font-weigth-border text-white' onClick={logout}>
              <img src={logoutIcon} alt='img' width='32' height='32' className='mr-2'/>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      
      </Navbar>
    )
  }

  return (
    <>
      {body}
    </>
    
  )
}

export default NavbarMenu
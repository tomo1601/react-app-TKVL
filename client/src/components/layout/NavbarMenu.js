import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logoutIcon from '../../assets/people-icon.png'
import Button from 'react-bootstrap/esm/Button'
import {Link} from 'react-router-dom'


const NavbarMenu = () => {
  return (
    <Navbar expand = 'lg' bg ='primary' variant='dark' className='sc-fjqEFS cOCOrx menu-homepage'>
      <Navbar.Brand className='font-weigth-border text-white'>
        <Link className='link-to-dashboard-24' to='/dashboard'>
          Predictive Resume
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nar' />
      <Navbar.Collapse id='basic-navbar-nar'>
        <Nav className='mr-auto'>
          <Nav.Link className='font-weigth-border text-white' to='/dashboard' as={Link}>
            Post
          </Nav.Link>
          <Nav.Link className='font-weigth-border text-white' to='/dashboard' as={Link}>
            Company
          </Nav.Link>
          <Nav.Link className='font-weigth-border text-white' to='/dashboard' as={Link}>
            EMPLOYER
          </Nav.Link>
        </Nav>
        <Nav className='sc-geuGuN cpxZcn rightNavigation-homepage'>
          <Nav.Link className='font-weigth-border text-white' disabled >
            Wellcom a
          </Nav.Link>
          <Button variant='secondary' className='font-weigth-border text-white'>
            <img src={logoutIcon} alt='img' width='32' height='32' className='mr-2'/>
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
      
    </Navbar>
  )
}

export default NavbarMenu
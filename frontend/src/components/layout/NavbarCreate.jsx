import React from 'react'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar as BSNavbar, Nav, Button } from 'react-bootstrap'
import { logout } from '../../store/auth'

// note: bootstrap navbar, can add custom css later
export const NavbarCreateUI = ({
  profileId,
  logout,
}) => {

  const tempId = 893740923

  const handleLogout = () => {
    logout()
  }

  return (
    <BSNavbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <BSNavbar.Brand href="/">PublicPotluck</BSNavbar.Brand>
      <BSNavbar.Toggle aria-controls="responsive-navbar-nav" />
      <BSNavbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/discover">
            <Nav.Link>Discover</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/create">
            <Nav.Link>Start a Potluck</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          {/* <LinkContainer to={`/profile/${profileId}`}> */}
          <LinkContainer to={`/profile/${tempId}`}>
            <Nav.Link>Profile</Nav.Link>
          </LinkContainer>
          <Button variant="light" size="sm" onClick={handleLogout} style={{marginLeft:10}}>
            Logout</Button>
        </Nav>
      </BSNavbar.Collapse>
    </BSNavbar>
  )
}

const mapStateToProps = (state) => ({
  profileId: state.auth
})

export const NavbarCreate = connect(
  mapStateToProps,
  // { logout }
)(NavbarCreateUI)
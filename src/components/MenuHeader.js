import React, {Component} from 'react'
import { Navbar, Nav} from 'react-bootstrap';

export class MenuHeader extends Component {

  render () {

    return (
      <header>
        <Navbar expand="lg" variant="dark" bg="dark">
          <Navbar.Brand>Precios Gasolineras</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">

              </Nav>
            </Navbar.Collapse>
        </Navbar>
      </header>
    )
  }
}

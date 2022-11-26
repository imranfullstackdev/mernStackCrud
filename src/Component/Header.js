import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="">MERN PROJECT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Link to="/" className="ml-3" style={{ textDecoration: 'none',marginRight:'12px', color:'black' }}>Login</Link>
                <Link to="/Register" style={{ textDecoration: 'none',marginRight:'12px', color:'black' }}>Register</Link>
              <Link to="/Logout" style={{ textDecoration: 'none',marginRight:'12px', color:'black' }}>Logout</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

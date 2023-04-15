import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand to="/" className="fs-1">
          Login Form
        </Navbar.Brand>
        <Nav className="me-2">
          <Link className="text-white fs-4 m-3" to="/">
            Home
          </Link>
          <Link className="text-white fs-4 m-3" to="/register">
            Register
          </Link>
          <Link className="text-white fs-4 m-3" to="/login">
            Login
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AddItemModal from "../components/AddItemModal";

const AdminNavbar = ({ user, saveUser, setUser }) => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const handleLogout = () => {
    saveUser(null); // This will remove the user from localStorage
    setUser(null); // This will update the user state in App.js
    navigate('/login'); // Redirect to the login page
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand to="/dashboard">Admin Bangiay</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to="/dashboard">Dashboard</Nav.Link>
            {/* Adjust other links as needed */}
          </Nav>
          {/* <Button variant="primary"
              onClick={() => setShowAddModal(true)}>
              thêm sản phẩm
              </Button> */}
              
          {user && (
            <Button variant="outline-danger" onClick={handleLogout} style={{ marginLeft: '5px' }}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;

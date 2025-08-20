
import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    
    <Nav defaultActiveKey="/home" className="flex-column bg-light p-3">
      <Nav.Link className='text-dark font-weight-bold' href="/home">Active</Nav.Link>
      <Nav.Link className="text-dark" eventKey="link-1">Link</Nav.Link>
      <Nav.Link className="text-dark" eventKey="link-2">Link</Nav.Link>
    </Nav>
  );
};

export default Sidebar;
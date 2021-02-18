import React from 'react';
import { Link } from 'react-router-dom';
import { Sidenav, Nav, Divider, Icon, Navbar } from 'rsuite';

const panelStyles = {
  padding: '15px 20px',
  color: '#aaa'
};

const headerStyles = {
  padding: 20,
  fontSize: 16,
  background: '#34c3ff',
  color: '#fff'
};

const Sidebar = () => {
  return (
    <div style={{ width: 250 }}>
      <Sidenav defaultOpenKeys={['3', '4']}>
        <Sidenav.Header>
          <div style={headerStyles}>Inventory Tracker</div>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav>
            <Nav.Item eventKey="1" active icon={<Icon icon="dashboard" />}>
              <Link to="/inventory">Dashboard</Link>
            </Nav.Item>
            
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  )
}

export default Sidebar;
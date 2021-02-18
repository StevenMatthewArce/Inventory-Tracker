import React from 'react';
import { Link } from 'react-router-dom';
import { Sidenav, Nav, Icon, Drawer } from 'rsuite';

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: '1',
      show: false,
    };
    this.close = this.close.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleToggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }

  render() {
    const { expanded } = this.state;

    return (
      <div style={{ width: 250 }}>
        <Sidenav expanded={expanded} activeKey={this.state.activeKey} onSelect={this.handleSelect}>
          <Sidenav.Body>
            <Nav>
              <Nav.Item eventKey="1" active icon={<Icon icon="dashboard" />}>
                <Link to="/dashboard"> Dashboard </Link>
              </Nav.Item>
              <Nav.Item eventKey="2" icon={<Icon icon="list" />}>
                <Link to='/inventory'> Inventory </Link>
              </Nav.Item>
              <Nav.Item eventKey="3" icon={<Icon icon="retention" />}>
                <Link to='/recipes'> Recipes </Link>
              </Nav.Item>
              <Nav.Item eventKey="4" icon={<Icon icon="tag" />}>
                <Link to='/orders'> Orders </Link>
              </Nav.Item>
              <Nav.Item eventKey="5" icon={<Icon icon="credit-card-alt" />}>
                <Link to='/budget'> Budget </Link>
              </Nav.Item>
              <Nav.Item eventKey="6" icon={<Icon icon="charts" />}>
                <Link to='/reports'> Reports </Link>
              </Nav.Item>
              <Nav.Item eventKey="7" icon={<Icon icon="bookmark-o" />}>
                <Link to='/goals'> Goals </Link>
              </Nav.Item>
              <Nav.Item eventKey="8" icon={<Icon icon="gear" />}>
                <Link to='/settings'> Settings </Link>
              </Nav.Item> 
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    )
  }
  
}

export default Sidebar;
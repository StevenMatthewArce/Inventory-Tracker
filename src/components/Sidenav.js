import React from 'react';
import {
  Icon,
  Menu,
  Sidebar} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Sidenav = (props) => {
    
  {
    return (
    
      <Sidebar
        as={Menu}
        animation='slide along'
        direction='left'
        icon='labeled'
        inverted
        vertical
        visible ={props.toggleMenu}
        width='thin'
      >
        <Menu.Item as={Link} to='/'>
          <Icon name='server' />
          Dashboard
        </Menu.Item>
        <Menu.Item as={Link} to='/inventory'>
          <Icon name='boxes' />
          Inventory
        </Menu.Item>
        <Menu.Item as={Link} to='/recipes'>
          <Icon name='sitemap' />
          Recipes
        </Menu.Item>
        <Menu.Item as={Link} to='/orders'>
          <Icon name='tasks' />
          Orders
        </Menu.Item>
        <Menu.Item as={Link} to='/budget'>
          <Icon name='sticky note' />
          Budget
        </Menu.Item>
        <Menu.Item as={Link} to='/reports'>
          <Icon name='list ul' />
          Reports         
        </Menu.Item>
        <Menu.Item as={Link} to='/goals'>
          <Icon name='check square'/>
          Goals        
        </Menu.Item>
        <Menu.Item as={Link} to='/settings'>
          <Icon name='settings' />
          Settings
        </Menu.Item>
      </Sidebar>
   
    )
  }
}

export default Sidenav;
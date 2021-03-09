import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash'
import { 
  Tab,
 } from 'semantic-ui-react';
import { Raw } from '../components/Inventory_Components';


const panes = [
  {
    menuItem: 'Raw Inventory',
    render: () => <Tab.Pane><Raw/></Tab.Pane>,
  },
  {
    menuItem: 'Finished Goods',
    render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
  },
]

class Inventory extends Component {


   render() {
    

    return (
        <Tab
          menu={{ color:'black', inverted: true, pointing: true}}
          panes={panes}
        />
  
    )
  }
}

export default Inventory;
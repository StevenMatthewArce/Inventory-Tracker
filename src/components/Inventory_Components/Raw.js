import React, { Component } from 'react'
import { 
    Table, Icon, Segment, Grid
   } from 'semantic-ui-react';

const tableData = [
    { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
    { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
    { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
    { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
    { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
    { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
    { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
    { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
    { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
    { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
    { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
    { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
    { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
    { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'},
    { name: 'Eggs', description: 'Egg', cost: '12.20', quantity: '100', dateRestocked: '12/12/2020', notes: 'none'}
  ]
  
  class Raw extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: tableData,
        expandedRows: []
      }
    }
    
    handleRowClick(rowId) {
      const currentExpandedRows = this.state.expandedRows;
      const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
  
      const newExpandedRows = isRowCurrentlyExpanded
        ? currentExpandedRows.filter(id => id !== rowId)
        : currentExpandedRows.concat(rowId);
  
      this.setState({ expandedRows: newExpandedRows });
    }
  
    // renderItemCaret(rowId) {
    //   const currentExpandedRows = this.state.expandedRows;
    //   const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
  
    //   if (isRowCurrentlyExpanded) {
    //     return <Icon name="caret down" />;
    //   } else {
    //     return <Icon name="caret right" />;
    //   }
    // }
  
    renderItemDetails(item) {
      return (
        <Segment basic>
          <Grid columns={2}>
            <Grid.Column>
              {item.description}
            </Grid.Column>
  
            <Grid.Column>
              {item.notes}
            </Grid.Column>
          </Grid>
        </Segment>
      );
    }
  
    renderItem(item, index) {
      const clickCallback = () => this.handleRowClick(index);
      const itemRows = [
        <Table.Row onClick={clickCallback} key={"row-data-" + index}>
          <Table.Cell textAlign= "center" >{item.name}</Table.Cell>
          <Table.Cell textAlign= "center" >{item.dateRestocked}</Table.Cell>
          <Table.Cell textAlign= "center" >{item.quantity}</Table.Cell>
          <Table.Cell textAlign= "center" >{item.cost}</Table.Cell>
        </Table.Row>
      ];
  
      if (this.state.expandedRows.includes(index)) {
        itemRows.push(
          <Table.Row key={"row-expanded-" + index}>
            <Table.Cell colSpan="4">{this.renderItemDetails(item)}</Table.Cell>
          </Table.Row>
        );
      }
  
      return itemRows;
    }
  
     render() {
      let allItemRows = [];
  
      this.state.data.forEach((item, index) => {
        const perItemRows = this.renderItem(item, index);
        allItemRows = allItemRows.concat(perItemRows);
      });
      return (
        
        <div style={{height: '100vh'}} >
        <Table celled fixed singleLine collapsing>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign= "center" width={4} >Name</Table.HeaderCell>
          <Table.HeaderCell textAlign= "center" width={2} >Date Restocked</Table.HeaderCell>
          <Table.HeaderCell textAlign= "center" width={2} >Quantity</Table.HeaderCell>
          <Table.HeaderCell textAlign= "center" width={2} >Cost</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body> {allItemRows}
      </Table.Body>
    </Table>
        </div>
      )
    }
  }
export default Raw

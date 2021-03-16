import React, { Component } from "react";
import { Table, Icon, Segment, Grid } from "semantic-ui-react";

const tableData = [
  {
    name: "Strawbery Shortcakes",
    quantity: 20,
    hoursPerProduct: 5,
    totalHours: 20 * 5,
  },
  {
    name: "Lemon Tart",
    quantity: 30,
    hoursPerProduct: 4,
    totalHours: 30 * 4,
  },
  {
    name: "Chocolate Log Cake",
    quantity: 10,
    hoursPerProduct: 7,
    totalHours: 10 * 7,
  }
];

class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: tableData,
      expandedRows: []
    };
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

 /* renderItemDetails(item) {
    return (
      <Segment basic>
        <Grid columns={2}>
          <Grid.Column>{item.description}</Grid.Column>

          <Grid.Column>{item.notes}</Grid.Column>
        </Grid>
      </Segment>
    );
  }*/

  renderItem(item, index) {
    const clickCallback = () => this.handleRowClick(index);
    const itemRows = [
      <Table.Row onClick={clickCallback} key={"row-data-" + index}>
        <Table.Cell textAlign="center">{item.name}</Table.Cell>
        <Table.Cell textAlign="center">{item.hoursPerProduct}</Table.Cell>
        <Table.Cell textAlign="center">{item.quantity}</Table.Cell>
        <Table.Cell textAlign="center">{item.totalHours}</Table.Cell>
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
      <div style={{ height: "100vh" }}>
        <Table celled fixed singleLine collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center" width={4}>
                Name
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" width={2}>
                Hours Per Product
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" width={2}>
                Quantity
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" width={2}>
                Total Hours
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body> {allItemRows}</Table.Body>
        </Table>
      </div>
    );
  }
}
export default Expense;

import React from 'react';

import { Grid, Segment, Table } from 'semantic-ui-react';

import { projectFirestore } from '../Firebase';

class RawMaterials extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [], 
      expandedRows: [],
    }
  }

  componentDidMount() {
    projectFirestore.collection('items')
      .orderBy('quantity', 'desc')
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id});
        })
        this.setState({
          items: documents,
        });
      });
  }

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter(id => id !== rowId)
      : currentExpandedRows.concat(rowId);

    this.setState({ expandedRows: newExpandedRows });
  }

  renderItemDetails(item) {
    return (
      <Segment basic>
        <Grid columns={2}>
          <Grid.Column>{item.description}</Grid.Column>
          <Grid.Column>{item.photo}</Grid.Column>
        </Grid>
      </Segment>
    )
  }

  renderItem(item, index) {
    const clickCallBack = () => this.handleRowClick(index);
    const itemRows = [
      <Table.Row onClick={clickCallBack} key={"row-data-" + index}>
        <Table.Cell textAlign='center'>{item.name}</Table.Cell>
        <Table.Cell textAlign='center'>{item.dateRestocked.toString()}</Table.Cell>
        <Table.Cell textAlign='center'>{item.quantity}</Table.Cell>
        <Table.Cell textAlign='center'>{item.cost}</Table.Cell>
      </Table.Row>
    ]
    if (this.state.expandedRows.includes(index)) {
      itemRows.push(
        <Table.Row key={'row-expanded-' + index}>
          <Table.Cell colSpan='4'>{this.renderItemDetails(item)}</Table.Cell>
        </Table.Row>
      )
    }
    return itemRows;
  }

  render() {
    let allItemRows = [];

    this.state.items.forEach((item, index) => {
      const perItemRows = this.renderItem(item, index);
      allItemRows = allItemRows.concat(perItemRows);
    })

    return (
      <div style={{ height: '100vh' }}>
        <Table celled fixed singleLine collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center' width={4}>
                Name
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center' width={2}>
                Date Restocked
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center' width={2}>
                Quantity
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center' width={2}>
                Cost
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {allItemRows}
          </Table.Body>
        </Table>
      </div>
    )
  }

}

export default RawMaterials;

import React, { useState } from "react";
import { Table, Icon, Segment, Grid } from "semantic-ui-react";
import db from '../Firebase/config';

const RawMaterials = () => {
  const [tableData, setData] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  const handleRowClick = (rowId) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter(id => id !== rowId)
      : currentExpandedRows.concat(rowId);

      setExpandedRows(newExpandedRows);
  }

  const renderItemDetails = (item) => {
    return (
      <Segment basic>
        <Grid columns={2}>
          <Grid.Column>{item.description}</Grid.Column>
          <Grid.Column>{item.photo}</Grid.Column>
        </Grid>
      </Segment>
    )
  }

  const renderItem = (item, index) => {
    const clickCallBack = () => handleRowClick(index);
    const itemRows = [
      <Table.Row onClick={clickCallBack} key={"row-data" + index}>
        <Table.Cell textAlign="center">{item.name}</Table.Cell>
        <Table.Cell textAlign="center">{item.dateRestocked}</Table.Cell>
        <Table.Cell textAlign="center">{item.quantity}</Table.Cell>
        <Table.Cell textAlign="center">{item.cost}</Table.Cell>
      </Table.Row>
    ]
    if (expandedRows.includes(index)) {
      itemRows.push(
        <Table.Row key={"row-expanded-" + index}>
          <Table.Cell colSpan="4">{renderItemDetails(item)}</Table.Cell>
        </Table.Row>
      );
    }

    return itemRows;
  }

  let allItemRows = [];

  tableData.forEach((item, index) => {
    const perItemRows = renderItem(item, index);
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
              Date Restocked
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" width={2}>
              Quantity
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" width={2}>
              Cost
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body> {allItemRows}</Table.Body>
      </Table>
    </div>
  );
}

export default RawMaterials;

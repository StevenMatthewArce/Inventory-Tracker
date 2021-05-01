import React, { Component } from "react";
import {
  Table,
  Dropdown,
  Grid,
  Header,
  Divider,
  Progress,
  Statistic,
  Button,
  Checkbox,
  Icon,
  Modal,
  Image,
  Segment,
  Message
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { db } from "../Firebase";

export class Sales extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      checked: [],
      error: null,
      message: null
    };
  }

  componentDidMount() {
    let documents = [];
    db.collection("sales")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
          // console.log(doc.id, " => ", doc.data());
        });
      })
      .then(() => {
        let data = [...documents.map(element => element[0])];

        data.map((element, index) => {
          element.SaleId = documents[index].id;
          element.soldDate = documents[index].currentdate;
        });
        this.setState({ data: data });
      });
  }

  toggleCheck = (e, { id }) => {
    let { checked } = this.state;

    if (checked.includes(id)) {
      console.log("it already in arry");
      const updatedArray = checked.filter(s => s !== id);
      this.setState({ checked: updatedArray, error: null, message: null });
    } else {
      console.log(" not in arry");
      checked.push(id);
      this.setState({ checked: checked, error: null, message: null });
    }
  };

  removeItem = () => {
    let { checked } = this.state;
    if (checked.length < 1) {
      this.setState({ error: "Please Check a Sale" });
    } else {
      checked.map(element => {
        db.collection("sales")
          .doc(element)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
            this.setState({ message: "Sucessfully removed Sale" });
          })
          .catch(error => {
            console.error("Error removing document: ", error);
            this.setState({ error: "Error removing doucment" });
          });
      });
    }
  };

  render() {
    const { data } = this.state;
    return (
      <Segment style={{ height: "100vh" }}>
        <div>
          {this.state.error && (
            <Message icon="frown" negative>
              {this.state.error}
            </Message>
          )}
        </div>
        <br />
        <div>
          <Grid columns="equal">
            <Grid.Column width={8}>
              <Header as="h1">Sales Tracking</Header>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button.Group>
                <Button
                  icon
                  labelPosition="left"
                  negative
                  size="small"
                  onClick={this.removeItem}
                >
                  <Icon name="close"></Icon>
                  Remove
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid>
        </div>

        <Divider />

        <div>
          <Table sortable celled definition structured>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell collapsing />
                <Table.HeaderCell width={2}>Date</Table.HeaderCell>
                <Table.HeaderCell width={3}>Customer</Table.HeaderCell>
                <Table.HeaderCell width={3}>Comments</Table.HeaderCell>
                <Table.HeaderCell width={6}>Items</Table.HeaderCell>
                <Table.HeaderCell width={2}>Labor Rate</Table.HeaderCell>
                <Table.HeaderCell width={2}>Total Labor</Table.HeaderCell>
                <Table.HeaderCell width={2}>Mark Up</Table.HeaderCell>
                <Table.HeaderCell width={2}>Total Cost</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            {data.map(items => {
              return (
                <Table.Body>
                  <Table.Row key={items.SalesId}>
                    <Table.Cell collapsing>
                      <Checkbox id={items.SalesId} onClick={this.toggleCheck} />
                    </Table.Cell>
                    <Table.Cell textAlign="center">{items.soldDate}</Table.Cell>
                    <Table.Cell textAlign="center">{items.name}</Table.Cell>
                    <Table.Cell textAlign="center">{items.comment}</Table.Cell>
                    <Table.Cell>
                      {items.items
                        .map(element => element.quantity + " " + element.name)
                        .join(", ")}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      ${items.laborRate}/hr
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {items.totalLabor}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{items.markUp}%</Table.Cell>
                    <Table.Cell textAlign="center">
                      ${items.orderCost}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              );
            })}
          </Table>
        </div>
      </Segment>
    );
  }
}

export default Sales;

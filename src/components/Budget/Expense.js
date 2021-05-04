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
import _ from "lodash";

//TODO: Add Expense Chart-Bar at the top
//TODO: Add Filters
//TODO: Add Selectable Rows

export class Expense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      column: null,
      direction: null,
      totalExpenseMonth: null,
      totalExpenseYear: null,
      totalSalesYear: null,
      expenseMonthPercentage: null,
      expenseYearPercentage: null,
      checked: [],
      modalOpen: false,
      receiptInformation: "",
      error: null,
      message: "",
      uid: props.uid
    };
  }

  componentDidMount() {
    let documents = [];
    db.collection("users")
      .doc(this.state.uid)
      .collection("receipts")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
          // console.log(doc.id, " => ", doc.data());
        });
      })
      .then(() => this.setState({ data: documents }))
      .then(() => this.calculateExpenseMonth());

    this.calculateExpenseYear();
  }

  //TODO: Add sorting alg
  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending"
      });
      return;
    }

    this.setState({
      data: data.slice().reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  calculateExpenseMonth = () => {
    const { data } = this.state;

    let totalExpenseMonth = 0;
    let totalExpenseYear = 0;
    let expenseMonthPercentage = 0;
    var currentdate = new Date();
    var cur_month = currentdate.getMonth() + 1;
    var cur_year = currentdate.getFullYear();
    data.filter(element => {
      let parts = element.date.split(/[/ :]/);
      let month = parts[0];
      let year = parts[2];
      if (cur_month == month && year == cur_year) {
        totalExpenseMonth += parseFloat(element.totalCost);
      }
      if (year == cur_year) {
        totalExpenseYear += parseFloat(element.totalCost);
      }
    });

    expenseMonthPercentage = (totalExpenseMonth / totalExpenseYear) * 100;

    this.setState(
      {
        totalExpenseMonth: totalExpenseMonth,
        totalExpenseYear: totalExpenseYear,
        expenseMonthPercentage: expenseMonthPercentage
      },
      this.props.handleExpenseData(
        totalExpenseMonth,
        totalExpenseYear,
        expenseMonthPercentage
      )
    );
  };

  calculateExpenseYear = () => {
    //TODO: Add code to calculate monthly expenses

    //! This is only for testing
    let totalSalesYear = "90000";
    this.setState({
      totalSalesYear: totalSalesYear
    });

    let expenseYearPercentage =
      (this.state.totalExpenseYear / totalSalesYear) * 100;
    this.setState({ expenseYearPercentage: expenseYearPercentage });
  };

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
      this.setState({ error: "Please Check a Receipt" });
    } else {
      checked.map(element => {
        db.collection("users")
          .doc(this.state.uid)
          .collection("receipts")
          .doc(element)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .catch(error => {
            console.error("Error removing document: ", error);
            this.setState({ error: "Error removing doucment" });
          });
      });
    }
  };

  handleModal = () => {
    let { checked, data, modalOpen } = this.state;

    if (checked.length != 1) {
      this.setState({ error: "Please Check a Receipt" });
    } else {
      let receipt = data.filter(element => element.id == checked[0]);
      this.setState({
        modalOpen: true,
        receiptInformation: receipt[0],
        error: null
      });
    }
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };
  render() {
    const { data, column, direction } = this.state;
    // console.log(this.state.checked);
    return (
      <Segment style={{ height: "100vh" }}>
        <div>
          <Grid centered columns={2}>
            <Grid.Column>
              <Grid.Row verticalAlign="top">
                <Statistic
                  size="mini"
                  color="orange"
                  value={this.state.totalExpenseMonth}
                  label="Total Expense This Month"
                />

                <Statistic
                  floated="right"
                  size="mini"
                  color="grey"
                  value={this.state.totalExpenseYear}
                  label="Total Expense This Year"
                />
              </Grid.Row>

              <Grid.Row verticalAlign="bottom">
                <Progress
                  color="orange"
                  percent={this.state.expenseMonthPercentage}
                />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row verticalAlign="top">
                <Statistic
                  size="mini"
                  color="olive"
                  value={this.state.totalExpenseYear}
                  label="Total Expense This Year"
                />

                <Statistic
                  floated="right"
                  size="mini"
                  color="grey"
                  value={this.state.totalSalesYear}
                  label="Total Sales"
                />
              </Grid.Row>

              <Grid.Row verticalAlign="bottom">
                <Progress
                  color="olive"
                  percent={this.state.expenseYearPercentage}
                />
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </div>
        <div>
          <div>
            {this.state.error && (
              <Message icon="frown" negative>
                {this.state.error}
              </Message>
            )}
          </div>
          <br />
          <Grid columns="equal">
            <Grid.Column width={8}>
              <Header as="h1">Expense Tracking</Header>
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
                <Button
                  color={"blue"}
                  icon
                  labelPosition="left"
                  size="small"
                  onClick={this.handleModal}
                >
                  <Icon name="image"></Icon>
                  View Receipt
                </Button>
                <Dropdown
                  className="ui small icon black left labeled button"
                  text="Add"
                  labeled
                  button
                >
                  <Dropdown.Menu>
                    <Dropdown.Item
                      icon="tasks"
                      iconPosition="left"
                      text="Receipts"
                      as={Link}
                      to="/addReceipt"
                    />
                    <Dropdown.Item
                      icon="tags"
                      iconPosition="left"
                      text="Items"
                      as={Link}
                      to="/addItem"
                    />
                  </Dropdown.Menu>
                </Dropdown>
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
                <Table.HeaderCell
                  width={2}
                  sorted={column === "Date" ? direction : null}
                  onClick={this.handleSort("Date")}
                >
                  Date
                </Table.HeaderCell>
                <Table.HeaderCell
                  width={3}
                  sorted={column === "Type" ? direction : null}
                  onClick={this.handleSort("Type")}
                >
                  Type
                </Table.HeaderCell>
                <Table.HeaderCell width={3}>Store</Table.HeaderCell>
                <Table.HeaderCell width={6}>Description</Table.HeaderCell>
                <Table.HeaderCell
                  width={2}
                  sorted={column === "Total" ? direction : null}
                  onClick={this.handleSort("Total")}
                >
                  Total
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            {data.map(items => {
              return (
                <Table.Body>
                  <Table.Row key={items.id}>
                    <Table.Cell collapsing>
                      <Checkbox id={items.id} onClick={this.toggleCheck} />
                    </Table.Cell>
                    <Table.Cell textAlign="center">{items.date}</Table.Cell>
                    <Table.Cell textAlign="center">{items.type}</Table.Cell>
                    <Table.Cell textAlign="center">{items.store}</Table.Cell>
                    <Table.Cell>{items.description}</Table.Cell>
                    <Table.Cell textAlign="center">
                      ${items.totalCost}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              );
            })}
          </Table>
        </div>
        <Modal open={this.state.modalOpen} size={"small"}>
          <Modal.Header>View Receipt</Modal.Header>
          <Modal.Content image>
            <Image
              size="medium"
              src={this.state.receiptInformation.imageAsUrl}
              wrapped
            />
            <Modal.Description>
              <Header as="h1">
                {this.state.receiptInformation.store +
                  " on " +
                  this.state.receiptInformation.date}
              </Header>
              <p>
                <b>Total Cost: </b>${this.state.receiptInformation.totalCost}
              </p>
              <p>
                <b>Description: </b>
                {this.state.receiptInformation.description}
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Ok"
              labelPosition="right"
              icon="checkmark"
              onClick={this.closeModal}
              positive
            />
          </Modal.Actions>
        </Modal>
      </Segment>
    );
  }
}

export default Expense;

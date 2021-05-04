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
      message: null,
      totalSaleMonth: null,
      totalSaleYear: null,
      saleMonthPercentage: null,
      mostPopularItem: null,
      uid: props.uid
    };
  }

  componentDidMount() {
    let documents = [];
    db.collection("users")
      .doc(this.state.uid)
      .collection("sales")
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
      })
      .then(() => this.calculateSaleMonth())
      .then(() => this.calculateMostPopularItem());
  }

  calculateSaleMonth = () => {
    const { data } = this.state;

    let totalSaleMonth = 0;
    let totalSaleYear = 0;
    var currentdate = new Date();
    var cur_month = currentdate.getMonth() + 1;
    var cur_year = currentdate.getFullYear();

    data.filter(element => {
      let parts = element.soldDate.split(/[/ :]/);
      console.log(parts);
      let month = parts[0];
      let year = parts[2];
      console.log(element);
      if (cur_month == month && year == cur_year) {
        totalSaleMonth += parseFloat(element.orderCost);
      }
      if (year == cur_year) {
        totalSaleYear += parseFloat(element.orderCost);
      }
    });

    let saleMonthPercentage = (totalSaleMonth / totalSaleYear) * 100;

    this.setState({
      totalSaleMonth: totalSaleMonth,
      totalSaleYear: totalSaleYear,
      saleMonthPercentage: saleMonthPercentage
    });
  };

  calculateMostPopularItem = () => {
    const { data } = this.state;

    let itemsSold = [];
    data.map(element => {
      element.items.map(x => {
        itemsSold.push(x.name);
      });
    });

    let mostPopItem = itemsSold
      .sort(
        (a, b) =>
          itemsSold.filter(v => v === a).length -
          itemsSold.filter(v => v === b).length
      )
      .pop();

    this.setState(
      { mostPopularItem: mostPopItem },
      console.log(this.state.mostPopularItem)
    );
  };

  toggleCheck = (e, { id }) => {
    let { checked } = this.state;

    if (checked.includes(id)) {
      console.log("it already in arry");
      const updatedArray = checked.filter(s => s !== id);
      this.setState(
        { checked: updatedArray, error: null, message: null },
        console.log(this.state.checked)
      );
    } else {
      console.log(" not in arry");
      checked.push(id);
      this.setState(
        { checked: checked, error: null, message: null },
        console.log(this.state.checked)
      );
    }
  };

  removeItem = () => {
    let { checked } = this.state;
    if (checked.length < 1) {
      this.setState({ error: "Please Check a Sale" });
    } else {
      checked.map(element => {
        console.log("removing" + element);
        db.collection("users")
          .doc(this.state.uid)
          .collection("sales")
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
    console.log(this.state.data);
    return (
      <Segment style={{ height: "100vh" }}>
        <div>
          <Grid centered columns={2}>
            <Grid.Column>
              <Grid.Row verticalAlign="top">
                <Statistic
                  size="mini"
                  color="orange"
                  value={"$" + this.state.totalSaleMonth}
                  label="Total Sale This Month"
                />

                <Statistic
                  floated="right"
                  size="mini"
                  color="grey"
                  value={"$" + this.state.totalSaleYear}
                  label="Total Sale This Year"
                />
              </Grid.Row>

              <Grid.Row verticalAlign="bottom">
                <Progress
                  color="orange"
                  percent={this.state.saleMonthPercentage}
                />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row>
                <div style={{ textAlign: "center" }}>
                  <Statistic
                    size="large"
                    color="blue"
                    value={this.state.mostPopularItem}
                    label="Most Popular Item SOld"
                  />
                </div>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </div>
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
                  <Table.Row key={items.SaleId}>
                    <Table.Cell collapsing>
                      <Checkbox id={items.SaleId} onClick={this.toggleCheck} />
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

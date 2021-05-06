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
import "./style.css"

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
      totalSaleYear: null,
      totalSaleMonth: null,
      expenseMonthPercentage: null,
      expenseYearPercentage: null,
      expenseScalePercentage: null,
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
    let newArry = []
    db.collection("users")
      .doc(this.state.uid)
      .collection("receipts")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
          // console.log(doc.id, " => ", doc.data());
        });
      }).then(()=>{
        let docs =[]
        db.collection("users")
        .doc(this.state.uid)
        .collection("items")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            docs.push({  ...doc.data(), id: doc.id });
            // console.log(doc.id, " => ", doc.data());
          })
          const reformatedData = docs.map(({cost:totalCost, dateRestocked:date, name: name, id: id}) =>{ return{id:id, totalCost: totalCost, date: date, name:name, description: name, type:"Item", store:"N/A", imageAsUrl: "" }})
          
          newArry = [...documents, ...reformatedData]
          this.setState({data: newArry}, this.calculateExpenseMonth(newArry))
        })
      })
      

    db.collection("users")
      .doc(this.state.uid)
      .get()
      .then(querySnapshot => {
        let { totalSaleMonth, totalSaleYear } = querySnapshot.data();
        this.setState(
          {
            totalSaleMonth: totalSaleMonth,
            totalSaleYear: totalSaleYear
          },
          this.caculateSaleExpense()
        );
      });
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

  calculateExpenseMonth = (newArry) => {
    const data = newArry


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

      () => {
        db.collection("users")
          .doc(this.state.uid)
          .update({
            totalExpenseMonth: totalExpenseMonth,
            totalExpenseYear: totalExpenseYear
          })
          .then(() =>
            this.props.handleExpenseData(
              totalExpenseMonth,
              totalExpenseYear,
              expenseMonthPercentage
            )
          );
      }
    );
  };

  caculateSaleExpense = () => {
    const {
      totalSaleMonth,
      totalSaleYear,
      totalExpenseMonth,
      totalExpenseYear
    } = this.state;

    let expenseScalePercentage = (totalExpenseYear / totalSaleYear) * 100;
    this.setState({ expenseScalePercentage: expenseScalePercentage });
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
    let { checked, data } = this.state;
    if (checked.length != 1) {
      this.setState({ error: "Please Check One Box" });
    } else {
      let type = data.filter(element=> element.id == checked)
      if(type[0].type == "Receipt")
      {
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
      }else{
        checked.map(element => {
          db.collection("users")
            .doc(this.state.uid)
            .collection("items")
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
    // console.log(this.state);
    return (
      <div>
        <div>
          <Grid centered columns={2}>
            <Grid.Column>
              <Grid.Row verticalAlign="top">
                <Header
                  floated="left"
                  size="medium"
                  textAlign="center"
                  style={{color:"#ff8369"}}
                  content={"$" + this.state.totalExpenseMonth}
                 subheader="Total Expense This Month"
                />

                <Header
                  floated="right"
                  size="medium"
                  style={{color:"#ff8369"}}
                  textAlign="center"
                  content={"$" + this.state.totalExpenseYear}
                  subheader="Total Expense This Year"
                />
                <Progress              
                  color="orange"
                  style={{ top: 50}}
                  percent={this.state.expenseMonthPercentage}
                />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row verticalAlign="top">
                <Header
                   floated="left"
                   size="medium"
                   textAlign="center"
                   style={{color:"#ff8369"}}
  
                  content={"$" + this.state.totalExpenseMonth}
                  subheader="Total Expense This Month"
                />

                <Header
                 floated="right"
                 size="medium"
                 style={{color:"#77c90e"}}
                 textAlign="center"
                  content={"$" + this.state.totalSaleMonth}
                  subheader="Total Sales This Month"
                />
                 <Progress              
                  color={this.state.totalExpenseMonth > this.state.totalSaleMonth ? "orange" : "green"}
                  style={{ top: 50}}
                  percent={this.state.expenseScalePercentage}
                />
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </div>
        <br/>
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
            <Grid.Column width={6}>
              <Header as="h1"style={{color:"#36393e"}} >Expense Tracking</Header>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button.Group>
              <Button
                  style={{backgroundColor:"#3db39c", color:"white"}}
                  icon
                  labelPosition="left"
                  size="small"
                  onClick={this.handleModal}
                >
                  <Icon name="image"></Icon>
                  View Receipt
                </Button>
                <Button
                  icon
                  labelPosition="left"
                  style={{backgroundColor:"#36393e", color:"#ffffff"}}
                  size="small"
                  onClick={this.removeItem}
                >
                  <Icon name="close"></Icon>
                  Remove
                </Button>
                
                <Dropdown
                  className="ui small icon  left labeled button"
                  style={{backgroundColor:"#77c90e", color:"#ffffff"}}
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

        <Divider  />
 
        <div className="container">
          <Table sortable celled definition structured>
            <Table.Header className="sticky-column">
              <Table.Row textAlign="center">
                <Table.HeaderCell  style={{backgroundColor:"#ffae3b", color: "white"}}collapsing />
                <Table.HeaderCell  style={{backgroundColor:"#ffae3b", color: "white"}}
                  width={2}
                  sorted={column === "Date" ? direction : null}
                  onClick={this.handleSort("Date")}
                >
                  Date
                </Table.HeaderCell>
                <Table.HeaderCell  style={{backgroundColor:"#ffae3b", color: "white"}}
                  width={3}
                  sorted={column === "Type" ? direction : null}
                  onClick={this.handleSort("Type")}
                >
                  Type
                </Table.HeaderCell>
                <Table.HeaderCell  style={{backgroundColor:"#ffae3b", color: "white"}}width={3}>Store</Table.HeaderCell>
                <Table.HeaderCell  style={{backgroundColor:"#ffae3b", color: "white"}}width={6}>Description</Table.HeaderCell>
                <Table.HeaderCell  style={{backgroundColor:"#ffae3b", color: "white"}}
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
              style={{backgroundColor:"#3db39c", color:"white"}}
            />
          </Modal.Actions>
        </Modal>
   </div>
    );
  }
}

export default Expense;

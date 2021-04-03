import React, { Component } from "react";
import {
  Form,
  Button,
  Message,
  Icon,
  Header,
  Divider,
  Grid,
  Dropdown
} from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import { projectFirestore } from "../Firebase";
import { Link } from "react-router-dom";

//TODO: Add logic to not submit unless required fields have been added

export class AddOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      name: "",
      dateReceived: "",
      dateNeededBy: "",
      comment: "",
      items: [],
      message: null,
      error: null
    };
  }

  componentDidMount() {
    let documents = [];
    projectFirestore.collection("recipes")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
          console.log(doc.id, " => ", doc.data());
        });
        console.log(documents);
      })
      .then(() => {
        const newDoc = [];
        for (var i = 0; i < documents.length; i++) {
          const { name } = documents[i];
          newDoc.push({ text: name, value: name, key: name, ...documents[i] });
        }

        this.setState({ recipes: newDoc });
      });
  }

  handleChange = (e, { name, value }) => {
    e.preventDefault();
    this.setState({ [name]: value }, console.log(this.state));
  };

  submit = e => {
    e.preventDefault();

    let { name, dateReceived, dateNeededBy, comment, items } = this.state;
    let finished = "0";

    projectFirestore.collection("orders")
      .add({ name, dateReceived, dateNeededBy, comment, items, finished })
      .then(() => {
        this.setState({ message: "Items has been submitted. " });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    return (
      <div style={{ height: "100vh" }}>
        <div>
          <Button labelPosition="left" icon secondary as={Link} to="/orders">
            Back
            <Icon name="left arrow"></Icon>
          </Button>
        </div>
        <br></br>
        <div>
          <Grid>
            <Grid.Column width={9}>
              <Grid.Row>
                <Header as="h1" textAlign="left">
                  Add an Order
                </Header>
                <Grid.Row>Please add your new orders.</Grid.Row>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={7} textAlign="right">
              <Button labelPosition="right" icon primary onClick={this.submit}>
                Submit
                <Icon name="send"></Icon>
              </Button>
            </Grid.Column>
          </Grid>
        </div>
        <Divider />
        <Form>
          <Form.Group>
            <Form.Input
              required
              icon="tag"
              iconPosition="left"
              width={12}
              //   id={items.id}
              label="Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <DateInput
              required
              width={2}
              dateFormat={"MM/DD/YYYY"}
              label="Date Received"
              name="dateReceived"
              value={this.state.dateReceived}
              iconPosition="left"
              onChange={this.handleChange}
            />
            <DateInput
              required
              width={2}
              dateFormat={"MM/DD/YYYY"}
              label="Date Needed By"
              name="dateNeededBy"
              value={this.state.dateNeededBy}
              iconPosition="left"
              onChange={this.handleChange}
            />
          </Form.Group>
          <b>Add Item:</b>
          <Dropdown
            required
            labeled="Add Item"
            name="items"
            placeholder="Items"
            fluid
            multiple
            selection
            options={this.state.recipes}
            onChange={this.handleChange}
          ></Dropdown>
          <br />
          <Form.TextArea
            width={20}
            name="comment"
            style={{ minHeight: 100 }}
            label="Description:"
            placeholder="This is some comment about the order"
            onChange={this.handleChange}
          />
        </Form>
        {this.state.message && <Message positive>{this.state.message}</Message>}
        {this.state.error && <Message negative>{this.state.error}</Message>}
      </div>
    );
  }
}

export default AddOrder;

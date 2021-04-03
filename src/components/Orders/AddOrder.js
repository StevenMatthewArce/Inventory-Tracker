import React, { Component } from "react";
import {
  Form,
  Button,
  Message,
  Icon,
  Header,
  Divider,
  Grid,
  Card,
  Dropdown
} from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import { db } from "../Firebase";
import { Link } from "react-router-dom";

const options = [
  { key: "angular", text: "Angular", value: "angular" },
  { key: "css", text: "CSS", value: "css" },
  { key: "design", text: "Graphic Design", value: "design" },
  { key: "ember", text: "Ember", value: "ember" },
  { key: "html", text: "HTML", value: "html" },
  { key: "ia", text: "Information Architecture", value: "ia" },
  { key: "javascript", text: "Javascript", value: "javascript" },
  { key: "mech", text: "Mechanical Engineering", value: "mech" },
  { key: "meteor", text: "Meteor", value: "meteor" },
  { key: "node", text: "NodeJS", value: "node" },
  { key: "plumbing", text: "Plumbing", value: "plumbing" },
  { key: "python", text: "Python", value: "python" },
  { key: "rails", text: "Rails", value: "rails" },
  { key: "react", text: "React", value: "react" },
  { key: "repair", text: "Kitchen Repair", value: "repair" },
  { key: "ruby", text: "Ruby", value: "ruby" },
  { key: "ui", text: "UI Design", value: "ui" },
  { key: "ux", text: "User Experience", value: "ux" }
];

export class AddOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  //   handleChange = (e, { name, id, value }) => {
  //     e.preventDefault();
  //     let items = this.state.items;

  //     items[id] = { ...items[id], [name]: value };
  //     this.setState({ items: items }, console.log(this.state));
  //   };

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
        <Divider />{" "}
        <Form>
          <Form.Group>
            <DateInput
              required
              width={6}
              dateFormat={"MM/DD/YYYY"}
              label="Date Received"
              name="dateRestocked"
              // value={}
              iconPosition="left"
              // onChange={this.handleChange}
            />
            <DateInput
              required
              width={6}
              dateFormat={"MM/DD/YYYY"}
              label="Date Required"
              name="dateRestocked"
              // value={}
              iconPosition="left"
              // onChange={this.handleChange}
            />
            <Form.Input
              required
              icon="tag"
              iconPosition="left"
              width={4}
              //   id={items.id}
              label="Name"
              name="name"
              //   value={items.name}
              //   onChange={this.handleChange}
            />
          </Form.Group>
          <Dropdown
            required
            labeled="Add Item"
            placeholder="Items"
            fluid
            multiple
            selection
            options={options}
          />
          <Form.TextArea
            width={20}
            name="description"
            style={{ minHeight: 100 }}
            label="Description:"
            placeholder="This is some comment about the receipt"
            // onChange={this.handleChange}
          />
        </Form>
      </div>
    );
  }
}

export default AddOrder;

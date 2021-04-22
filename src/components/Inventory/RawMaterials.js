import React, { Component, useState } from "react";
import {
  Table,
  Dropdown,
  Grid,
  Header,
  Divider,
  Search
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import _ from "lodash";

const data = [
  {
    cost: "5.00",
    dateRestocked: "01-06-2021",
    description: "This is an Apples Test 1",
    id: "C3vt9MLMcEPD8tpa8MyC",
    imageAsUrl: "",
    name: "Apples",
    quantity: "10"
  },
  {
    cost: "32.99",
    dateRestocked: "01-09-2021",
    description: "This is an Oranges Test 1",
    id: "brsSdYjT5VTfFOPtW8JD",
    imageAsUrl: "",
    name: "Oranges",
    quantity: "19"
  },
  {
    cost: "3.56",
    dateRestocked: "01-01-2021",
    description: "This is an Oranges Test 2",
    id: "qQlC3RfRomdQoqXjtggg",
    imageAsUrl: "",
    name: "Oranges",
    quantity: "11"
  }
];

const ExpandableTableRow = props => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);

  const toggleStyle = {
    display: isOpen ? "table-row" : "none"
  };

  const { data, value } = props;

  console.log(props);
  return (
    <>
      <Table.Body>
        <Table.Row key={value} onClick={handleToggle}>
          <Table.Cell textAlign="center">{value}</Table.Cell>
        </Table.Row>
        <Table.Row style={toggleStyle}>
          {Object.keys(data).map(value => {
            return <div>{console.log(value)}Test</div>;
          })}
        </Table.Row>
      </Table.Body>
    </>
  );
};

export class RawMaterials extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      column: null,
      direction: null,
      isLoading: false,
      results: [],
      value: ""
    };
  }

  componentDidMount() {
    //!Uncomment this when firebase is back up
    // db.collection("items")
    //   .orderBy("quantity", "desc")
    //   .onSnapshot(snap => {
    //     let documents = [];
    //     snap.forEach(doc => {
    //       documents.push({ ...doc.data(), id: doc.id });
    //     });
    //     var catagories = _.groupBy(documents, items => {
    //       return items.name;
    //     });
    //     this.setState({
    //       data: catagories
    //     });
    //   });
    //!Uncomment this when firebase is back up
    var catagories = _.groupBy(data, items => {
      return items.name;
    });
    this.setState({ data: catagories });
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        categoryNames: _.sortBy(data, [clickedColumn]),
        direction: "ascending"
      });
      return;
    }

    this.setState({
      categoryNames: data.slice().reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  handleResultSelect = (e, { result }) => this.setState({ value: result.name });

  handleSearchChange = (e, { value }) => {
    const { data } = this.state;
    const { name } = data;
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.name);

      this.setState({
        isLoading: false,
        results: _.filter(data, isMatch)
      });
    }, 300);
  };

  render() {
    const { data, column, direction, isLoading, value, results } = this.state;

    const resRender = ({ name, cost, quantity }) => {
      return (
        <div key="name">
          <Grid columns="equal">
            <Grid.Column>Material Name: {name}</Grid.Column>
            <Grid.Column>Quantity: {quantity}</Grid.Column>
            <Grid.Column>Cost: {cost}</Grid.Column>
          </Grid>
        </div>
      );
    };

    console.log(this.state);

    return (
      <div>
        <div>
          <Grid columns="equal">
            <Grid.Column width={12}>
              <Header as="h1">Raw Materials</Header>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Dropdown
                text="Add"
                icon="plus square outline"
                labeled
                button
                className="icon"
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    content="Item"
                    icon=""
                    labelPosition="right"
                    as={Link}
                    to="/addItem"
                  />
                  <Dropdown.Item
                    content="Recipe"
                    icon=""
                    labelPosition="right"
                    as={Link}
                    to="/addRecipe"
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
          </Grid>
        </div>
        <Divider />
        <div>
          <Grid>
            <Grid.Column>
              <Search
                fluid
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true
                })}
                results={results}
                value={value}
                resultRenderer={resRender}
              />
            </Grid.Column>
          </Grid>
        </div>
        <div>
          <Table sortable celled selectable>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell
                  width={6}
                  sorted={column === "name" ? direction : null}
                  onClick={this.handleSort("name")}
                >
                  Material Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  width={6}
                  sorted={column === "description" ? direction : null}
                  onClick={this.handleSort("description")}
                >
                  Description
                </Table.HeaderCell>

                <Table.HeaderCell width={1}>Quantity</Table.HeaderCell>
                <Table.HeaderCell width={1}>Cost Per Item</Table.HeaderCell>
                <Table.HeaderCell
                  width={2}
                  sorted={column === "dateRestocked" ? direction : null}
                  onClick={this.handleSort("dateRestocked")}
                >
                  Date Restocked
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {Object.keys(data).map(value => {
              return <ExpandableTableRow data={data} value={value} />;
            })}
          </Table>
        </div>
      </div>
    );
  }
}

export default RawMaterials;

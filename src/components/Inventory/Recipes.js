import React, { Component } from "react";
import {
  Table,
  Dropdown,
  Grid,
  Header,
  Divider,
  Search,
  Checkbox,
  Button,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import _ from "lodash";

export class Recipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      column: null,
      direction: null,
      isLoading: false,
      results: [],
      value: "",
      checked: [],
      error: null,
      message: null
    };
  }

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

  componentDidMount() {
    db.collection("recipes").onSnapshot(snap => {
      let documents = [];
      snap.forEach(doc => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      this.setState({
        data: documents
      });
    });
  }

  handleResultSelect = (e, { result }) => this.setState({ value: result.name });

  handleSearchChange = (e, { value }) => {
    const { data } = this.state;
    const { name } = data;

    console.log(data);
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

  toggleCheck = (e, { id }) => {
    let { checked } = this.state;
    checked.push(id);
    this.setState(
      { checked: checked, error: null, message: null },
      console.log(this.state.checked)
    );
  };

  removeItem = () => {
    let { checked } = this.state;
    if (checked.length < 1) {
      this.setState({ error: "Please Check a Recipe" });
    } else {
      checked.map(element => {
        db.collection("recipes")
          .doc(element)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
            this.setState({ message: "Sucessfully removed Recipe" });
          })
          .catch(error => {
            console.error("Error removing document: ", error);
            this.setState({ error: "Error removing doucment" });
          });
      });
    }
  };
  render() {
    const { data, column, direction, isLoading, value, results } = this.state;
    console.log(this.state);
    const resRender = ({ name, receipeCost, items }) => {
      return (
        <div key="name">
          <Grid>
            <Grid.Column width={5}>Recipe Name: {name}</Grid.Column>
            <Grid.Column width={5}>
              Ingredients: {items.map(element => element.name).join(", ")}{" "}
            </Grid.Column>
            <Grid.Column width={2}>Cost: ${receipeCost}</Grid.Column>
          </Grid>
        </div>
      );
    };
    return (
      <div>
        <div>
          <div>
            {this.state.error && (
              <Message icon="frown" negative>
                {this.state.error}
              </Message>
            )}
            {this.state.message && (
              <Message icon="smile" positive>
                {this.state.message}
              </Message>
            )}
          </div>
          <br />
          <Grid columns="equal">
            <Grid.Column width={8}>
              <Header as="h1">Recipes</Header>
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
                <Dropdown
                  className="ui small icon black left labeled button"
                  text="Add"
                  labeled
                  button
                >
                  <Dropdown.Menu>
                    <Dropdown.Item
                      content="Recipe"
                      icon="list alternate outline"
                      labelPosition="right"
                      as={Link}
                      to="/addRecipe"
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Button.Group>
            </Grid.Column>
          </Grid>
        </div>
        <Divider />
        <div>
          <Grid>
            <Grid.Column>
              <Search
                className="search-area"
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
        <br />
        <div>
          <Table sortable celled definition structured>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell />
                <Table.HeaderCell
                  width={2}
                  sorted={column === "name" ? direction : null}
                  onClick={this.handleSort("name")}
                >
                  Recipe Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  width={5}
                  sorted={column === "description" ? direction : null}
                  onClick={this.handleSort("description")}
                >
                  Description
                </Table.HeaderCell>
                <Table.HeaderCell width={5}>Ingredients</Table.HeaderCell>
                <Table.HeaderCell width={2}>Qty Produced</Table.HeaderCell>
                <Table.HeaderCell width={1}>Labor (hrs)</Table.HeaderCell>
                <Table.HeaderCell width={1}>Unit Cost</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {data.map(items => {
              return (
                <Table.Body>
                  <Table.Row key={items.id}>
                    <Table.Cell collapsing>
                      <Checkbox id={items.id} onClick={this.toggleCheck} />
                    </Table.Cell>
                    <Table.Cell textAlign="center">{items.name}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {items.description}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {items.items.map(element => element.name).join(", ")}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {items.qtyProduced}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {items.totalLabor}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      ${items.receipeCost}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              );
            })}
          </Table>
        </div>
      </div>
    );
  }
}

export default Recipes;

import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  Dropdown,
  Grid,
  Header,
  Divider,
  Search,
  Icon,
  Modal,
  Button,
  Form,
  Checkbox,
  Message,
  Tab
} from "semantic-ui-react";

import { Link } from "react-router-dom";
import { db } from "../Firebase";
import "./style.css";

import _ from "lodash";

const RawMaterials = props => {
  const [data, setData] = useState([]);
  const [alertValue, setAlertValue] = useState(0);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [checked, setChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState([false]);
  const [isModalOpen, setModalOpen] = useState(false);
  const uid = props.uid;

  useEffect(() => {
    let docs = [];
    db.collection("users")
      .doc(uid)
      .collection("items")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setData(_.groupBy(docs, items => items.name));
      });
  }, []);

 
  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .get()
      .then(querySnapshot => {
        let { alertValue } = querySnapshot.data();
        console.log(alertValue);
        setAlertValue(alertValue);
      });
  }, [1]);

  const removeItem = () => {
    if (checked.length < 1) {
      setError("Please check a box!");
    } else {
      checked.map(element => {
        db.collection("users")
          .doc(uid)
          .collection("items")
          .doc(element)
          .delete()
          .then(() => {
            setError(null);
            setMessage("Item sucessfully deleted!");
            setTimeout(() => setMessage(null), 500);
          })
          .catch(error => {
            setError("Item deletion unsucessful!");
          });
      });
    }
  };

  const handleModal = () => setModalOpen(!isModalOpen);

  const handleResultSelect = (e, { result }) => setValue(result.name);
  const handleSearchChange = (e, { value }) => {
    const keys = Object.keys(data);
    setIsLoading(true);

    setTimeout(() => {
      const re = new RegExp(_.escapeRegExp(value), "i");
      const isMatch = result => re.test(result);

      setIsLoading(false);
      setResults(_.filter(keys, isMatch));
    }, 300);
  };

  const resRender = () => {
    const items = data[results[0]];
    return (
      <>
        {items.map(element => {
          return (
            <Grid columns="equal">
              <Grid.Column>Name: {element.name} </Grid.Column>
              <Grid.Column>Quantity: {element.qty}</Grid.Column>
              <Grid.Column>Cost: {element.cost}</Grid.Column>
            </Grid>
          );
        })}
      </>
    );
  };

  const handleToggle = index => {
    let x = [];
    x[index] = !isOpen[index];
    setIsOpen(x);
  };

  const toggleCheck = (e, { id }) => {
    let checked = [];
    checked.push(id);
    setChecked(checked);
  };

  const updateUserSetting = e => {
    db.collection("users")
      .doc(uid)
      .update({ alertValue: alertValue })
      .then(() => setModalOpen(!isModalOpen));
  };

  return (
    <div>
      <div>
        {error && (
          <Message icon="frown" negative>
            {error}
          </Message>
        )}
        {message && (
          <Message icon="smile" positive>
            {message}
          </Message>
        )}
      </div>
      <br />
      <Grid columns="equal">
        <Grid.Column width={8}>
          <Header as="h1" style={{color:"#36393e"}}>Raw Materials</Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Grid.Row>
            <Button.Group>
              <Button
                icon
                labelPosition="left"
                style={{backgroundColor:"#36393e", color:"#ffffff"}}
                size="small"
                onClick={removeItem}
              >
                <Icon name="close"></Icon>
                Remove
              </Button>
              <Dropdown
                className="ui small icon left labeled button"
                style={{backgroundColor:"#77c90e", color:"#ffffff"}}
                text="Add"
                labeled
                button
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    content="Item"
                    icon="tags"
                    labelPosition="right"
                    as={Link}
                    to="/addItem"
                  />
                  <Dropdown.Item
                    content="Alert"
                    icon="exclamation"
                    labelPosition="right"
                    onClick={handleModal}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Button.Group>
          </Grid.Row>
        </Grid.Column>
      </Grid>
      <Divider />
      <div>
        <Grid>
          <Grid.Column>
            <Search
              className="search-area"
              loading={isLoading}
              onResultSelect={handleResultSelect}
              onSearchChange={_.debounce(handleSearchChange, 500, {
                leading: true
              })}
              results={results}
              value={value.name}
              resultRenderer={resRender}
            />
          </Grid.Column>
        </Grid>
      </div>
      <br />
      <div>
        <Table id="table" celled selectable structured definition>
          <Table.Header style={{backgroundColor:"#ffae3b", color: "white"}}>
            <Table.Row textAlign="center">
              <Table.HeaderCell style={{backgroundColor:"#ffae3b", color: "white"}} />
              <Table.HeaderCell style={{backgroundColor:"#ffae3b", color: "white"}} width={6}>Material Name</Table.HeaderCell>
              <Table.HeaderCell style={{backgroundColor:"#ffae3b", color: "white"}} width={6}>Description</Table.HeaderCell>

              <Table.HeaderCell  style={{backgroundColor:"#ffae3b", color: "white"}} width={1}>Quantity</Table.HeaderCell>
              <Table.HeaderCell  style={{backgroundColor:"#ffae3b", color: "white"}} width={1}>Unit Cost</Table.HeaderCell>
              <Table.HeaderCell style={{backgroundColor:"#ffae3b", color: "white"}}  width={2}>Date Restocked</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {Object.keys(data).map((value, index) => {
            const items = data[value];

            let totalCost = 0;
            let totalQty = 0;

            items.forEach(element => {
              totalCost += parseFloat(element.cost);
              totalQty += parseFloat(element.quantity);
            });
            totalCost = totalCost / items.length;
            totalCost = totalCost.toFixed(2);
            const restockedDatesSorted = items
              .map(element => element.dateRestocked)
              .sort((a, b) => {
                return Date.parse(a) - Date.parse(b);
              });

             
            return (
              <Table.Body>
                <Table.Row         
                   negative={totalQty >= alertValue ? false : true}

                  key={value}
                  onClick={() => handleToggle(index)}
                >
                  <Table.Cell collapsing></Table.Cell>
                  <Table.Cell textAlign="center">
                    <Icon name="dropdown" />
                    {value}
                  </Table.Cell>
                  <Table.Cell textAlign="center">{}</Table.Cell>
                  <Table.Cell id="quantity" textAlign="center">
                    {totalQty}
                  </Table.Cell>
                  <Table.Cell textAlign="center">${totalCost}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {restockedDatesSorted[0]}
                  </Table.Cell>
                </Table.Row>
                {items.map(items => {
                  return (
                    <Table.Row
                      key={items.id}
                      style={
                        isOpen[index]
                          ? { display: "table-row" }
                          : { display: "none" }
                      }
                      negative={totalQty >= alertValue ? false : true}
                    >
                      <Table.Cell collapsing>
                        <Checkbox id={items.id} onClick={toggleCheck} />
                      </Table.Cell>
                      <Table.Cell textAlign="left">{items.name}</Table.Cell>
                      <Table.Cell textAlign="center">
                        {items.description}
                      </Table.Cell>
                      <Table.Cell id={"alert"} textAlign="center">
                        {items.quantity}
                      </Table.Cell>
                      <Table.Cell textAlign="center">${items.cost}</Table.Cell>
                      <Table.Cell textAlign="center">
                        {items.dateRestocked}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            );
          })}
        </Table>
      </div>
      <Modal open={isModalOpen} size={"small"}>
        <Modal.Header>Change Alert Setting</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Raw Material Alert</Header>
            <p>
              The raw material row will get highlighted when it falls below a
              certain quantity.
            </p>
            <p>Please select the minimum quantity before sending an alert.</p>
            <Form>
              <Form.Input
                label="Alert Minimum Quantity:"
                name="alertValue"
                value={alertValue}
                onChange={e => setAlertValue(e.target.value)}
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Ok"
            labelPosition="right"
            icon="checkmark"
            positive
            onClick={updateUserSetting}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default RawMaterials;

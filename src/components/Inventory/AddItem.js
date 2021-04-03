import React, { useState } from "react";

import { projectStorage } from "../Firebase";
import { useStorage } from '../../hooks';

import { InputFile } from "semantic-ui-react-input-file";
import { DateInput } from "semantic-ui-calendar-react";
import {
  Form,
  Button,
  Message,
  Icon,
  Header,
  Divider,
  Grid,
  TextArea
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const AddItem = () => {
  const [item, setItem] = useState();
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [cost, setCost] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [dateRestocked, setDate] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [url, setUrl] = useState(null);

  const imageTypes = ["image/png", "image/jpeg"];

  const handlePhotoChange = e => {
    let selected = e.target.files[0];

    if (selected && imageTypes.includes(selected.type)) {
      setPhoto(selected);
      setError(null);
    } else {
      setPhoto(null);
      setError("File must be an image (png or jpeg");
    }
  };

  const handleDateChange = (name, value) => {
    setDate(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    url = useStorage();
    
    setItem({
      name: name,
      description: description,
      cost: cost,
      quantity: quantity,
      dateRestocked: dateRestocked,
      url: url,
    });

    projectStorage.collection("items")
      .add({ name, description, cost, quantity, dateRestocked, url })
      .then(() => {
        setMessage("Item has been submitted. ");
      })
      .catch(err => {
        setError(err);
      });
  };

  const isInvalid =
    name === "" || dateRestocked === null || quantity === 0 || cost === 0;

  return (
    <div className="add-item" style={{ height: "100vh" }}>
      <div>
        <Button labelPosition="left" icon secondary as={Link} to="/inventory">
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
                Add an Item
              </Header>
              <Grid.Row>Please add your new item.</Grid.Row>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={7} textAlign="right"></Grid.Column>
        </Grid>
      </div>
      <Divider />
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
        <Form>
          <Form onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                placeholder="Name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                label="Name"
                required
              />
              <Form.Input
                placeholder="Cost"
                name="cost"
                value={cost}
                onChange={e => setCost(e.target.value)}
                label="Cost"
                required
              />
              <Form.Input
                placeholder="Quantity"
                name="quantity"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                label="Quantity"
                required
              />
              <DateInput
                required
                label="Date Restocked"
                name="dateRestocked"
                value={dateRestocked}
                iconPosition="left"
                onChange={(e, { name, value }) => handleDateChange(name, value)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                placeholder="Add additional information"
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                label="Description"
                control={TextArea}
              />
              <Form.Field>
                <label>Choose photo</label>
                <InputFile
                  input={{
                    id: "input-control-id",
                    onChange: handlePhotoChange
                  }}
                  value={photo}
                />
              </Form.Field>
            </Form.Group>
            <Button
              primary
              disabled={isInvalid}
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </Form>
      </div>
    </div>
  );
};

export default AddItem;

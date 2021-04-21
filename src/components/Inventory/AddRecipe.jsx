import React, { useState, useEffect } from 'react';

import {
  Form,
  Button,
  Message,
  Icon,
  Header,
  Divider,
  Grid,
  Dropdown
} from 'semantic-ui-react';
import { db } from '../Firebase';
import { Link } from 'react-router-dom';

const AddRecipe = () => {
  const [name, setName] = useState(null);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    let docs = [];
    db.collection('items')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        })
      })
      .then(() => {
        const newDoc = [];
        for (let i = 0; i < docs.length; i++) {
          const { name } = docs[i];
          newDoc.push({ text: name, value: name, key: name, ...docs[i] });
        }
        setDocuments(newDoc);
      })
  }, [documents]);

  const handleItemChange = (e, { value}) => setItems({ value });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, items, description);

    db.collection('recipes')
      .add({ name, items, description })
      .then(() => {
        setMessage('Recipe has been submitted. ');
      })
      .catch((err) => {
        setError(err);
      })
  }

  return (
    <div style={{ height: '100vh' }}>
      <div>
        <Button labelPosition='left' icon secondary as={Link} to='/inventory'>
          Back
          <Icon name='left arrow' />
        </Button>
      </div>
      <br />
      <div>
        <Grid>
          <Grid.Column width={9}>
            <Grid.Row>
              <Header as='h1' textAlign='left'>
                Add a Recipe
              </Header>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={7} textAlign='right'>
            <Button labelPosition='right' icon primary onClick={handleSubmit}>
              Submit
              <Icon name='send' />
            </Button>
          </Grid.Column>
        </Grid>
      </div>
      <Divider />
      <Form>
        <Form.Group>
          <Form.Input 
            required
            icon='tag'
            iconPosition='left'
            width={12}
            label='Name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>
        <b>Add Items:</b>
        <Dropdown
            required
            labeled="Add Item"
            name="items"
            placeholder="Items"
            fluid
            multiple
            selection
            search
            scrolling
            options={documents}
            value={items}
            onChange={handleItemChange}
        />
        <br />
        <Form.TextArea 
          width={20}
          name='description'
          style={{ minHeight: 100 }}
          label='Description'
          placeholder='Add a description about this recipe'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </Form>
      {message && <Message positive>{message}</Message>}
      {error && <Message negative>{error}</Message>}
    </div>
  )
}

export default AddRecipe;
import React from 'react';

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
import { Link, Redirect } from 'react-router-dom';

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      items: [],
      message: null,
      error: null,
      documents: [],
      description: null,
    }
  }

  componentDidMount() {

    let docs = [];
    db.collection('items')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
          console.log(doc.id, '=>', doc.data());
        })
      })
      .then(() => {
        const newDoc = [];
        for (let i = 0; i < docs.length; i++) {
          const { name } = docs[i];
          newDoc.push({ text: name, value: name, key: name, ...docs[i] });
        }
        this.setState({ documents: newDoc });
      })
  }

  handleChange = (e, { name, value }) => {
    e.preventDefault();
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let { name, items, description } = this.state;

    db.collection('recipes')
      .add({ name, items, description })
      .then(() => {
        this.setState({ message: 'Recipe has been submitted. ' });
        this.handleRedirect();
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  };

  handleRedirect() {
    setTimeout(() => {
      return <Redirect to='/inventory' />
    }, 3000) // 3 seconds
  }

  render() {
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
              <Button labelPosition='right' icon primary onClick={this.handleSubmit}>
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
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
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
            options={this.state.documents}
            value={this.state.items}
            onChange={this.handleChange}
          />
          <br />
          <Form.TextArea
            width={20}
            name='description'
            style={{ minHeight: 100 }}
            label='Description'
            placeholder='Add a description about this recipe'
            value={this.state.description}
            onChange={this.handleChange}
          />
        </Form>
        {this.state.message && <Message positive>{this.state.message}</Message>}
        {this.state.error && <Message negative>{this.state.error}</Message>}
      </div>
    )
  }
}
export default AddRecipe;
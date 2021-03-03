import React from 'react';
import {
  Form,
  Input,
  TextArea 
} from 'semantic-ui-react';
import { handleAddItem } from '../Firebase';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        uid: null,
        name: null,
        description: null,
        cost: null,
        quantity: null,
        dateRestocked: null,
        photo: null
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="add-item">
        <Form onSubmit={ handleAddItem }>
          <Form.Group widths='equal'>
            <Form.Field required>
              <label>Name</label>
              <Input fluid placeholder='Name of item' onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field required>
              <label>Cost</label>
              <Input fluid placeholder='Cost of item' onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field required>
              <label>Quantity</label>
              <Input fluid placeholder='Quantity' onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field required>
              <label>Date Restocked</label>
              <Form.Input></Form.Input>
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={TextArea} placeholder='Add additional information' />
          </Form.Group>
          <Form.Button onClick={ handleAddItem } style={{ marginTop: '10px'}}>Add Item</Form.Button>
        </Form>
      </div>
    )
    
  }
}

export default AddItem;

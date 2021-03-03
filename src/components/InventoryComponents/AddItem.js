import React from 'react';
import {
  Form,
  Input 
} from 'semantic-ui-react';
import DayJS from 'react-dayjs';

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
        notes: null,
        photo: null
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = () => {
    this.setState({
      name: '',
      description: '',
      cost: '',
      quantity: '',
      dateRestocked: '',
      notes: '',
      photo: '',
    })
  }

  render() {
    return (
      <div className="add-item">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Field required>
              <label>Name</label>
              <Input fluid placeholder='Name of item' />
            </Form.Field>
            <Form.Field required>
              <label>Cost</label>
              <Input fluid placeholder='Cost of item' />
            </Form.Field>
            <Form.Field required>
              <label>Quantity</label>
              <Input fluid placeholder='Quantity' />
            </Form.Field>
            <Form.Field required>
              <label>Date Restocked</label>
              <Input fluid placeholder='MM-DD-YYYY' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field required></Form.Field>
          </Form.Group>
        </Form>
      </div>
    )
    
  }
}

export default AddItem;

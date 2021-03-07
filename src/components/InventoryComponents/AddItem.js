import React from 'react';
import { Form } from 'semantic-ui-react';
import { handleAddItem } from '../Firebase';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

class AddItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      cost: '',
      quantity: '',
      dateRestocked: '',
      photo: '',
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value }) 

  handleSubmit = () => {
    const { 
      name,
      description,
      cost,
      quantity,
      dateRestocked,
      photo,
    } = this.state;

    this.setState({
      name: name,

    })
  }

  render() {
    const {
      name,
      description,
      cost,
      quantity,
      dateRestocked,
      photo,
    } = this.state;

    return (
      <div className='add-item'>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input placeholder="Name" name="name" value={name} onChange={this.handleChange} />
            <Form.Input placeholder="Cost" name="cost" value={cost} onChange={this.handleChange} />
            <Form.Input placeholder="Quantity" name="quantity" value={quantity} onChange={this.handleChange} />
          </Form.Group>
        </Form>
      </div>
    )
    
  }
}



export default AddItem;

import React, { useState } from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { InputFile } from 'semantic-ui-react-input-file';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

const AddItem = () => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [cost, setCost] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [dateRestocked, setDate] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [alert, setAlert] = useState(null);

  const imageTypes = ['image/png', 'image/jpeg'];

  const handlePhotoChange = (e) => {
    let selected = e.target.files[0];
    
    if (selected && imageTypes.includes(selected.type)) {
      setPhoto(selected);
      setAlert('');
    } else {
      setPhoto(null);
      setAlert('Must be an image file (png or jpeg');
      alert({alert});
    }
  }

  const handleDateChange = (event, data) => {
    setDate(data.value);
    console.log(data.value);
  }

  return (
    <div>
      <Form>

      </Form>
    </div>
  )
}
/*
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

  handleDateChange = (event, data) => {
    this.setState({
      dateRestocked: data.value
    })
  }

  handleUpload = () => {

  }

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
      description: description,
      cost: cost,
      quantity: quantity,
      dateRestocked: dateRestocked,
      photo: photo
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
      <div className='add-item' style={{ height: '100vh' }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input 
              placeholder="Name" 
              name="name" value={name} 
              onChange={this.handleChange} 
              label="Name"
              required
            />
            <Form.Input 
              placeholder="Cost" 
              name="cost" 
              value={cost} 
              onChange={this.handleChange} 
              label="Cost"
              required
            />
            <Form.Input 
              placeholder="Quantity" 
              name="quantity" 
              value={quantity} 
              onChange={this.handleChange} 
              label="Quantity"
              required
            />
            <Form.Input
              name="dateRestocked"
              label="Date Restocked"
              value={dateRestocked}
              required
            >
              <SemanticDatepicker onChange={this.handleDateChange}/>
            </Form.Input>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              placeholder="Enter additional information" 
              name="description" 
              value={description} 
              onChange={this.handleChange} 
              label="Description"
              control={TextArea}
            />
            <InputFile 
              
              input={{
                id: 'input-control-id',
                onChange: this.handleUpload
              }}
            />
          </Form.Group>
        </Form>
      </div>
    )
    
  }
}



*/
export default AddItem;

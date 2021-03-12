import React, { useState } from 'react';
import { db } from '../Firebase/config';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { InputFile } from 'semantic-ui-react-input-file';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { 
  Form, 
  TextArea, 
  Button, 
  Message 
} from 'semantic-ui-react';

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

  const imageTypes = ['image/png', 'image/jpeg'];

  const handlePhotoChange = (e) => {
    let selected = e.target.files[0];
    
    if (selected && imageTypes.includes(selected.type)) {
      setPhoto(selected);
      setError(null);
    } else {
      setPhoto(null);
      setError('File must be an image (png or jpeg');
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(e.target.value)
  }

  const handleDescChange = (e) => {
    setDescription(e.target.value);
    console.log(e.target.value);
  }

  const handleCostChange = e => {
    setCost(e.target.value);
    console.log(e.target.value)
  }

  const handleQuantityChange = e => {
    setQuantity(e.target.value);
    console.log(e.target.value);
  }

  const handleDateChange = (eevent, data) => {
    console.log(data.value)
    setDate(data.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setItem({
      name: name,
      description: description,
      cost: cost,
      quantity: quantity,
      dateRestocked: dateRestocked,
    });

    db.collection('items')
    .add({
      cost: cost,
      dateRestocked: dateRestocked,
      description: description,
      name: name,
      quantity: quantity,
    })
    .then(() => {
      setMessage("Item has been submitted")
    })
    .catch((err) => {
      setError(err);
    })
  }

  const isInvalid = name === '' || dateRestocked === null || quantity === 0 || cost === 0;

  return (
    <div className='add-item' style={{ height: '100vh' }}>
      {error && (<Message negative>{error}</Message>)}
      {message && <Message positive>{message}</Message>}
      <Form>
        <Form onSubmit={handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input 
              placeholder="Name" 
              name="name" 
              value={name}
              onChange={handleNameChange} 
              label="Name"
              required
            />
            <Form.Input 
              placeholder="Cost" 
              name="cost" 
              value={cost} 
              onChange={handleCostChange} 
              label="Cost"
              required
            />
            <Form.Input 
              placeholder="Quantity" 
              name="quantity" 
              value={quantity} 
              onChange={handleQuantityChange} 
              label="Quantity"
              required
            />
            <Form.Input
              name="dateRestocked"
              label="Date Restocked"
              value={dateRestocked}
              required
            >
              <SemanticDatepicker onChange={handleDateChange}/>
            </Form.Input>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              placeholder="Enter additional information" 
              name="description" 
              value={description} 
              onChange={handleDescChange} 
              label="Description"
              control={TextArea}
            />
            <Form.Field>
              <label>Choose photo</label>
              <InputFile
                input={{
                  id: 'input-control-id',
                  onChange: handlePhotoChange
                }}
                value={photo}
              />
            </Form.Field>
          </Form.Group>
          <Button primary disabled={isInvalid} type='submit' onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Form>
    </div>
  )
}

export default AddItem;

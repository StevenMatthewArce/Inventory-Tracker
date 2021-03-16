import React, { useState } from 'react';

import { db } from '../Firebase';

import { InputFile } from 'semantic-ui-react-input-file';
import { DateInput } from 'semantic-ui-calendar-react';
import { 
  Form, 
  TextArea, 
  Button, 
  Message,
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

  const handleDateChange = (name, value) => {
    setDate(value);
    console.log(typeof value);
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
    .add({ name, description, cost, quantity, dateRestocked })
    .then(() => {
      setMessage("Item has been submitted. ")
    })
    .catch((err) => {
      setError(err);
    })
  }

  const isInvalid = name === '' || dateRestocked === null || quantity === 0 || cost === 0;

  return (
    <div className='add-item' style={{ height: '100vh' }}>
      {error && (<Message icon='frown' negative>{error}</Message>)}
      {message && <Message icon='smile' positive>{message}</Message>}
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
            <DateInput
              required
              label='Date Restocked'
              name="dateRestocked"
              value={dateRestocked}
              iconPosition="left"
              onChange={(e, {name, value}) => handleDateChange(name, value)}
            />
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

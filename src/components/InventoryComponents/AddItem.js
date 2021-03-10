import React, { useState } from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import ProgressBar from './ProgressBar';

const AddItem = () => {
  const [item, setItem] = useState();
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [cost, setCost] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [dateRestocked, setDate] = useState(null);
  const [photo, setPhoto] = useState(null);

  const imageTypes = ['image/png', 'image/jpeg'];

  const handlePhotoChange = (e) => {
    let selected = e.target.files[0];
    
    if (selected && imageTypes.includes(selected.type)) {
      setPhoto(selected);
    } else {
      setPhoto(null);
      alert('File must be an image (png or jpeg');
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

  const handleDateChange = (event, data) => {
    console.log(data.value)
    setDate(data.value)
  }

  return (
    <div>
      <Form>
      <div className='add-item' style={{ height: '100vh' }}>
        <Form>
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
            <Form.Input 
              label="Upload photo"
              type='file'
              onChange={handlePhotoChange}
            />
          </Form.Group>
        </Form>
        </div>
      </Form>
      { item && <ProgressBar item={item} setItem={setItem}/>}
    </div>
  )
}

export default AddItem;

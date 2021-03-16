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

const AddRecipe = () => {
  const [recipe, setRecipe] = useState();
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [dateCreated, setDate] = useState(null);
  const [ingredient, setIngredient] = useState(null);
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


  const handleDateChange = (name, value) => {
    setDate(value);
    console.log(typeof value);
  }

  const handleIngredChange = (name, value) => {
    setIngredient(value);
    console.log(typeof value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setRecipe({
      name: name,
      description: description,
      ingredient: ingredient,
      dateCreated: dateCreated,
    });

    db.collection('recipes')
    .add({ name, description, ingredient, dateCreated })
    .then(() => {
      setMessage("Recipe has been submitted. ")
    })
    .catch((err) => {
      setError(err);
    })
  }

  const isInvalid = name === '' || dateCreated === null || description ==='';

  return (
    <div className='add-recipe' style={{ height: '100vh' }}>
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
              placeholder="Description" 
              name="description" 
              value={description} 
              onChange={handleDescChange} 
              label="Description"
              required
            />
            <DateInput
              required
              label='Date Created'
              name="dateCreated"
              value={dateCreated}
              iconPosition="left"
              onChange={(e, {name, value}) => handleDateChange(name, value)}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              placeholder="Select ingredients" 
              name="ingredient" 
              value={ingredient} 
              onChange={handleIngredChange} 
              label="Ingredient"
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

export default AddRecipe;

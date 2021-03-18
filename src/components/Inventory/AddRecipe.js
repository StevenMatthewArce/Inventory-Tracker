import React, { useState } from 'react';

import { db } from '../Firebase';

import { InputFile } from 'semantic-ui-react-input-file';
import { DateInput } from 'semantic-ui-calendar-react';
import { 
  Form, 
  TextArea, 
  Button, 
  Message,
  Select,
} from 'semantic-ui-react';

const AddRecipe = () => {
  const [recipe, setRecipe] = useState();
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [dateCreated, setDate] = useState(null);
  const [ingredientList, setIngredientList] = useState(null);
  const [quantity, setQuantity] = useState(0)
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

  const handleIngredChange = (e, index) => {
    const{name,value} = e.target;
    const list = [...ingredientList];
    list[index][name] = value
    setIngredientList(list);
    console.log(typeof value);
  }

  const handleQuantityChange = e => {
    setQuantity(e.target.value);
    console.log(e.target.value);
  }

  const handleUnitChange = e => {
    setQuantity(e.target.value);
    console.log(e.target.value);
  }

  const handleAddClick = () => {
    setIngredientList([...ingredientList,{ingredient: '', quantity: ''}]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setRecipe({
      name: name,
      description: description,
      ingredientList: ingredientList,
      dateCreated: dateCreated,
    });

    db.collection('recipes')
    .add({ name, description, ingredientList, dateCreated })
    .then(() => {
      setMessage("Recipe has been submitted. ")
    })
    .catch((err) => {
      setError(err);
    })
  }

  const unit = [
    { key: 'o', text: 'Teaspoon', value: 'teaspoon' },
    { key: 't', text: 'Tablespoon', value: 'tablespoon' },
    { key: 'th', text: 'Cup', value: 'cup' },
    { key: 'f', text: 'Gram', value: 'gram' },
    { key: 'f', text: 'Pound', value: 'pound' },
    { key: 'f', text: 'Other', value: 'other' },
  ]

  //get raw material from raw inventory database?
  const rawMaterials = [
    {key: 'a', text: 'Apple', value: 'apple'}
  ]

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
            <h3>Ingredients List</h3>
            {/* //</Form.Group> */}
            {/* </Form>{ingredientList.map((x,i) => { */}

            {/* return( */}
            <Form.Input
              placeholder="Ingredients" 
              name="ingredient" 
              value={ingredientList} 
              onChange={handleIngredChange} 
              label="Ingredient"
              control={Select}
              options={rawMaterials}
            />
            <Form.Input
              placeholder="Quantity" 
              name="quantity" 
              value={quantity} 
              onChange={handleQuantityChange} 
              label="Quanitity"
              //control={TextArea}
            />
            <Form.Field
              control={Select}
              label='Unit'
              options={unit}
              onChange={handleUnitChange} 
              placeholder='Units'
            />
            {/* {ingredientList.length - 1 === i && <button>Add</button>} */}
          
         
          </Form.Group>
      
          <Form.Group>
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
      
       {/* <div style={{ marginTop: 20 }}>{JSON.stringify(ingredientList)}</div>      */}
    </div>
  )
}

export default AddRecipe;

import React, { Component } from "react";
import {
  Form,
  Button,
  Message,
  Icon,
  Header,
  Divider,
  Grid,
  Dropdown
} from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import { db } from "../Firebase";
import { Link } from "react-router-dom";

//TODO: Add logic to not submit unless required fields have been added

export class AddRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      dateCreated: "",
      comment: "",
      items: [{ingredient: '', quantity: '', unit: ''}],
      message: null,
      error: null
    };
  }

  componentDidMount() {
    let documents = [];
    db.collection("recipes")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
          console.log(doc.id, " => ", doc.data());
        });
        console.log(documents);
      })
      .then(() => {
        const newDoc = [];
        for (var i = 0; i < documents.length; i++) {
          const { name } = documents[i];
          newDoc.push({ text: name, value: name, key: name, ...documents[i] });
        }

        this.setState({ recipes: newDoc });
      });
  }

  handleChange = (e, { name, value }) => {
    e.preventDefault();
    this.setState({ [name]: value }, console.log(this.state));
  };

  submit = e => {
    e.preventDefault();

    let { name, dateReceived, dateNeededBy, comment, items } = this.state;
    let finished = "0";

    db.collection("orders")
      .add({ name, dateReceived, dateNeededBy, comment, items, finished })
      .then(() => {
        this.setState({ message: "Items has been submitted. " });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    return (
        <div className='add-recipe' style={{ height: '100vh' }}>
          {/* {error && (<Message icon='frown' negative>{error}</Message>)} */}
          {/* {message && <Message icon='smile' positive>{message}</Message>} */}
          <div>
          <Button labelPosition="left" icon secondary as={Link} to="/recipes">
            Back
            <Icon name="left arrow"></Icon>
          </Button>
        </div>

          <Form>
            <Form onSubmit={handleSubmit}>          
              <Form.Group widths='equal'>
                <Form.Input 
                  placeholder="Name" 
                  name="name" 
                  value={this.state.name}
                  onChange={this.handleChange} 
                  label="Name"
                  required
                />
                <Form.Input 
                  placeholder="Description" 
                  name="description" 
                  value={this.state.description} 
                  onChange={this.handleChange} 
                  label="Description"
                  required
                />
                <DateInput
                  required
                  label='Date Created'
                  name="dateCreated"
                  dateFormat={"MM/DD/YYYY"}
                  value={this.state.dateCreated}
                  iconPosition="left"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <h3>Ingredients List</h3>
              {ingredientList.map((x,i) => {
              return(
           <div className = 'form'> 
              <Form.Group widths='equal'>
                <Form.Select
                  placeholder="Ingredients" 
                  name="ingredient" 
                  value={rawMaterials.find(obj => obj.value === x.ingredient)}
                  onChange={e=> handleIngredChange(e,i)} 
                  label="Ingredient"
                  control={Select}
                  options={rawMaterials}
                  //required
                />
                <Form.Input
                  placeholder="Quantity" 
                  name="quantity" 
                  value={this.state.items.values} 
                  onChange={this.handleChange}               label="Quanitity"
                  //control={TextArea}
                />
                <Form.Field
                  control={Select}
                  value={units.find(obj => obj.value === x.unit)}
                  label='Unit'
                  options={units}
                  onChange={e=> handleIngredChange(e,i)}               placeholder='Units'
                />
                {/* {ingredientList.length - 1 === i && <button>Add</button>} */}
                <div className="addRemove">
          {ingredientList.length !== 1 && 
          <button onClick={() => handleRemoveClick(i)}>Remove</button>}
          {ingredientList.length-1 === i && 
          <button onClick={handleAddClick}>Add</button>}
        </div>
             
              </Form.Group>
              </div>
              )
          })}
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
          
           {/* <div style={{ marginTop: 20 }}>{JSON.stringify(ingredientList)}</div>       */}
        {/* <div className="addRemove">
          {ingredientList.length !== 1 && 
          <button onClick={() => handleRemoveClick(i)}>Remove</button>}
          {ingredientList.length-1 === i && 
          <button onClick={handleAddClick}>Add</button>}
        </div> */}
         </div>
      //)
      //})}
        //</div>
      )
  }
}

export default AddRecipe;

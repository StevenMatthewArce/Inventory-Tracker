import React from 'react';

import {
  Form,
  Button,
  Message,
  Icon,
  Header,
  Divider,
  Grid,
  Dropdown,
  FormInput
} from 'semantic-ui-react';
import { db } from '../Firebase';
import { Link, Redirect } from 'react-router-dom';
import _, { floor } from "lodash";

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      items: [],
      message: null,
      error: null,
      documents: [],
      description: null,
    }
  }

  componentDidMount() {
    let docs = [];
    db.collection('items')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
          console.log(doc.id, '=>', doc.data());
        })
      })
      .then(() => {
        const newDoc = [];
        for (let i = 0; i < docs.length; i++) {
          const { name } = docs[i];
          newDoc.push({ text: name, value: name, key: name, ...docs[i] });
        }
        this.setState({ documents: newDoc });
      })
  }

  handleNameChange = (e, { name, value }) => {
    e.preventDefault();
    this.setState({ [name]: value });
  };

  handleChange = (e, { name, id, value }) => {
    e.preventDefault();
    let items = this.state.items;

    items[id] = { ...items[id], [name]: value };
    this.setState({ items: items, });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    
    let { name, items, description } = this.state;
    
    var catagories = _.groupBy(this.state.documents, items => items.name);
    let totalCostArry = [];
   
    Object.keys(catagories).map(value => {
      const items = catagories[value];
      let cost = 0;
      items.forEach(element => {
        cost += parseFloat(element.cost);
      });
      
      let itemNameCost = {
          name: value,
          cost: cost.toFixed(2)
      }
      totalCostArry.push(itemNameCost)
      })

      let receipeCost = 0
      this.state.items.map(items => {totalCostArry.filter(element =>
        {
        if (element.name == items.name) receipeCost += parseFloat(element.cost)*parseInt(items.quantity) 
        })
      })

      receipeCost = receipeCost.toFixed(2)
        

    db.collection('recipes')
      .add({ name, items, description, receipeCost })
      .then(() => {
        this.setState({ message: 'Recipe has been submitted. ' });
        this.handleRedirect();
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  };


  calculateReceipeCost = () => {
    var catagories = _.groupBy(this.state.documents, items => items.name);
    let totalCostArry = [];
   

    return new Promise(resolve => {
      Object.keys(catagories).map(value => {
        const items = catagories[value];
        let cost = 0;
        items.forEach(element => {
          cost += parseFloat(element.cost);
        });
        
        let itemNameCost = {
            name: value,
            cost: cost.toFixed(2)
        }
        totalCostArry.push(itemNameCost)
        })
    
        let receipeCost = 0
        this.state.items.map(items => {totalCostArry.filter(element =>
          {
          if (element.name == items.name) receipeCost += parseFloat(element.cost)*parseInt(items.quantity) 
          })
        })
        resolve(receipeCost)
    })
  }

  handleRedirect() {
    setTimeout(() => {
      return <Redirect to='/inventory' />
    }, 3000) // 3 seconds
  }

  addItem = () => {
    let items = this.state.items;
    let newItem = {
      id: items.length,
      quantity: "1",
    };
    items.push(newItem);
    this.setState({ items: items });
  };

  removeItem = id => {
    let items = this.state.items;
    items = items.filter(x => x.id != id);
    this.setState({ items: items });
  };

  render() {
    console.log(this.state)
    return (
      <div style={{ height: '100vh' }}>
        <div>
          <Button labelPosition='left' icon secondary as={Link} to='/inventory'>
            Back
              <Icon name='left arrow' />
          </Button>
        </div>
        <br />
        <div>
          <Grid>
            <Grid.Column width={9}>
              <Grid.Row>
                <Header as='h1' textAlign='left'>
                  Add a Recipe
                  </Header>
                  <Grid.Row>Please select ingredients for your recipe.</Grid.Row>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={7} textAlign='right'>
            <Button
                  labelPosition="left"
                  icon
                  positive
                  onClick={this.addItem}
                >
                  Add
                  <Icon name="plus"></Icon>
                </Button>
              <Button labelPosition='right' icon primary onClick={this.handleSubmit}>
                Submit
                  <Icon name='send' />
              </Button>
              
            </Grid.Column>
          </Grid>
        </div>
        <Divider />
    
        <Form>
          <Form.Group>
            <Form.Input
              required
              label='Name:'
              name='name'
              placeholder ="Recipe Name"
              width ={16}
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </Form.Group>
          <Form.TextArea
            width={20}
            name='description'
            style={{ minHeight: 100 }}
            label='Description:'
            placeholder='Add a description about this recipe'
            value={this.state.description}
            onChange={this.handleNameChange}
          />
          
          {this.state.items.map(items => {
            return(
              <div key={items.id}>
          <Form.Group centered > 
          <Form.Select 
            required
            width={5}
            label ="Ingredients"
            name="name"
            placeholder="Ingredients"
            id={items.id}
            options={this.state.documents}
            value={items.name}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            label="Quantity"
            name="quantity"
            id={items.id}
            value={items.quantity}
            onChange={this.handleChange}
          />
           <Button
            style ={{height:37.8, top:25 }}
            labelPosition="left"
            size = "tiny"
            icon
            negative
            onClick={() => this.removeItem(items.id)}
            >  Remove
            <Icon name="minus"></Icon>
          </Button>
          </Form.Group>   
              </div>
            )
          })}
          
                
        </Form>
        {this.state.message && <Message positive>{this.state.message}</Message>}
        {this.state.error && <Message negative>{this.state.error}</Message>}
      </div>
    )
  }
}
export default AddRecipe;
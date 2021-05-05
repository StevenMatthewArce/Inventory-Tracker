import React from 'react';

import {
  Form,
  Button,
  Message,
  Icon,
  Header,
  Divider,
  Grid,
  Segment
} from 'semantic-ui-react';
import { db } from '../Firebase';
import { Link, Redirect } from 'react-router-dom';
import _, { floor } from "lodash";
import { AuthContext } from "../App/Auth";

class AddRecipe extends React.Component {
  static contextType = AuthContext
  

  constructor(props) {
    super(props);

    
   
    this.state = {
      name: '',
      items: [],
      message: null,
      error: null,
      documents: [],
      description: null,
      qtyProduced: 0,
      totalLabor: 0,
    }
  }

  componentDidMount() {
    const {currentUser} = this.context
   
    let docs = [];
    db.collection("users")
      .doc(currentUser.uid).collection('items')
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
    const {currentUser} = this.context
    
    let { name, items, description, qtyProduced, totalLabor } = this.state;
    
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
        

      db.collection("users")
      .doc(currentUser.uid).collection('recipes')
      .add({ name, items, description, receipeCost,qtyProduced, totalLabor  })
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
      <Segment style={{ height: "90vh", backgroundColor: "#f1f1f1" }}>
        <div>
          <Button labelPosition='left' icon style={{backgroundColor:"#666364", color:"#ffffff"}} as={Link} to='/inventory'>
            Back
              <Icon name='left arrow' />
          </Button>
        </div>
        <br />
        {this.state.message && <Message positive>{this.state.message}</Message>}
        {this.state.error && <Message negative>{this.state.error}</Message>}
        <div>
          <Grid>
            <Grid.Column width={9}>
              
              <Grid.Row>
                 
                <Header as='h1' textAlign='left'  style={{color:"#36393e"}}>
                  Add a Recipe
                  </Header>
                  <Grid.Row>Please select ingredients for your recipe.</Grid.Row>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={7} textAlign='right'>
            <Button
                  labelPosition="left"
                  icon
                  style={{backgroundColor:"#3db39c", color:"white"}}
                  onClick={this.addItem}
                >
                  Add
                  <Icon name="plus"></Icon>
                </Button>
              <Button labelPosition='right' icon  style={{backgroundColor:"#77c90e", color:"#ffffff"}}onClick={this.handleSubmit}>
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
              icon="tag"
              iconPosition="left"
              placeholder ="Recipe Name"
              width ={12}
              value={this.state.name}
              onChange={this.handleNameChange}
            />
             <Form.Input
              required
              label='Qty Produced'
              name='qtyProduced'
              icon="shopping cart"
              iconPosition="left"
              placeholder ="1"
              width ={2}
              value={this.state.qtyProduced}
              onChange={this.handleNameChange}
            />
             <Form.Input
              required
              icon="time"
              iconPosition="left"
              label='Labor (hrs)'
              name='totalLabor'
              placeholder ="1"
              width ={2}
              value={this.state.totalLabor}
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
       
      </Segment>
    )
  }
}
export default AddRecipe;
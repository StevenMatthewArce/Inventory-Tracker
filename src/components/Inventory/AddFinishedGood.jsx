import React, { useEffect, useState, useContext } from 'react';
import { db } from '../Firebase';
import { AuthContext } from "../App/Auth";
import { Link, Redirect } from 'react-router-dom';
import {
  Form,
  Button,
  Message,
  Icon,
  Header,
  Divider,
  Grid,
  Dropdown, 
  Card,
  Segment
} from 'semantic-ui-react';

const AddFinishedGood = () => {
  const [quantity, setQuantity] = useState(0);
  // const [laborRate, setLaborRate] = useState(0);
  // const [markUp, setMarkUp] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState("None");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;
  console.log(uid)
  
  useEffect(() => {
    let docs = [];
    db.collection("users")
    .doc(uid).collection('recipes')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        })
      })
      .then(() => {
        const newDoc = [];
        for (let i = 0; i < docs.length; i++) {
          const { name } = docs[i];
          newDoc.push({ text: name, value: name, key: name, ...docs[i] });
        }
        setRecipes(newDoc);
        
      })
  }, []);


  const handleSelectedChange = (e, { name, value }) => {
    e.preventDefault();
    setSelected(recipes.filter(element => element.name === value));

  }
  

  
  const handleRedirect = () => {
    setTimeout(() => {
      return <Redirect to='/inventory' />
    }, 3000);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // let finishedGoodCost = 0;
    // finishedGoodCost = ((parseFloat(selected[0].receipeCost) + ((laborRate*timeSpent)/quantity))*(1+(markUp/100)))
    // finishedGoodCost = finishedGoodCost.toFixed(2)
    
    const {name, receipeCost, items, qtyProduced, totalLabor} = selected[0]
 
   
    items.some(element => {
      console.log(element.name)
      let qty = quantity*element.quantity;
      let itemsToRemove = [];
      db.collection("users")
      .doc(uid).collection("items").where("name", "==", element.name )
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            itemsToRemove.push({ id: doc.id, ...doc.data() });
        });
        console.log(itemsToRemove)
    })
    .then(()=>{
      if (itemsToRemove[0].quantity > qty){
        itemsToRemove[0].quantity = itemsToRemove[0].quantity - qty
        db.collection("users")
        .doc(uid).collection("items")
        .doc(itemsToRemove[0].id)
        .update({ quantity: itemsToRemove[0].quantity })
        console.log("First")
      } else if (itemsToRemove[0].quantity == qty){
        db.collection("users")
      .doc(uid).collection("items")
        .doc(itemsToRemove[0].id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });
        console.log("Second")
      } else {
        //!! If the second item doesnt have enough materials there is no check
        //!! If the second item doesnt have enough but the first one does it will still go through
        let remainingItems = itemsToRemove[0].quantity - qty
        if(itemsToRemove.length < 1){
          console.log(itemsToRemove.length)
          console.log("Not enough raw materials")
          return true
        }else {
          db.collection("users")
          .doc(uid).collection("items")
          .doc(itemsToRemove[1].id)
          .delete()
          itemsToRemove[1].quantity = itemsToRemove[1].quantity - remainingItems;
          db.collection("users")
      .doc(uid).collection("items")
          .doc(itemsToRemove[1].id)
          .update({ quantity: itemsToRemove[1].quantity })
          console.log("Third")
         }
      }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    })
    
    

    db.collection("users")
      .doc(uid).collection('finishedgoods')
      .add({ name, receipeCost, items, quantity,qtyProduced, totalLabor })
      .then(() => {
        setMessage("Item has been submitted. ");
        handleRedirect();
      })
      .catch(err => {
        setError(err);
      });
  }
  return (
    <Segment style={{ height: "90vh",  backgroundColor: "#f1f1f1" }}>
    <div>
      <Button labelPosition="left" icon sstyle={{backgroundColor:"#666364", color:"#ffffff"}} as={Link} to="/inventory">
        Back
        <Icon name="left arrow"></Icon>
      </Button>
    </div>
    <br></br>
    <div>
      <Grid>
        <Grid.Column width={9}>
          <Grid.Row>
            <Header as="h1"style={{color:"#36393e"}}  textAlign="left">
              Add a Finished Good
            </Header>
            <Grid.Row>Please select a recipe and add your total amount of finished goods.</Grid.Row>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={7} textAlign="right">
        <Button labelPosition="right" icon   style={{backgroundColor:"#77c90e", color:"#ffffff"}} onClick={handleSubmit}>
          Submit
          <Icon name="send" />
        </Button>
        </Grid.Column>
        <Grid.Row>
        <Grid.Column>
          
        </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
    <Divider />
    <div>
      {error && (
        <Message icon="frown" negative>
          {error}
        </Message>
      )}
      {message && (
        <Message icon="smile" positive>
          {message}
        </Message>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Select
        required
        width={12}
        placeholder="Finished Goods"
        label="Select a Recipe"
        selection
        search
        scrolling
        options={recipes}
        onChange={handleSelectedChange}
        />
        <Form.Input
          width={4}
          icon="shopping cart"
        iconPosition="left"
          label="Quantity per Recipe"
          name="quantityRecipe"
          placeholder="Select a Recipe"
          value ={selected[0].qtyProduced}
          readOnly  
        />
         <Form.Input
          width={4}
          icon="time"
          iconPosition="left"
          label="Labor per Recipe"
          name="laborRecipe"
          placeholder="Select a Recipe"
          value ={selected[0].totalLabor}
          readOnly  
        />
         <Form.Input
          width={4}
          icon="time"
          iconPosition="left"
          label="Total Labor"
          name="timeSpent"
          placeholder="Select a Recipe"
          value ={timeSpent}
          readOnly  
        />
        </Form.Group>

      <Form.Group widths="equal">
      <Form.Input
        required
        width={16}
        
        icon="shopping cart"
        iconPosition="left"
        label="Total Quantity"
        name="quantity"
        value={quantity}
        onChange={(selected[0].items == undefined) ? " ": e => {setQuantity(e.target.value); setTimeSpent(e.target.value*selected[0].totalLabor)}}
      />   
      
        {/* <Form.Input
        required
        width={2}
        icon="time"
        iconPosition="left"
        label="Time Spent (hours)"
        name="timeSpent"
        value={timeSpent}
        onChange={e => setTimeSpent(e.target.value)}
      />    */}
      {/* <Form.Input
        required
        width={2}
        icon="user"
        iconPosition="left"
        label="Labor Rate (per hour)"
        name="laborRate"
        value={laborRate}
        onChange={e => setLaborRate(e.target.value)}
      />   */}
        {/* <Form.Input
        required
        width={2}
        icon="percent"
        iconPosition="right"
        label="Percentage Markup"
        name="markUp"
        value= {markUp}
        onChange={e => setMarkUp(e.target.value)}
      />   */}
      </Form.Group>
   
      </Form>
    </div>
  </Segment>
  )
}

export default AddFinishedGood;
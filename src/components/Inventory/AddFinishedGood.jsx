import React, { useEffect, useState } from 'react';

import { db } from '../Firebase';

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
  Card
} from 'semantic-ui-react';

const AddFinishedGood = () => {
  const [quantity, setQuantity] = useState(0);
  const [laborRate, setLaborRate] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState("None");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  
  useEffect(() => {
    let docs = [];
    db.collection('recipes')
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

  const getFinishedGoods = () => {
    let docs = [];
    db.collection('finishedGoods')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
          console.log(doc.id, '=>', ...doc.data());
        })
        .then(() => {
          const newDoc = [];
          for (let i = 0; i < docs.length; i++) {
            const { name } = docs[i];
            newDoc.push({ text: name, value: name, key: name, ...docs[i] });
          }
          return newDoc;
        })
        .catch((error) => {
          console.log(error);
        })
      })
    return null;
  }

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

    let goods = getFinishedGoods();

    if (goods) {
      for (let i = 0; i < goods.length; i++) {
        console.log(goods[i].id, '=>', ...goods[i])
      }
    }
  }

  console.log(selected)
  console.log(recipes)
  return (
    <div className="add-item" style={{ height: "100vh" }}>
    <div>
      <Button labelPosition="left" icon secondary as={Link} to="/inventory">
        Back
        <Icon name="left arrow"></Icon>
      </Button>
    </div>
    <br></br>
    <div>
      <Grid>
        <Grid.Column width={9}>
          <Grid.Row>
            <Header as="h1" textAlign="left">
              Add a Finished Good
            </Header>
            <Grid.Row>Please select a recipe and add your new finished goods.</Grid.Row>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={7} textAlign="right">
        <Button labelPosition="right" icon primary onClick={handleSubmit}>
          Submit
          <Icon name="send" />
        </Button>
        </Grid.Column>
        <Grid.Row>
        <Card
                centered
                header= {selected[0].name}
                meta = {(selected[0].items != undefined) ? ("Ingredients: " + selected[0].items.join(", ")) : ("") }
                description= {selected[0].description}
                extra={
                  (selected[0].items != undefined) ? (<p>
                    <Icon name="dollar sign" />
                  </p>) : ("Select a Recipe") 
                }
              />
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
      <b>Select Recipe:</b>
      <Dropdown
        required
        fluid
        placeholder="Finished Goods"
        labeled="Finished Good"
        selection
        search
        scrolling
        options={recipes}
        // value={selected}
        onChange={handleSelectedChange}
      /> 
      <br/>
      <Form.Group widths="equal">
      <Form.Input
        required
        width={5}
        label="Quantity"
        name="quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />   
        <Form.Input
        required
        width={5}
        label="Time Spent"
        name="timeSpent"
        value={quantity}
        onChange={e => setTimeSpent(e.target.value)}
      />   
      <Form.Input
        required
        width={5}
        label="Labor Rate"
        name="laborRate"
        value={laborRate}
        onChange={e => setLaborRate(e.target.value)}
      />  
      </Form.Group>
   
      </Form>
    </div>
  </div>
  )
}

export default AddFinishedGood;
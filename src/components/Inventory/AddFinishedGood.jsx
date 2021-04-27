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
  Dropdown
} from 'semantic-ui-react';

const AddFinishedGood = () => {
  const [quantity, setQuantity] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null);

  
  useEffect(() => {
    let docs = [];
    db.collection('recipes')
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
        setRecipes(newDoc);
      })
  }, [recipes]);

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
    setSelected(value);
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
                Add a Finished Good
              </Header>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={7} textAlign='right'>
            <Button labelPosition='right' icon primary onClick={handleSubmit}>
              Submit
              <Icon name='send' />
            </Button>
          </Grid.Column>
        </Grid>
      </div>
      <Divider />
      <Form>
        <Form.Group>
          <b>Add Finished Good:</b>
          <Dropdown 
            required
            placeholder='Finished Goods'
            labeled='Add Finished Good'
            fluid
            selection
            search
            scrolling
            options={recipes}
            value={selected}
            onChange={handleSelectedChange}
            width={6}
          />
          <Form.Input 
            required
            width={4}
            label='Quantity'
            name='quantity'
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  )
}

export default AddFinishedGood;
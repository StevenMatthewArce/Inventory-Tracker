import React, { useState, useContext } from 'react';

import { Redirect } from 'react-router-dom';
import { 
  Form,
  Grid,
  Header
} from 'semantic-ui-react';

import { AuthContext } from '../Auth';
import { loginWithEmailAndPassword } from '../Firebase';

const SignInForm = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    loginWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to='/dashboard' />
  }

  return (
    <div className='login' style={{ height: '100vh' }}>
      <Grid centered>
        <Header textAlign='center'>Sign In</Header>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input 
              required
              width={5}
              label='Email Address'
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Form.Input 
              required
              width={5}
              label='Password'
              name='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Button>Login</Form.Button>
        </Form>
      </Grid>
    </div>
  )
} 

export default SignInForm;
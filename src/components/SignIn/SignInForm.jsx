import React, { useState, useContext } from 'react';

import { Redirect } from 'react-router-dom';
import { AuthContext } from '../Auth';

const SignInForm = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    
  }
} 
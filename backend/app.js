import express from 'express';

const { handleError } = require('./Helpers/ErrorHandler');

console.log(require('dotenv').config());

// Init an Express app. This later starts a server and put all dependencies into your project to use.
const app = express();

// use all controllers(APIs) here

app.use((err, req, res) => {
  handleError(err, res);
});


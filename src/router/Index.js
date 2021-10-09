const express = require('express');
const app = express();
const auth = require('./Auth');

app.use(auth);

module.exports = app;
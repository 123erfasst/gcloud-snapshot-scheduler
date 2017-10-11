'use strict';

const express = require('express');
const app = express();
const createHandler = require('./createHandler');

app.get('/create/:zoneName/:diskName', (req, res) => createHandler(req, res));

app.listen(8080, () => {
    console.log(`App listening`);
});
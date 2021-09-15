//Require express and mongoose
const express = require('express');
const mongoose = require('mongoose');
const app = express();
//Connect PORT
const PORT = process.env.PORT || 3001;

//Connect express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

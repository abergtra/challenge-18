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

//require routes
app.use(require('./routes'));

//connect to mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/challenge-18',{
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//set mongoose to log actions for debugging
mongoose.set('debug', true);

//connect to PORT
app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
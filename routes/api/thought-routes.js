//require express for routing api
const router = require('express').Router();

//connect to functions in controller
const{
    getAllThoughts,
    getThoughtByID,
    createNewThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller')
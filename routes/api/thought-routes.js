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

//set up api endpoints for /api/thoughts
router
    .route('/')
    .get(getAllThoughts)

router
    .route('/:userId')
    .post(createNewThought)

router
    .route('/:thoughtId')
    .get(getThoughtByID)
    .put(createNewThought)
    .delete(deleteThought)

router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction);

module.exports = router;
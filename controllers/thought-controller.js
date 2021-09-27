//Import Thought and Thought models
const { Thought, User, Types } = require('../models');

//Thought functions
const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getThoughtByID({ params }, res) {

    },
    createNewThought({ params, body }, res) {

    },
    deleteThought({ params }, res) {

    },
    addReaction({ params, body }, res) {

    },
    deleteReaction({ params }, res){
        
    }
}

//export controller
module.exports = thoughtController
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
        console.log("retrieved params", params)
        Thought.findOne({ _id: params.thoughtID})
        .select("-__v")
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "Cannot find thought with this id."});
                return;
            } res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
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
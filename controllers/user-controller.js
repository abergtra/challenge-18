//Import User and Thought models
const { User, Thought } = require('../models');

//User functions
const userController = {
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: "-__v"
        })
        .select("-__v")
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getUserByID({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: "-__v"
        })
        .select("-__v")
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "Cannot find user with this id."});
                return;
            } res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    createNewUser({ body }, res) {
        console.log("BODY OBJECT", body)
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    updateUser({ params, body }, res) {
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
    deleteUser({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtID})
        .then(deletedthought => {
            if (!deletedthought) {
                return res.status(404).json({ message: "Cannot find thought with this id."});
            } return User.findOneAndUpdate(
                { _id: params.username },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    addFriend({ params }, res) {
        console.log("INCOMING BODY", body)
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Cannot find user with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    deleteFriend({ params }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
}

//export controller
module.exports = userController
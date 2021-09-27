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
        User.findOne({ _id: params.id}, body, {
            new: true,
            runValidators: true,
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "Cannot find user with this id."});
                return;
            } res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "Cannot find thought with this id."});
                return;
            } 
            User.updateMany(
                { _id: { $in: dbUserData.friends } },
                { $pull: { friends: params.id } }
            )
            .then(() => {
                Thought.deleteMany({ username: dbUserData.username })
                .then(() => {
                    res.json({ message: "User deleted successfully" });
                })
                .catch((err) => res.status(400).json(err));
            })
            .catch((err) => res.status(400).json(err));
        })
        .catch((err) => res.status(400).json(err));
    },
    addFriend({ params }, res) {
        User.findByIDAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendId } },
            { new: true }
        )
        .select("-__v")
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Cannot find user with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },
    deleteFriend({ params }, res){
        User.findByIDAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .select("-__v")
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Cannot find friend with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    }
}

//export controller
module.exports = userController
//require expressfor routing api
const router = require('express').Router();

//connect to functions in controller
const{
    getAllUsers,
    getUserByID,
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller')


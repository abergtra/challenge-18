//require express for routing api
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

//set up api endpoints for /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createNewUser)

router
    .route('/:id')
    .get(getUserByID)
    .delete(deleteUser)
    .put(updateUser)

router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
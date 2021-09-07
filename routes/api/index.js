//require expressfor routing api
const router = require('express').Router();

//connect user and thought routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

//Add prefix for thought and users
router.use ('/users', userRoutes);
router.use ('/thoughts', thoughtRoutes);

//export module
module.exports = router;

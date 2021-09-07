//require expressfor routing api
const router = require('express').Router();
//Import API routes from api folder
const APIroutes = require('./api');

//Add /api prefix to imported API routes
router.use ('/api', APIroutes);

//catch 404 errors
router.use((req, res) => {
    res.status(404).send('<h1>404 Error</h1>');
});

//export module
module.exports = router;

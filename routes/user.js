const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/auth');

//FIXME: Now, Only test for protected route
router.get('/', protect, userController.getUsers);

module.exports = router;

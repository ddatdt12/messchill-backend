const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, authController.authenticate);
router.post('/login/social', authController.socialLogin);

module.exports = router;

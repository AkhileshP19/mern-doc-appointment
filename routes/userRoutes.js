const express = require('express');
const {loginController, registerController, authController} = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

// router object
const router = express.Router();

// routes:
// 1. LOGIN (POST)
router.post('/login', loginController)

// 2. REGISTER (POST)
router.post('/register', registerController)

// 3. AUTH (POST)
router.post('/getUserData', authMiddleware, authController);

module.exports = router;
const express = require('express');
const {loginController, registerController} = require('../controllers/userCtrl');

// router object
const router = express.Router();

// routes:
// 1. LOGIN (POST)
router.post('/login', loginController)

// 2. REGISTER (POST)
router.post('/register', registerController)

module.exports = router;
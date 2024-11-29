const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController } = require('../controllers/adminCtrl');

const router = express.Router();

// 1. USERS (GET)
router.get('/getAllUsers', authMiddleware, getAllUsersController);

// 2. DOCTORS (GET)
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

// 3. CHANGE ACCOUNT STATUS (POST
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController);

module.exports = router;
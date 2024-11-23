const express = require('express');
const {loginController, registerController, authController, applyDoctorController, getAllNotificationsController, deleteAllNotificationsController} = require('../controllers/userCtrl');
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

// 4. APPLY DOCTOR (POST)
router.post('/apply-doctor', authMiddleware, applyDoctorController);

// NOTIFICATION (POST)
router.post('/get-all-notification', authMiddleware, getAllNotificationsController);

// NOTIFICATION (POST)
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationsController);

module.exports = router;
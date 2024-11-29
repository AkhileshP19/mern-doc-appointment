const express = require('express');
const {loginController, registerController, authController, applyDoctorController, getAllNotificationsController, deleteAllNotificationsController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController} = require('../controllers/userCtrl');
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

// 5. NOTIFICATION (POST)
router.post('/get-all-notification', authMiddleware, getAllNotificationsController);

// 6. NOTIFICATION (POST)
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationsController);

// 7. GET ALL DOC (GET)
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

// 8. BOOK APPOINTMENT (POST)
router.post('/book-appointment', authMiddleware, bookAppointmentController);

// 9. BOOKING AVAILABILITY (POST)
router.post('/booking-availability', authMiddleware, bookingAvailabilityController);

// 10. APPOINTMENT LIST (GET)
router.get('/user-appointments', authMiddleware, userAppointmentsController);

module.exports = router;
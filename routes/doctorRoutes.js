const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController } = require('../controllers/doctorCtrl');

const router = express.Router();

// 1. SINGLE DOC INFO (POST)
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController);

// 2. UPDATE PROFILE (POST)
router.post('/updateProfile', authMiddleware, updateProfileController);

// 3. GET SINGLE DOC INFO FOR APPOINTMENT (POST)
router.post('/getDoctorById', authMiddleware, getDoctorByIdController);

// 4. APPOINTMENT LIST (GET)
router.get('/doctor-appointments', authMiddleware, doctorAppointmentsController);

// 5. UPDATE APPOINTMENT STATUS
router.post('/update-status', authMiddleware, updateStatusController);

module.exports = router;
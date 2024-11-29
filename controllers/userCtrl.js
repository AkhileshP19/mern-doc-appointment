const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/appointmentModel');
const moment = require('moment');

// register callback
const registerController = async(req, res) => {
    try {
        // check if the user already exists
        const existingUser = await userModel.findOne({email: req.body.email});
        if (existingUser) {
            return res.status(200).send({message: 'User already exists', success: false});
        }
        const {password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(200).send({message: 'Registration successful', success: true});
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: `Register controller ${error}`});
    }
}

const loginController = async(req, res) => {
    try {
        const user = await userModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(200).send({message: 'User not found', success: false});
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({message: 'Invalid email or password', success: false});
        }
        // generate toke when email and password are correct
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'}); // here we specify based on what we wanna sign, expire time & secret key
        res.status(200).send({message: 'Login successful', success: true, token});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Login controller ${error}`, success: false});   
    }
}

const authController = async(req, res) => { 
    try {
        const user = await userModel.findOne({_id: req.body.userId});
        user.password = undefined;
        if (!user) {
            res.status(200).send({message: 'User not found', success: false});
        } else {
            res.status(200).send({
                success: true,
                data: user
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Auth error', success: false, error});
    }
}

const applyDoctorController = async(req, res) => {
    try {
        const { formData, userId } = req.body;
        const newDoctor = new doctorModel({
        ...formData,
        userId,
        timings: {
            start: formData.timings.start,
            end: formData.timings.end,
        },
        status: 'pending'
        });
        await newDoctor.save();
        const adminUser = await userModel.findOne({isAdmin: true});
        const notification = adminUser.notification;
        notification.push({
            type: 'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for doctor account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + ' ' + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, {notification});
        res.status(201).send({
            success: true,
            message: 'Doctor account applied successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while applying for a doctor'
        })
    }
}

const getAllNotificationsController = async(req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        user.seenNotification.push(...user.notification);
        user.notification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: 'All notifications marked as read',
            data: updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error in notifications',
            success: false,
            error
        })
    }
}

const deleteAllNotificationsController = async(req, res) => {
    try {
        const user = await userModel.findOne({_id: req.body.userId});
        user.notification = [];
        user.seenNotification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: 'Notifications deleted successfully',
            data: updatedUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Unable to delete all notifications',
            error
        })
    }
}

const getAllDoctorsController = async(req, res) => {
    try {
        const doctors = await doctorModel.find({status: 'approved'});
        res.status(200).send({
            success: true,
            message: 'Doctors list fetched successfully',
            data: doctors
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while fetching doctors',
            error
        })
    }
}

const bookAppointmentController = async(req, res) => {
    try {
        const newAppointment = new appointmentModel({
        ...req.body,
        status: 'pending',
        });
        await newAppointment.save();
        const user = await userModel.findOne({_id: req.body.doctorInfo.userId});
        user.notification.push({
            type: 'New-appointment-request',
            message: `A new appointment request from ${req.body.userInfo.name}`,
            onClickPath: '/doctor-appointments'
        })
        await user.save();
        res.status(200).send({
            success: true,
            message: 'Appointment booked successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while booking appointment',
            error
        })
    }
}

const bookingAvailabilityController = async (req, res) => {
    try {
      const { date, time, doctorId } = req.body;
  
      // Fetch doctor's working timings
      const doctor = await doctorModel.findById(doctorId);
      if (!doctor) {
        return res.status(404).send({
          success: false,
          message: "Doctor not found",
        });
      }
  
      const { start, end } = doctor.timings;
  
      // Check if the requested time is within the doctor's working hours
      if (time < start || time > end) {
        return res.status(200).send({
          success: true, // Query executed successfully
          message: "The selected time is outside the doctor's working hours",
        });
      }
  
      // Check if the requested time slot is already booked
      const existingAppointment = await appointmentModel.findOne({
        doctorId,
        date, // Match date
        time, // Match time
      });
  
      if (existingAppointment) {
        return res.status(200).send({
          success: true,
          message: "The selected time slot is already booked",
        });
      }
  
      return res.status(200).send({
        success: true,
        message: "The selected time slot is available",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Error checking booking availability",
        error,
      });
    }
  };
  

const userAppointmentsController = async(req, res) => {
    try {
        const appointments = await appointmentModel.find({userId: req.body.userId});
        res.status(200).send({
            success: true,
            message: 'User appointments fetched successfully',
            data: appointments
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetching user appointments',
            error
        })   
    }
}

module.exports = {
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationsController,
    deleteAllNotificationsController,
    getAllDoctorsController,
    bookAppointmentController,
    bookingAvailabilityController,
    userAppointmentsController
}
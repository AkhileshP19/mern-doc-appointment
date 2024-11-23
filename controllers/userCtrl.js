const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');

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
        // const newDoctor = new doctorModel({...req.body, status: 'pending'});
        const { formData, userId } = req.body;

        // Ensure you pass the exact structure to the model
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
            message: 'unable to delete all notifications',
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
    deleteAllNotificationsController
}
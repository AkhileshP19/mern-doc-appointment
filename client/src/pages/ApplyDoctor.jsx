import React, { useState } from "react";
import Layout from "../components/Layout"; // Ensure Layout is correctly imported
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import TimePicker from "react-time-picker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "@/redux/features/alertSlice";
import axios from "axios";

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    specialization: "",
    experience: "",
    feesPerConsultation: "",
    timings: { start: "", end: "" },
  });


  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      timings: { ...prev.timings, [field]: value },
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { timings } = formData;
    if (timings.start >= timings.end) {
      alert("End time must be after the start time.");
      return;
    }

    // Submit form logic here
    try {
      dispatch(showLoading());
      console.log(formData);
      const res = await axios.post(
        '/api/v1/user/apply-doctor',
        { formData, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        },
        { withCredentials: true }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        alert(res.data.message);
        navigate('/')
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      alert('Something went wrong');
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">Apply Doctor</h1>
        <form onSubmit={onSubmitHandler} className="space-y-6">
          {/* Personal Details */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700">Personal Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Your first name"
                  value={formData.firstName}
                  onChange={onChangeHandler}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Your last name"
                  value={formData.lastName}
                  onChange={onChangeHandler}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                  Phone No
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Your contact number"
                  value={formData.phone}
                  onChange={onChangeHandler}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={onChangeHandler}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-600">
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  placeholder="Your website"
                  value={formData.website}
                  onChange={onChangeHandler}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-600">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Your clinic address"
                  value={formData.address}
                  onChange={onChangeHandler}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700">Professional Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <div>
                <label htmlFor="specialization" className="block text-sm font-medium text-gray-600">
                  Specialization
                </label>
                <input
                  id="specialization"
                  name="specialization"
                  type="text"
                  placeholder="Your specialization"
                  value={formData.specialization}
                  onChange={onChangeHandler}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-600">
                  Experience
                </label>
                <input
                  id="experience"
                  name="experience"
                  type="text"
                  placeholder="Your experience"
                  value={formData.experience}
                  onChange={onChangeHandler}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="feesPerConsultation" className="block text-sm font-medium text-gray-600">
                  Fees Per Consultation
                </label>
                <input
                  id="feesPerConsultation"
                  name="feesPerConsultation"
                  type="number"
                  placeholder="Consultation fee"
                  value={formData.feesPerConsultation}
                  onChange={onChangeHandler}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="col-span-2 flex gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Start Time</label>
                  <TimePicker
                    onChange={(value) => handleTimeChange("start", value)}
                    value={formData.timings.start}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">End Time</label>
                  <TimePicker
                    onChange={(value) => handleTimeChange("end", value)}
                    value={formData.timings.end}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ApplyDoctor;

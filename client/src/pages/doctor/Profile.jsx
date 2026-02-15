import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import TimePicker from "react-time-picker";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
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

  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
        setFormData({
          firstName: res.data.data.firstName || "",
          lastName: res.data.data.lastName || "",
          phone: res.data.data.phone || "",
          email: res.data.data.email || "",
          website: res.data.data.website || "",
          address: res.data.data.address || "",
          specialization: res.data.data.specialization || "",
          experience: res.data.data.experience || "",
          feesPerConsultation: res.data.data.feesPerConsultation || "",
          timings: res.data.data.timings || { start: "", end: "" },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

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

    try {
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        { ...formData, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        alert(res.data.message);
        navigate('/');
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">Update Profile</h1>
        <form onSubmit={onSubmitHandler} className="space-y-6">
          {/* Personal Details */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700">Personal Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {/* Map over the input fields */}
              {[
                { label: "First Name", name: "firstName" },
                { label: "Last Name", name: "lastName" },
                { label: "Phone No", name: "phone" },
                { label: "Email", name: "email", type: "email" },
                { label: "Website", name: "website" },
                { label: "Address", name: "address" },
              ].map(({ label, name, type = "text" }) => (
                <div key={name}>
                  <label htmlFor={name} className="block text-sm font-medium text-gray-600">
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={onChangeHandler}
                    className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Professional Details */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700">Professional Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {[
                { label: "Specialization", name: "specialization" },
                { label: "Experience", name: "experience" },
                { label: "Fees Per Consultation", name: "feesPerConsultation", type: "number" },
              ].map(({ label, name, type = "text" }) => (
                <div key={name}>
                  <label htmlFor={name} className="block text-sm font-medium text-gray-600">
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={onChangeHandler}
                    className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              ))}
              <div className="col-span-2 flex gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Start Time</label>
                  <TimePicker
                    onChange={(value) => handleTimeChange("start", value)}
                    value={formData.timings.start}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">End Time</label>
                  <TimePicker
                    onChange={(value) => handleTimeChange("end", value)}
                    value={formData.timings.end}
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
              Update
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;

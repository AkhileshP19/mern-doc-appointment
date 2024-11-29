import React from "react";
import { useNavigate } from "react-router-dom";

// Utility function to convert 24-hour to 12-hour format
const convertTo12HourFormat = (time24) => {
    const [hour, minute] = time24.split(":").map(Number); // Split time and convert to numbers
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // Convert hour to 12-hour format
    const minuteFormatted = minute < 10 ? `0${minute}` : minute; // Ensure minutes are always 2 digits
    return `${hour12}:${minuteFormatted} ${ampm}`;
  };

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer bg-white transform transition-all hover:scale-105"
      onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
    >
      <div className="px-6 pt-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Dr. {doctor.firstName} {doctor.lastName}
        </h2>
      </div>
      <div className="px-6 pt-2 pb-2">
        <p className="text-gray-600">
          <b>Specialization:</b> {doctor.specialization}
        </p>
        <p className="text-gray-600">
          <b>Experience:</b> {doctor.experience} years
        </p>
        <p className="text-gray-600">
          <b>Fees Per Consultation:</b> ₹{doctor.feesPerConsultation}
        </p>
        <p className="text-gray-600">
          <b>Address:</b> {doctor.address}
        </p>
        <p className="text-gray-600">
          <b>Timings:</b> {convertTo12HourFormat(doctor.timings.start)} - {convertTo12HourFormat(doctor.timings.end)}
        </p>
      </div>
    </div>
  );
};

export default DoctorList;

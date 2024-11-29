import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

// Utility function to convert 24-hour time to 12-hour format
const convertTo12HourFormat = (time24) => {
  const [hour, minute] = time24.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  const minuteFormatted = minute < 10 ? `0${minute}` : minute;
  return `${hour12}:${minuteFormatted} ${ampm}`;
};

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  // Fetch doctor data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "https://8080-akhileshp19-merndocappo-ydgtrjbvv97.ws-us117.gitpod.io/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
//     try {
//         dispatch(showLoading());

//         if (!date || !time) {
//             return alert("Date & time are required");
//         }

//         const res = await axios.post(
//             "https://8080-akhileshp19-merndocappo-ydgtrjbvv97.ws-us117.gitpod.io/api/v1/user/booking-availability",
//             {
//                 userId: user._id,
//                 doctorId: params.doctorId,
//                 date, // Send as "YYYY-MM-DD"
//                 time, // Send as "HH:mm"
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             }
//         );

//         dispatch(hideLoading());
//         if (res.data.success) {
//             setIsAvailable(true); // Set availability
//             console.log(isAvailable);
//             alert(res.data.message);
//         } else {
//             setIsAvailable(false); // Ensure button remains disabled if not available
//             alert(res.data.message);
//         }
//     } catch (error) {
//         dispatch(hideLoading());
//         console.log(error);
//     }
// };

  const handleAvailability = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      // dispatch(showLoading());

      if (!date || !time) {
        // dispatch(hideLoading());
        return alert("Date & time are required");
      }

      const res = await axios.post(
        "https://8080-akhileshp19-merndocappo-ydgtrjbvv97.ws-us117.gitpod.io/api/v1/user/booking-availability",
        {
          userId: user._id,
          doctorId: params.doctorId,
          date, // Send as "YYYY-MM-DD"
          time, // Send as "HH:mm"
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // dispatch(hideLoading());
      console.log(date, time);
      
      if (res.data.success) {
        setIsAvailable(res.data.message.includes("available"));
        alert(res.data.message);
      } else {
        setIsAvailable(false);
        alert(res.data.message);
      }
    } catch (error) {
      // dispatch(hideLoading());
      console.error(error);
    }
  };  

  const handleBooking = async () => {
    try {
      if (!date || !time) {
        return alert('Date & time are required');
      }
  
      dispatch(showLoading());
  
      const res = await axios.post(
        "https://8080-akhileshp19-merndocappo-ydgtrjbvv97.ws-us117.gitpod.io/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date, // Send as "YYYY-MM-DD"
          time, // Send as "HH:mm"
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        alert('Booked successfully');
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h3 className="text-2xl font-semibold text-center my-4">Booking Page</h3>
      <div className="container mx-auto p-4">
        {doctors && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold text-gray-800">
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <p className="text-gray-600 mt-2">
              <strong>Fees:</strong> ₹{doctors.feesPerConsultation}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Timings:</strong> {doctors.timings ? convertTo12HourFormat(doctors.timings.start) : "N/A"} -{" "}
              {doctors.timings ? convertTo12HourFormat(doctors.timings.end) : "N/A"}
            </p>

            <div className="flex flex-col space-y-4 mt-4 w-full max-w-md mx-auto">
              {/* Date picker with label */}
              <label htmlFor="date" className="text-gray-700 font-semibold">
                Select Date
              </label>
              <input
                type="date"
                id="date"
                min={new Date().toISOString().split("T")[0]} // Disables all past dates
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />

              {/* Time picker with label */}
              <label htmlFor="time" className="text-gray-700 font-semibold">
                Select Time
              </label>
              <TimePicker
                id="time"
                value={time}
                onChange={(value) => setTime(value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                format="hh:mm a" // 12-hour format with AM/PM
                // disableClock={true} // Optional: Disable clock UI
                // minTime={
                //   doctors.timings
                //     ? convertTo12HourFormat(doctors.timings.start) // Convert to 12-hour
                //     : "12:00 AM"
                // }
                // maxTime={
                //   doctors.timings
                //     ? convertTo12HourFormat(doctors.timings.end) // Convert to 12-hour
                //     : "11:59 PM"
                // }
              />

              <div className="flex flex-col">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                  onClick={handleAvailability} // Placeholder for availability check
                >
                  Check Availability
                </button>
                <button
                  className={`bg-black disabled:bg-gray-500 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none mt-3`}
                  onClick={handleBooking}
                  disabled={!isAvailable} // Disabled unless booking is available
                >
                  Book Now
                </button>

              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;

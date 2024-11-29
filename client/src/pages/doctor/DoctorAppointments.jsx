import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Layout from "@/components/Layout";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "https://8080-akhileshp19-merndocappo-ydgtrjbvv97.ws-us117.gitpod.io/api/v1/doctor/doctor-appointments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "https://8080-akhileshp19-merndocappo-ydgtrjbvv97.ws-us117.gitpod.io/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        alert(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Appointments List</h1>
        {appointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Date & Time</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {appointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">{appointment._id}</td>
                    <td className="py-3 px-6 text-left">
                      {appointment.userInfo.name}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {appointment.userInfo.email}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {moment(appointment.date).format("DD-MM-YYYY")} &nbsp;
                      {moment(appointment.time, "HH:mm").format("hh:mm A")}
                    </td>
                    <td className="py-3 px-6 text-left">{appointment.status}</td>
                    <td className="py-3 px-6 text-left">
                      {appointment.status === "pending" && (
                        <div className="flex">
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                            onClick={() =>
                              handleStatus(appointment, "approved")
                            }
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() =>
                              handleStatus(appointment, "rejected")
                            }
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-10">
            <p className="text-gray-500 text-lg">
              No appointments at this moment.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DoctorAppointments;

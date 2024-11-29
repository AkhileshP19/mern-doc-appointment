import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import moment from "moment";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "https://8080-akhileshp19-merndocappo-ydgtrjbvv97.ws-us117.gitpod.io/api/v1/user/user-appointments",
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

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          Appointments List
        </h1>
        {appointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Phone</th>
                  <th className="py-3 px-6 text-left">Date & Time</th>
                  <th className="py-3 px-6 text-left">Status</th>
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
                      {appointment.doctorInfo.firstName}{" "}
                      {appointment.doctorInfo.lastName}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {appointment.doctorInfo.phone}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {moment(appointment.date).format("DD-MM-YYYY")} &nbsp;
                      {moment(appointment.time, "HH:mm").format("hh:mm A")}
                    </td>
                    <td className="py-3 px-6 text-left">{appointment.status}</td>
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

export default Appointments;

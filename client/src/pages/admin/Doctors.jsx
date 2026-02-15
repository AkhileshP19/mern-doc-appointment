import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";

const Doctors = () => {
	const [doctors, setDoctors] = useState([]);

	// Fetch doctors
	const getDoctors = async () => {
		try {
			const res = await axios.get(
				'/api/v1/admin/getAllDoctors',
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`
					}
				},
				{ withCredentials: true }
			);
			if (res.data.success) {
				setDoctors(res.data.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Handle account status change
	const handleAccountStatus = async (record, status) => {
		try {
			const res = await axios.post(
				'/api/v1/admin/changeAccountStatus',
				{ doctorId: record._id, userId: record.userId, status: status },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`
					}
				},
				{ withCredentials: true }
			);
			if (res.data.success) {
				alert(res.data.message);
				window.location.reload();
			}
		} catch (error) {
			alert("Something Went Wrong");
		}
	};

	useEffect(() => {
		getDoctors();
	}, []);

	return (
		<Layout>
			<h1 className="text-center text-2xl font-bold mb-4">All Doctors</h1>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-300 shadow rounded-lg">
					<thead className="bg-gray-100 border-b border-gray-300">
						<tr>
							<th className="text-left text-sm font-medium text-gray-700 px-4 py-2">Name</th>
							<th className="text-left text-sm font-medium text-gray-700 px-4 py-2">Status</th>
							<th className="text-left text-sm font-medium text-gray-700 px-4 py-2">Phone</th>
							<th className="text-left text-sm font-medium text-gray-700 px-4 py-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{doctors.length > 0 ? (
							doctors.map((doctor) => (
								<tr key={doctor._id} className="border-b hover:bg-gray-50 transition">
									<td className="px-4 py-2 text-sm text-gray-800">
										{doctor.firstName} {doctor.lastName}
									</td>
									<td className="px-4 py-2 text-sm text-gray-800">{doctor.status}</td>
									<td className="px-4 py-2 text-sm text-gray-800">{doctor.phone}</td>
									<td className="px-4 py-2 text-sm text-gray-800">
										<div className="flex items-center gap-2">
											{doctor.status === "pending" ? (
												<button
													className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
													onClick={() => handleAccountStatus(doctor, "approved")}
												>
													Approve
												</button>
											) : (
												<button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
													Reject
												</button>
											)}
										</div>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="4" className="text-center text-sm text-gray-500 px-4 py-2">
									No doctors found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</Layout>
	);
};

export default Doctors;

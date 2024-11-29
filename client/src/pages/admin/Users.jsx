import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);

    // Fetch users
    const getUsers = async () => {
        try {
            const res = await axios.get(
                'https://8080-akhileshp19-merndocappo-ydgtrjbvv97.ws-us117.gitpod.io/api/v1/admin/getAllUsers',
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
                },
                {withCredentials: true}
              );
            if (res.data.success) {
                setUsers(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Layout>
            <h1 className="text-center text-2xl font-bold mb-4">Users List</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow rounded-lg">
                    <thead className="bg-gray-100 border-b border-gray-300">
                        <tr>
                            <th className="text-left text-sm font-medium text-gray-700 px-4 py-2">Name</th>
                            <th className="text-left text-sm font-medium text-gray-700 px-4 py-2">Email</th>
                            <th className="text-left text-sm font-medium text-gray-700 px-4 py-2">Doctor</th>
                            <th className="text-left text-sm font-medium text-gray-700 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-2 text-sm text-gray-800">{user.name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{user.email}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">
                                        {user.isDoctor ? "Yes" : "No"}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-800">
                                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                            Block
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center text-sm text-gray-500 px-4 py-2"
                                >
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Users;

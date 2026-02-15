import DoctorList from "@/components/DoctorList";
import Layout from "../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {
    const [doctors, setDoctors] = useState([]);

    async function getUserData() {
        try {
            const res = await axios.get(
                '/api/v1/user/getAllDoctors',
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    }
                })
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <Layout>
            <h1 className="text-3xl font-semibold text-center mt-8">Home Page</h1>
            <div className="flex flex-wrap justify-center mt-8">
                {doctors && doctors.map((doctor) => (
                    <DoctorList key={doctor._id} doctor={doctor} />
                ))}
            </div>
        </Layout>
    )
}

export default HomePage;
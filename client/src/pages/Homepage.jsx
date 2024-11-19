import axios from "axios";
import { useEffect } from "react";

function HomePage() {
    async function getUserData() {
        try {
            const res = await axios.post('https://8080-akhileshp19-merndocappo-ydgtrjbvv97.ws-us116.gitpod.io/api/v1/user/getUserData', {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <div>
            homepage
        </div>
    )
}

export default HomePage;
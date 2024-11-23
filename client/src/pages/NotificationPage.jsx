import Layout from "@/components/Layout";
import { hideLoading, showLoading } from "@/redux/features/alertSlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NotificationPage() {
  const [activeTab, setActiveTab] = useState(0); // 0 for unread, 1 for read
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // handle read notification
  async function handleMarkAllRead() {
    try {
        dispatch(showLoading());
        const res = await axios.post(
            'https://8080-akhileshp19-merndocappo-ydgtrjbvv97.ws-us116.gitpod.io/api/v1/user/get-all-notification', 
            {userId: user._id},
            {headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }}
        );
        dispatch(hideLoading());
        if (res.data.success) {
            alert(res.data.message);
        } else {
            alert(res.data.message);
        }
    } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        alert('Something went wrong');
    }
  }

  async function handleDeleteAllRead() {
    try {
        dispatch(showLoading());
        const res = await axios.post(
            'https://8080-akhileshp19-merndocappo-ydgtrjbvv97.ws-us116.gitpod.io/api/v1/user/delete-all-notification', 
            {userId: user._id},
            {headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }}
        );
        dispatch(hideLoading());
        if (res.data.success) {
            alert(res.data.message);
        } else {
            alert(res.data.message);
        }
    } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        alert('Something went wrong');
    }
  }

  return (
    <Layout>
      <h4 className="text-center text-lg font-semibold py-3">Notification Page</h4>

      {/* Tabs Header */}
      <div className="flex border-b border-gray-300">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 0 ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab(0)}
        >
          Unread
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 1 ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Read
        </button>
      </div>

      {/* Tabs Content */}
      <div className="mt-4">
        {activeTab === 0 && (
          <div>
            <div className="flex justify-end">
              <h4
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={handleMarkAllRead}
              >
                Mark All Read
              </h4>
            </div>
            {user?.notification?.length > 0 ? (
              user.notification.map((notificationMgs) => (
                <div
                  key={notificationMgs._id}
                  className="border border-gray-300 rounded-lg shadow-md p-4 my-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(notificationMgs.onClickPath)}
                >
                  <p className="text-gray-700">{notificationMgs.message}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4">No unread notifications</p>
            )}
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <div className="flex justify-end">
              <h4
                className="text-red-600 cursor-pointer hover:underline"
                onClick={handleDeleteAllRead}
              >
                Delete All Read
              </h4>
            </div>
            {user?.seenNotification?.length > 0 ? (
                user.seenNotification.map((notificationMgs) => (
                    <div
                    key={notificationMgs._id}
                    className="border border-gray-300 rounded-lg shadow-md p-4 my-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => navigate(notificationMgs.onClickPath)}
                    >
                    <p className="text-gray-700">{notificationMgs.message}</p>
                    </div>
                ))
                ) : (
                <p className="text-center text-gray-500 mt-4">No notifications to read</p>
                )}

          </div>
        )}

        
      </div>
    </Layout>
  );
};

export default NotificationPage;

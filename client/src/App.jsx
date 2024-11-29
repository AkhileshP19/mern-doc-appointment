import HomePage from "./pages/Homepage"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import {Routes, Route} from 'react-router-dom'
import { useSelector } from "react-redux";
import Spinner from "./components/Spinners";
import ProtectedRoute from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoutes";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";

function App() {
  const {loading} = useSelector(state => state.alerts)

  return (
    <div>
     {
      loading ? (
        <Spinner />
      ) : (
          <Routes>
            <Route 
              path='/' 
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/login' 
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } 
            />
            <Route 
              path='/register' 
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute> 
              } 
            />
            <Route 
              path='/apply-doctor' 
              element={
                <ProtectedRoute>
                  <ApplyDoctor />
                </ProtectedRoute> 
              } 
            />
            <Route 
              path='/notification' 
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute> 
              } 
            />
            <Route 
              path='/admin/users' 
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute> 
              } 
            />
            <Route 
              path='/admin/doctors' 
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute> 
              } 
            />
            <Route 
              path='/doctor/profile/:id' 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute> 
              } 
            />
            <Route 
              path='/doctor/book-appointment/:doctorId' 
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute> 
              } 
            />
            <Route 
              path='/appointments' 
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute> 
              } 
            />
            <Route 
              path='/doctor-appointments' 
              element={
                <ProtectedRoute>
                  <DoctorAppointments />
                </ProtectedRoute> 
              } 
            />
          </Routes>
        )
     } 
      
    </div>
  )
}

export default App

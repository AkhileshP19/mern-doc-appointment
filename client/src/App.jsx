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
          </Routes>
        )
     } 
      
    </div>
  )
}

export default App

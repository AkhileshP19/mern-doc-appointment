import HomePage from "./pages/Homepage"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import {Routes, Route} from 'react-router-dom'


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </div>
  )
}

export default App

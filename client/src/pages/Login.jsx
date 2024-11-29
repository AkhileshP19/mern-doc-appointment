import {Label} from '../components/ui/label';
import {Input} from '../components/ui/input';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onChangeHandler(e) {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const res = await axios.post(
        'https://8080-akhileshp19-merndocappo-ydgtrjbvv97.ws-us117.gitpod.io/api/v1/user/login',
        formData,
        { withCredentials: true }
      );
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem('token', res.data.token)
        alert('Login successful');
        navigate('/');
      } else {
        dispatch(hideLoading());
        alert(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      alert('Something went wrong');
    }
    
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="space-y-4 max-w-md w-full bg-white p-6 rounded-lg shadow-md" onSubmit={onSubmitHandler}>
        <h1 className="text-2xl font-semibold mb-4 text-center">Sign In</h1>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="Enter your email" 
            value={formData.email}
            onChange={onChangeHandler}
            className="mt-2" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="Enter your password" 
            value={formData.password}
            onChange={onChangeHandler}
            className="mt-2" />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
        >
          Login
        </button>
        <p className='text-sm text-center'>Don't have an account
          <Link to='/register' className='ml-2 underline'>Register</Link>
        </p>
      </form>
    </div>
  );
}
  
export default LoginForm;
import {Label} from '../components/ui/label'
import {Input} from '../components/ui/input'
import { useState } from 'react';
import {Link} from 'react-router-dom'

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  function onChangeHandler(e) {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  function onSubmitHandler(e) {
    e.preventDefault()
    console.log(formData); 
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="space-y-4 max-w-md w-full bg-white p-6 rounded-lg shadow-md" onSubmit={onSubmitHandler}>
        <h1 className="text-2xl font-semibold mb-4 text-center">Sign Up</h1>
        <div>
          <Label htmlFor="name">Username</Label>
          <Input 
            id="name" 
            name="name" 
            type="text" 
            placeholder="Enter your username" 
            value={formData.name}
            onChange={onChangeHandler}
            className="mt-2" />
        </div>
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
          Register
        </button>
        <p className='text-sm text-center'>Already have an account
          <Link to='/login' className='ml-2 underline'>Login</Link>
        </p>
      </form>
    </div>
  );
}
  
export default RegisterForm;
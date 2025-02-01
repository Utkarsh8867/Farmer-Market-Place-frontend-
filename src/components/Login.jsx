



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/'); // Redirect to home if user is already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/v2/user/login-user', formData);

      if (response.status === 200) {
        const { token, userId, role } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);

        toast.success('Login successful!');
        
        // Role-based redirection
        if (role === 'user') {
          navigate('/Landingpage');
        } else if (role === 'admin') {
          navigate('/AdminDashboard');
        } else if (role === 'seller') {
          navigate('/seller');
        } else {
          navigate('/');
        }
      } else {
        toast.error(response.data.message || 'Login failed!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?
          <button
            onClick={() => navigate('/register')}
            className="text-blue-500 hover:underline ml-1"
          >
            Register
          </button>
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-red-500 hover:underline w-full text-center"
        >
          Close
        </button>
      </div>
      
      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default Login;



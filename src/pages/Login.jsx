import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [apiError, setApiError] = React.useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setApiError(null);
    try {
      const response = await axios.post('https://nowruzi.top/api/User/Login', data);
      if (response.status === 200 && response.data.isSuccess) {
        // Save user info to localStorage
        localStorage.setItem('user', JSON.stringify(response.data.data));
        toast.success('Login successful!');
        setTimeout(() => navigate('/'), 1000);
      } else {
        setApiError(response.data.message || 'Login failed');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setApiError(error.response.data.message || 'Login failed');
      } else {
        setApiError(error.message);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Mobile</label>
          <input
            type="text"
            {...register('mobile', { required: 'Mobile is required' })}
            placeholder="Enter your mobile number"
          />
          {errors.mobile && <p className="form-error">{errors.mobile.message}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            placeholder="Enter your password"
          />
          {errors.password && <p className="form-error">{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        {apiError && <p className="form-fail">{apiError}</p>}
      </form>
    </div>
  );
}

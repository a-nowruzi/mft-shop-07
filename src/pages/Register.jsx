import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, reset } = useForm();
  const [apiError, setApiError] = React.useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setApiError(null);
    try {
      const response = await axios.post('https://nowruzi.top/api/User/Register', data);
      if (response.status === 200 && response.data.isSuccess) {
        // Save user info to localStorage
        localStorage.setItem('user', JSON.stringify(response.data.data));
        toast.success(response.data.message || 'Registration successful!');
        reset();
        setTimeout(() => navigate('/'), 1000);
      } else {
        setApiError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const res = error.response.data;
        if (res.errors) {
          // Set field errors from API
          Object.entries(res.errors).forEach(([field, messages]) => {
            setError(field.charAt(0).toLowerCase() + field.slice(1), {
              type: 'manual',
              message: messages.join('، '),
            });
          });
        }
        setApiError(res.message || 'Registration failed');
      } else {
        setApiError(error.message);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
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
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            {...register('firstName', { required: 'First name is required' })}
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            {...register('lastName', { required: 'Last name is required' })}
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="form-error">{errors.lastName.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
        {apiError && <p className="form-fail">{apiError}</p>}
      </form>
    </div>
  );
}

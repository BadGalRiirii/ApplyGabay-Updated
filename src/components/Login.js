import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/Login.css';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log('Login successful. Redirecting to Dashboard.');
      navigate('/dashboard'); // Navigate to the Dashboard after successful login
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Login failed: ' + error.message);
    }
  };

  // Function to navigate back to the Welcome Page
  const handleBackToWelcome = () => {
    navigate('/'); // Navigate back to WelcomePage
  };

  return (
    <div className="login-container">
      <h2>Login to ApplyGabay</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}

        {/* Password Field */}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}

        <button type="submit">Login</button>
      </form>

      <div className="login-footer">
        <p>Don't have an account? <a href="/signup">Sign Up here</a></p>
      </div>

      {/* Back to Welcome Page Button */}
      <button onClick={handleBackToWelcome} className="back-btn">
        Back to Welcome Page
      </button>
    </div>
  );
}

export default Login;

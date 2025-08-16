import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import './SignupPage.css';

function SignupPage() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    // Data to send for registration
    const signupData = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };

    try {
      // Use the register function from AuthContext
      await register(signupData);
      // If successful, navigate to books page
      navigate('/login');
    } catch (err) {
      console.error('[DEBUG] SignUp component error:', err);
      setError(err.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => console.log('Google signup clicked');
  const handleAppleSignup = () => console.log('Apple signup clicked');
  const handleLoginRedirect = () => navigate('/login');

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h2>Join READIFY</h2>
        <p>Create your account to explore our book collection</p>
      </div>

      <div className="signup-form-container">
        {error && <div className="error-message">{error}</div>}

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="Enter your full name" 
              disabled={isLoading} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="Enter your email" 
              disabled={isLoading} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              placeholder="Create a password" 
              minLength="6" 
              disabled={isLoading} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
              placeholder="Confirm password" 
              disabled={isLoading} 
            />
          </div>

          <div className="form-group">
            <button type="submit" className="primary-button" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="divider"><span>Or sign up with</span></div>

        <div className="social-signup">
          <button onClick={handleAppleSignup} className="social-button" disabled={isLoading}><span>Apple</span></button>
          <button onClick={handleGoogleSignup} className="social-button" disabled={isLoading}><span>Google</span></button>
        </div>

        <div className="login-prompt">
          <p>Already have an account? <button onClick={handleLoginRedirect} className="link-button" disabled={isLoading}>Log in</button></p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
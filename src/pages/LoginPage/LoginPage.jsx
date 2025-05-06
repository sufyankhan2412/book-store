import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const { loginWithCredentials } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('[DEBUG] Attempting login with credentials');
      await loginWithCredentials(email, password);
      navigate('/home'); // Make sure this route exists
    } catch (err) {
      console.error('[DEBUG] Login component error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => navigate('/forgot-password');
  const handleSignUp = () => navigate('/signup');
  const handleAppleLogin = () => console.log('Login with Apple clicked');
  const handleGoogleLogin = () => console.log('Login with Google clicked');

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Welcome to READIFY</h2>
        <p>Sign in to access your account</p>
      </div>

      <div className="login-form-container">
        {error && <div className="error-message">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              disabled={isLoading}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              disabled={isLoading}
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="primary-button" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="divider"><span>Or login with</span></div>

        <div className="social-signup">
          <button onClick={handleAppleLogin} className="social-button" disabled={isLoading}><span>Apple</span></button>
          <button onClick={handleGoogleLogin} className="social-button" disabled={isLoading}><span>Google</span></button>
        </div>

        <div className="login-prompt">
          <p>Don't have an account? <button onClick={handleSignUp} className="link-button" disabled={isLoading}>Sign up</button></p>
          <p><button onClick={handleForgotPassword} className="link-button" disabled={isLoading}>Forgot Password?</button></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
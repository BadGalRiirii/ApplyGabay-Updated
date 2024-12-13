import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WelcomePage.css';

function WelcomePage() {
  const navigate = useNavigate();

  // Navigate to Login page for HR
  const handleHRClick = () => {
    navigate('/login');
  };

  // Navigate to Applicants page
  const handleApplicantClick = () => {
    navigate('/applicants');
  };

  return (
    <div className="welcome-page">
      <div className="content">
        <h1 className="heading">Welcome to ApplyGabay</h1>
        <p className="subheading">Your all-in-one platform for managing job applications efficiently.</p>

        <div className="button-container">
          <button className="btn hr-btn" onClick={handleHRClick}>HR</button>
          <button className="btn applicant-btn" onClick={handleApplicantClick}>Applicant</button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;

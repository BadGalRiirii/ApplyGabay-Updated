import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';  // Import WelcomePage
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Jobs from './components/Jobs';
import Candidates from './components/Candidates';
import TaskPage from './components/TaskPage'; 
import MessagesPage from './components/MessagesPage';
import SettingsPage from './components/SettingsPage';
import Applicants from './components/Applicants';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <div className="logo">
            <h1>ApplyGabay</h1>
          </div>
          <nav className="nav-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
            <Link to="/dashboard" className="nav-link">Home</Link>
          </nav>
        </header>

        <main className="content-container">
          <Routes>
            {/* Make WelcomePage the default route */}
            <Route path="/" element={<WelcomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/applicants" element={<Applicants />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2024 ApplyGabay. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

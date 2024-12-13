import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Updated to useNavigate for react-router-dom v6
import "../styles/SettingsPage.css";
import { FaRegBell, FaUserAlt, FaPaintBrush, FaSave, FaLock, FaCheckCircle, FaCog } from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import { RiNotificationLine } from "react-icons/ri";

const SettingsPage = () => {
  const navigate = useNavigate(); // Using useNavigate for React Router v6

  // State management for settings
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [email, setEmail] = useState("user@example.com");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "Light");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [helpCenterVisible, setHelpCenterVisible] = useState(false); // State for Help Center visibility

  // Handle form changes
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Store theme in localStorage
  };

  // Toggle notifications
  const toggleNotifications = () => setNotificationEnabled(!notificationEnabled);

  // Toggle change password form
  const toggleChangePassword = () => setChangePassword(!changePassword);

  // Simulate a save API call
  const saveSettings = () => {
    setLoading(true);
    setSaveStatus(null);

    // Simulate an API request with a timeout
    setTimeout(() => {
      setLoading(false);
      setSaveStatus("Settings saved successfully!");
    }, 1500);
  };

  // Toggle Help Center visibility
  const toggleHelpCenter = () => setHelpCenterVisible(!helpCenterVisible);

  // Handle the logout action
  const handleLogout = () => {
    // Clear session storage or local storage (adjust as per your app's logic)
    localStorage.removeItem("userToken"); // Example if using localStorage
    sessionStorage.removeItem("userToken"); // Example if using sessionStorage

    // Redirect to the login page or any other page after logout
    navigate("/login"); // Updated to use navigate for React Router v6
  };

  useEffect(() => {
    // Apply theme to body when theme changes
    if (theme === "Dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  return (
    <div className="settings-page">
      {/* Header Section */}
      <header className="settings-header">
        <h1><FaCog /> Settings</h1>
        <p>Customize your profile, notifications, appearance, security, and more.</p>
      </header>

      {/* Settings Container */}
      <div className="settings-container">
        {/* Notification Settings */}
        <section className="settings-section">
          <h2><FaRegBell /> Notification Settings</h2>
          <div className="settings-card">
            <p>Enable or disable notifications for updates</p>
            <button
              className={`toggle-btn ${notificationEnabled ? "enabled" : "disabled"}`}
              onClick={toggleNotifications}
            >
              {notificationEnabled ? "Enabled" : "Disabled"}
            </button>
          </div>
        </section>

        {/* Account Settings */}
        <section className="settings-section">
          <h2><FaUserAlt /> Account Settings</h2>
          <div className="settings-card">
            <p>Update your email address</p>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="settings-input"
              placeholder="Enter new email"
            />
          </div>
        </section>

        {/* Theme Settings */}
        <section className="settings-section">
          <h2><FaPaintBrush /> Appearance Settings</h2>
          <div className="settings-card">
            <p>Select your preferred theme</p>
            <select value={theme} onChange={handleThemeChange} className="settings-input">
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </div>
        </section>

        {/* Password Settings */}
        <section className="settings-section">
          <h2><FaLock /> Security Settings</h2>
          <div className="settings-card">
            <p>Change your password for added security</p>
            {!changePassword ? (
              <button className="toggle-btn" onClick={toggleChangePassword}>Change Password</button>
            ) : (
              <div className="password-change-form">
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="settings-input"
                  placeholder="Enter current password"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className="settings-input"
                  placeholder="Enter new password"
                />
                <button className="toggle-btn enabled" onClick={() => alert("Password changed successfully!")}>Save Password</button>
              </div>
            )}
          </div>
        </section>

        {/* Two-Factor Authentication */}
        <section className="settings-section">
          <h2><FaCheckCircle /> Two-Factor Authentication</h2>
          <div className="settings-card">
            <p>Enable two-factor authentication for added security</p>
            <button className="toggle-btn enabled">Enabled</button>
          </div>
        </section>

        {/* Help Section */}
        <section className="settings-section">
          <h2><IoMdHelpCircle /> Help & Support</h2>
          <div className="settings-card">
            <p>Need help? Get support or visit our FAQ</p>
            <button className="btn-help" onClick={toggleHelpCenter}>
              Go to Help Center
            </button>
            {helpCenterVisible && (
              <div className="help-center-content">
                <h3>Help Center</h3>
                <p>Here you can find frequently asked questions, troubleshooting tips, and how-to guides for using our app.</p>
                <ul>
                  <li><a href="/faq">FAQ</a></li>
                  <li><a href="/support">Contact Support</a></li>
                  <li><a href="/guides">User Guides</a></li>
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Save Settings Section */}
      <div className="save-settings">
        <button className="btn-save" onClick={saveSettings}>
          {loading ? "Saving..." : <><FaSave /> Save Changes</>}
        </button>
        {saveStatus && <p className="save-status">{saveStatus}</p>}
      </div>

      {/* Logout Button */}
      <div className="save-settings">
        <button className="btn-save btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;

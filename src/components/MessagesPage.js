import React, { useState } from "react";
import "../styles/MessagesPage.css";

function MessagesPage() {
  // Sample data for received messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      applicantName: "John Doe",
      subject: "Application for Software Developer",
      email: "john.doe@example.com",
      resume: "Resume.pdf",
      content: "Dear HR Team,\n\nI am writing to express my interest in the Software Developer role at your organization. Please find my resume attached.\n\nBest regards,\nJohn Doe",
      status: "Unread",
    },
    {
      id: 2,
      applicantName: "Jane Smith",
      subject: "Resume Submission: Marketing Specialist",
      email: "jane.smith@example.com",
      resume: "JaneSmith_Resume.pdf",
      content: "Hi,\n\nI am applying for the Marketing Specialist position. My resume is attached for your consideration.\n\nThanks,\nJane Smith",
      status: "Unread",
    },
    {
      id: 3,
      applicantName: "David Lee",
      subject: "Application for HR Manager Role",
      email: "david.lee@example.com",
      resume: "DavidLee_CV.pdf",
      content: "Hello,\n\nI am interested in the HR Manager role. Attached is my CV.\n\nKind regards,\nDavid Lee",
      status: "Reviewed",
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);

  const markAsReviewed = (id) => {
    setMessages(
      messages.map((message) =>
        message.id === id ? { ...message, status: "Reviewed" } : message
      )
    );
  };

  const closeModal = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="messages-page">
      {/* Header Section */}
      <header className="messages-header">
        <h1>Applicant Messages</h1>
        <p>View and manage messages from applicants.</p>
      </header>

      {/* Messages List */}
      <div className="messages-container">
        {messages.length === 0 ? (
          <p className="no-messages">No messages received yet.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message-card ${message.status.toLowerCase()}`}
            >
              <h2>{message.applicantName}</h2>
              <p>
                <strong>Subject:</strong> {message.subject}
              </p>
              <p>
                <strong>Email:</strong> {message.email}
              </p>
              <p className="status">
                <strong>Status:</strong> {message.status}
              </p>
              <div className="message-actions">
                <button
                  className="btn-view-message"
                  onClick={() => setSelectedMessage(message)}
                >
                  Open Email
                </button>
                {message.status === "Unread" && (
                  <button
                    className="btn-mark-reviewed"
                    onClick={() => markAsReviewed(message.id)}
                  >
                    Mark as Reviewed
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Email Modal */}
      {selectedMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedMessage.applicantName}</h2>
            <p>
              <strong>Subject:</strong> {selectedMessage.subject}
            </p>
            <p>
              <strong>Email:</strong> {selectedMessage.email}
            </p>
            <p>
              <strong>Resume:</strong> <a href={`#`}>{selectedMessage.resume}</a>
            </p>
            <pre className="email-content">{selectedMessage.content}</pre>
            <div className="modal-actions">
              <button className="btn-close-modal" onClick={closeModal}>
                Close
              </button>
              {selectedMessage.status === "Unread" && (
                <button
                  className="btn-mark-reviewed"
                  onClick={() => {
                    markAsReviewed(selectedMessage.id);
                    closeModal();
                  }}
                >
                  Mark as Reviewed
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessagesPage;

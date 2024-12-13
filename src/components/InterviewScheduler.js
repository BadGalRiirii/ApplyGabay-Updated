import React, { useState } from "react";
import "../styles/InterviewScheduler.css"; // Update the path here

const InterviewScheduler = () => {
  const [interviews, setInterviews] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [comments, setComments] = useState("");

  const handleAddInterview = () => {
    if (name && position && interviewDate) {
      const newInterview = { name, position, interviewDate, comments };
      setInterviews([...interviews, newInterview]);

      // Clear the form after submission
      setName("");
      setPosition("");
      setInterviewDate("");
      setComments("");
    }
  };

  return (
    <div className="interview-scheduler-container">
      <h2>Schedule an Interview</h2>
      <form className="interview-form">
        <input
          type="text"
          placeholder="Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <input
          type="datetime-local"
          value={interviewDate}
          onChange={(e) => setInterviewDate(e.target.value)}
        />
        <textarea
          placeholder="Additional Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        <button type="button" onClick={handleAddInterview}>
          Schedule Interview
        </button>
      </form>

      <div className="scheduled-interviews">
        <h3>Scheduled Interviews</h3>
        <ul>
          {interviews.map((interview, index) => (
            <li key={index}>
              <strong>{interview.name}</strong> - {interview.position}
              <br />
              <span>{interview.interviewDate}</span>
              <p>{interview.comments}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InterviewScheduler;
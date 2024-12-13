import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebase"; // Correct import for Firebase setup

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    manager: "",
    applicants: "", // Start with an empty string for applicants input
    department: "",
    gmail: "",
    status: "Open",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch jobs in real-time from Firestore based on the logged-in user's UID
  useEffect(() => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid; // Get the logged-in user's UID

    if (userId) {
      const unsubscribe = onSnapshot(
        collection(db, "users", userId, "jobs"), // Accessing the 'jobs' subcollection of the logged-in user
        (snapshot) => {
          const jobsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Jobs fetched from Firestore:", jobsList); // Add a log to check jobs
          setJobs(jobsList); // Update the state with new jobs
        },
        (error) => {
          console.error("Error fetching jobs:", error);
        }
      );

      return () => {
        unsubscribe(); // Clean up the listener on component unmount
      };
    } else {
      console.log("No user logged in");
    }
  }, []);

  // Add a new job
  const addJob = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const userId = auth.currentUser?.uid; // Get the current user's UID

    if (!userId) {
      alert("Please log in first.");
      return;
    }

    if (!newJob.title || !newJob.manager) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Convert applicants to an array of objects with a 'name' property
      const applicantsArray = newJob.applicants
        .split(",")
        .map((name) => ({ name: name.trim() })); // Convert to array of objects

      const newJobData = {
        ...newJob,
        applicants: applicantsArray, // Ensure it's an array of objects
      };

      console.log("New Job Data being added:", newJobData); // Log the new job data

      // Add the new job to the logged-in user's jobs subcollection
      await addDoc(collection(db, "users", userId, "jobs"), newJobData);

      // Reset the form inputs after submission
      setNewJob({
        title: "",
        manager: "",
        applicants: "",
        department: "",
        gmail: "",
        status: "Open",
      });
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  // Update job status (Open, Closed, Hired)
  const updateJobStatus = async (id, status) => {
    try {
      const auth = getAuth();
      const userId = auth.currentUser?.uid;
      if (userId) {
        const jobRef = doc(db, "users", userId, "jobs", id);
        await updateDoc(jobRef, { status });
      }
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  // Delete a job
  const deleteJob = async (id) => {
    try {
      const auth = getAuth();
      const userId = auth.currentUser?.uid;
      if (userId) {
        const jobRef = doc(db, "users", userId, "jobs", id);
        await deleteDoc(jobRef);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.manager.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-content">
      <div className="header">
        <h1>Job Management</h1>
      </div>
      <div className="content">
        {/* Add New Job Form */}
        <div className="applicant-form-container">
          <h3>Add New Job</h3>
          <form onSubmit={addJob} className="applicant-form">
            <input
              type="text"
              placeholder="Job Title"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Hiring Manager"
              value={newJob.manager}
              onChange={(e) => setNewJob({ ...newJob, manager: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Applicants (comma-separated)"
              value={newJob.applicants}
              onChange={(e) => setNewJob({ ...newJob, applicants: e.target.value })}
            />
            <input
              type="text"
              placeholder="Department"
              value={newJob.department}
              onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
            />
            <input
              type="email" // Changed to email input type
              placeholder="Gmail"
              value={newJob.gmail}
              onChange={(e) => setNewJob({ ...newJob, gmail: e.target.value })}
            />
            <button type="submit" className="submit-btn">
              Add Job
            </button>
          </form>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title or manager"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Job List Table */}
        <div className="job-listings">
          <h3>Job Listings</h3>
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Manager</th>
                <th>Applicants</th>
                <th>Department</th>
                <th>Gmail</th> {/* Changed from Salary Range */}
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>{job.manager}</td>
                    {/* Display applicants as a list of names */}
                    <td>
                      {job.applicants && job.applicants.length > 0
                        ? job.applicants.map((applicant) => applicant.name).join(", ")
                        : "No applicants"}
                    </td>
                    <td>{job.department || "N/A"}</td>
                    <td>{job.gmail || "N/A"}</td>
                    <td>
                      <select
                        value={job.status}
                        onChange={(e) => updateJobStatus(job.id, e.target.value)}
                      >
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                        <option value="Hired">Hired</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => deleteJob(job.id)} style={{ marginLeft: "10px" }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No jobs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
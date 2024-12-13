import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { collection, onSnapshot, updateDoc, deleteDoc, doc } from "firebase/firestore";
=======
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc } from "firebase/firestore";
>>>>>>> b1e638429e6a3043c1798e33ede0c7a13a108014
import { getAuth } from "firebase/auth";
import { db } from "./firebase";

function Jobs() {
  const [jobs, setJobs] = useState([]);
<<<<<<< HEAD
=======
  const [newJob, setNewJob] = useState({
    title: "",
    applicants: "",
    address: "",
    phoneNumber: "",
    status: "Open",
  });
>>>>>>> b1e638429e6a3043c1798e33ede0c7a13a108014
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch jobs in real-time from Firestore based on the logged-in user's UID
  useEffect(() => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (userId) {
      const unsubscribe = onSnapshot(
        collection(db, "users", userId, "jobs"),
        (snapshot) => {
          const jobsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Jobs fetched from Firestore:", jobsList);
          setJobs(jobsList);
        },
        (error) => {
          console.error("Error fetching jobs:", error);
        }
      );

      return () => {
        unsubscribe();
      };
    } else {
      console.log("No user logged in");
    }
  }, []);

<<<<<<< HEAD
=======
  // Add a new job
  const addJob = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
      alert("Please log in first.");
      return;
    }

    if (!newJob.title) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const applicantsArray = newJob.applicants
        .split(",")
        .map((name) => ({ name: name.trim() }));

      const newJobData = {
        ...newJob,
        applicants: applicantsArray,
      };

      console.log("New Job Data being added:", newJobData);

      await addDoc(collection(db, "users", userId, "jobs"), newJobData);

      setNewJob({
        title: "",
        applicants: "",
        address: "",
        phoneNumber: "",
        status: "Open",
      });
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

>>>>>>> b1e638429e6a3043c1798e33ede0c7a13a108014
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
<<<<<<< HEAD
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
=======
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
>>>>>>> b1e638429e6a3043c1798e33ede0c7a13a108014
  );

  return (
    <div className="main-content">
      <div className="header">
        <h1>LISTS OF APPLICANTS</h1>
      </div>
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title"
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
              <th>Applicants</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Status</th>
<<<<<<< HEAD
              <th>Resume</th> {/* New Resume Column */}
=======
>>>>>>> b1e638429e6a3043c1798e33ede0c7a13a108014
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>
                    {job.applicants && job.applicants.length > 0
                      ? job.applicants.map((applicant) => applicant.name).join(", ")
                      : "No applicants"}
                  </td>
                  <td>{job.address || "N/A"}</td>
                  <td>{job.phoneNumber || "N/A"}</td>
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
<<<<<<< HEAD
                    {job.resume ? (
                      <a
                        href={job.resumePreview || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </a>
                    ) : (
                      "No resume uploaded"
                    )}
                  </td>
                  <td>
=======
>>>>>>> b1e638429e6a3043c1798e33ede0c7a13a108014
                    <button onClick={() => deleteJob(job.id)} style={{ marginLeft: "10px" }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
<<<<<<< HEAD
                <td colSpan="7" style={{ textAlign: "center" }}>
=======
                <td colSpan="6" style={{ textAlign: "center" }}>
>>>>>>> b1e638429e6a3043c1798e33ede0c7a13a108014
                  No jobs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default Jobs;
=======
export default Jobs;
>>>>>>> b1e638429e6a3043c1798e33ede0c7a13a108014

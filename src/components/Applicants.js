import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebase";

function Applicants() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    applicants: "",
    address: "",
    phoneNumber: "",
    status: "Open",
    resume: null, // For storing the uploaded file
    resumePreview: null, // For previewing the uploaded file
  });

  // Fetch jobs in real-time from Firestore
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

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setNewJob({
        ...newJob,
        resume: file,
        resumePreview: URL.createObjectURL(file), // Temporary URL for preview
      });
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // Add a new job
  const addJob = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
      alert("Please log in first.");
      return;
    }

    if (!newJob.title || !newJob.resume) {
      alert("Please fill in all required fields, including uploading your resume.");
      return;
    }

    try {
      const applicantsArray = newJob.applicants
        .split(",")
        .map((name) => ({ name: name.trim() }));

      const newJobData = {
        ...newJob,
        applicants: applicantsArray,
        resume: newJob.resume.name, // Save only the file name to Firestore
      };

      console.log("New Job Data being added:", newJobData);

      await addDoc(collection(db, "users", userId, "jobs"), newJobData);

      setNewJob({
        title: "",
        applicants: "",
        address: "",
        phoneNumber: "",
        status: "Open",
        resume: null,
        resumePreview: null,
      });

      // Show success message
      window.alert("Application successfully submitted!");
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  return (
    <div className="main-content">
      <div className="header">
        <h1>APPLICANT FORM</h1>
      </div>
      <div className="content">
        <div className="applicant-form-container">
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
              placeholder="Applicants (comma-separated)"
              value={newJob.applicants}
              onChange={(e) =>
                setNewJob({ ...newJob, applicants: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address"
              value={newJob.address}
              onChange={(e) =>
                setNewJob({ ...newJob, address: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={newJob.phoneNumber}
              onChange={(e) =>
                setNewJob({ ...newJob, phoneNumber: e.target.value })
              }
            />
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />
            {newJob.resumePreview && (
              <iframe
                src={newJob.resumePreview}
                title="Resume Preview"
                width="100%"
                height="300px"
              ></iframe>
            )}
            <button type="submit" className="submit-btn">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default Applicants;
=======
export default Applicants;
>>>>>>> b1e638429e6a3043c1798e33ede0c7a13a108014

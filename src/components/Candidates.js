import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebase";
import { jsPDF } from "jspdf";
import "../styles/Candidates.css";

function Candidates() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [applicantsByStatus, setApplicantsByStatus] = useState({
    applied: [],
    interview: [],
    hired: [],
    rejected: [],
  });
  const [interviewDate, setInterviewDate] = useState({});

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

          setJobs(jobsList);

          const allApplicants = jobsList.flatMap((job) =>
            (job.applicants || []).map((applicant) => ({
              jobId: job.id,
              jobTitle: job.title,
              applicantName: applicant.name || "N/A",
              email: applicant.email || "example@example.com",
            }))
          );

          setApplicantsByStatus((prev) => ({
            ...prev,
            applied: allApplicants,
          }));
        },
        (error) => console.error("Error fetching jobs:", error)
      );

      return () => unsubscribe();
    }
  }, []);

  const moveApplicant = (applicant, fromStatus, toStatus) => {
    setApplicantsByStatus((prev) => ({
      ...prev,
      [fromStatus]: prev[fromStatus].filter((a) => a !== applicant),
      [toStatus]: [...prev[toStatus], { ...applicant, interviewDate: interviewDate[applicant.email] }],
    }));
    setInterviewDate((prev) => ({ ...prev, [applicant.email]: "" }));
  };

  const generatePDF = (statusFilter = null) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");

    doc.setFontSize(20);
    doc.text("Applicant Status History", 10, 10);

    doc.setFontSize(12);
    doc.text("Name", 10, 20);
    doc.text("Job Title", 60, 20);
    doc.text("Status", 140, 20);

    let yPosition = 30;

    if (statusFilter === "all") {
      Object.entries(applicantsByStatus).forEach(([status, applicants]) => {
        applicants.forEach((applicant) => {
          doc.text(applicant.applicantName, 10, yPosition);
          doc.text(applicant.jobTitle, 60, yPosition);
          doc.text(status.charAt(0).toUpperCase() + status.slice(1), 140, yPosition);
          yPosition += 10;
        });
      });
    } else {
      Object.entries(applicantsByStatus).forEach(([status, applicants]) => {
        if (statusFilter && status !== statusFilter) return;
        applicants.forEach((applicant) => {
          doc.text(applicant.applicantName, 10, yPosition);
          doc.text(applicant.jobTitle, 60, yPosition);
          doc.text(status.charAt(0).toUpperCase() + status.slice(1), 140, yPosition);
          yPosition += 10;
        });
      });
    }

    doc.save(`${statusFilter || "all"}_applicant_status_history.pdf`);
  };

  return (
    <div className="candidates-page">
      <div className="filters">
        <input
          type="text"
          placeholder="Search Applicants"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="download-buttons">
          <button className="download-pdf-btn" onClick={() => generatePDF("hired")}>
            Download Hired PDF
          </button>
          <button className="download-pdf-btn" onClick={() => generatePDF("rejected")}>
            Download Rejected PDF
          </button>
          <button className="download-pdf-btn" onClick={() => generatePDF("all")}>
            Download All PDF
          </button>
        </div>
      </div>

      <section className="dashboard-kanban">
        <h2>Applicants Workflow</h2>
        <div className="kanban-columns">
          {Object.entries(applicantsByStatus).map(([status, applicants]) => (
            <div className="kanban-column" key={status}>
              <h3>
                {status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="column-count">({applicants.length})</span>
              </h3>
              <ul>
                {applicants
                  .filter((applicant) =>
                    (applicant.applicantName || "").toLowerCase().includes(search.toLowerCase())
                  )
                  .map((applicant, index) => (
                    <li className="kanban-card" key={index}>
                      <h3>{applicant.applicantName}</h3>
                      <p className="position">Applied for: {applicant.jobTitle}</p>

                      {status === "applied" && (
                        <div>
                          <label>
                            Schedule Interview:
                            <input
                              type="datetime-local"
                              value={interviewDate[applicant.email] || ""}
                              onChange={(e) =>
                                setInterviewDate((prev) => ({
                                  ...prev,
                                  [applicant.email]: e.target.value,
                                }))
                              }
                            />
                          </label>
                          <button
                            style={{ padding: "5px 10px", marginLeft: "1px" }}
                            onClick={() =>
                              moveApplicant(applicant, "applied", "interview")
                            }
                          >
                            Move to Interview
                          </button>
                        </div>
                      )}

                      {status === "interview" && (
                        <div className="action-buttons">
                          <p>Interview Scheduled: {applicant.interviewDate || "Not Set"}</p>
                          <button
                            className="hire-button"
                            onClick={() =>
                              moveApplicant(applicant, "interview", "hired")
                            }
                          >
                            Hire
                          </button>
                          <button
                            className="reject-button"
                            onClick={() =>
                              moveApplicant(applicant, "interview", "rejected")
                            }
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Candidates;

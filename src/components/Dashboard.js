import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../styles/Dashboard.css';

function Dashboard() {
  const [data, setData] = useState({
    applied: [],
    interview: [],
    hired: [],
    rejected: [],
  });

  // Fetch applicants data (replace this with actual Firebase or data source logic)
  useEffect(() => {
    const fetchApplicantsData = async () => {
      // Replace this with actual data fetching from your database
      const dataFromCandidates = {
        applied: [
          { id: '1', name: 'John Doe' },
          { id: '2', name: 'Jane Smith' },
        ],
        interview: [
          { id: '3', name: 'Samuel Lee' },
        ],
        hired: [
          { id: '4', name: 'Alice Brown' },
        ],
        rejected: [
          { id: '5', name: 'Bob White' },
        ],
      };

      setData(dataFromCandidates);
    };

    fetchApplicantsData();
  }, []);

  // Move candidate to the Interview column
  const moveToInterview = (candidateId) => {
    const candidateToMove = data.applied.find(candidate => candidate.id === candidateId);
    const updatedApplied = data.applied.filter(candidate => candidate.id !== candidateId);
    const updatedInterview = [...data.interview, candidateToMove];

    setData({
      ...data,
      applied: updatedApplied,
      interview: updatedInterview,
    });
  };

  // Move candidate to the Hired column
  const moveToHired = (candidateId) => {
    const candidateToMove = data.interview.find(candidate => candidate.id === candidateId);
    const updatedInterview = data.interview.filter(candidate => candidate.id !== candidateId);
    const updatedHired = [...data.hired, candidateToMove];

    setData({
      ...data,
      interview: updatedInterview,
      hired: updatedHired,
    });
  };

  // Move candidate to the Rejected column
  const moveToRejected = (candidateId) => {
    const candidateToMove = data.interview.find(candidate => candidate.id === candidateId);
    const updatedInterview = data.interview.filter(candidate => candidate.id !== candidateId);
    const updatedRejected = [...data.rejected, candidateToMove];

    setData({
      ...data,
      interview: updatedInterview,
      rejected: updatedRejected,
    });
  };

  // Handle drag and drop actions
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startColumn = source.droppableId;
    const endColumn = destination.droppableId;

    if (startColumn === endColumn) {
      const newList = Array.from(data[startColumn]);
      const [movedItem] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, movedItem);

      setData({ ...data, [startColumn]: newList });
    } else {
      const startList = Array.from(data[startColumn]);
      const endList = Array.from(data[endColumn]);

      const [movedItem] = startList.splice(source.index, 1);
      endList.splice(destination.index, 0, movedItem);

      setData({ ...data, [startColumn]: startList, [endColumn]: endList });
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>APPLYGABAY</h2>
        <ul>
          <li>
            <Link to="/" className="active">Dashboard</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
          <li>
            <Link to="/candidates">Candidates</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
          <li>
            <Link to="/messages">Messages</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/interview-scheduler">Interview Scheduler</Link>
            </li> {/* This is the new link */}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Applicant Tracking System</h1>
          <div className="header-icons">
            <span role="img" aria-label="search">🔍</span>
            <span role="img" aria-label="notifications">🔔</span>
            <span role="img" aria-label="settings">⚙️</span>
          </div>
        </header>

        {/* Kanban Board (Workflow) */}
        <section className="dashboard-kanban">
          <h2>Today's Workflow</h2>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="kanban-columns">
              {['applied', 'interview', 'hired', 'rejected'].map((columnId) => (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided) => (
                    <div
                      className="kanban-column"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <h3>
                        {columnId.charAt(0).toUpperCase() + columnId.slice(1)} 
                        <span className="column-count">
                          ({data[columnId].length})
                        </span>
                      </h3>
                      <ul>
                        {data[columnId].map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <li
                                className="kanban-card"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {item.name}
                                {columnId === 'applied' && (
                                  <button onClick={() => moveToInterview(item.id)}>
                                    Move to Interview
                                  </button>
                                )}

                                {columnId === 'interview' && (
                                  <div className="action-buttons">
                                    <button className="hire-button" onClick={() => moveToHired(item.id)}>
                                      Hire
                                    </button>
                                    <button className="reject-button" onClick={() => moveToRejected(item.id)}>
                                      Reject
                                    </button>
                                  </div>
                                )}
                              </li>
                            )}
                          </Draggable>
                        ))}
                      </ul>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>

        </section>
      </main>
    </div>
  );
}

export default Dashboard;

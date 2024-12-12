import React, { useState } from 'react';
import '../styles/TaskPage.css';

function TaskPage() {
  // Predefined tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Schedule interview with John',
      dueDate: '2024-12-05',
      completed: false,
    },
    {
      id: 2,
      text: 'Review candidate resumes',
      dueDate: '2024-11-28',
      completed: true,
    },
    {
      id: 3,
      text: 'Prepare job description for Marketing Manager',
      dueDate: '2024-11-27',
      completed: false,
    },
    {
      id: 4,
      text: 'Onboarding New Candidates ',
      dueDate: '2024-12-16',
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '' && dueDate.trim() !== '') {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          dueDate,
          completed: false,
        },
      ]);
      setNewTask('');
      setDueDate('');
    }
  };

  const markAsDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getTaskStatus = (task) => {
    const today = new Date().toISOString().split('T')[0];
    if (task.completed) return 'completed';
    if (task.dueDate < today) return 'overdue';
    return 'upcoming';
  };

  return (
    <div className="task-page">
      {/* Header Section */}
      <header className="task-header">
        <h1>ApplyGabay Tasks</h1>
        <p>Manage your tasks effectively to streamline your workflow!</p>
      </header>

      {/* Task Input Section */}
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask} className="btn-add-task">
          Add Task
        </button>
      </div>

      {/* Task Categories */}
      <div className="task-categories">
        <h2>Upcoming Tasks</h2>
        {tasks.filter((task) => getTaskStatus(task) === 'upcoming').length ===
        0 ? (
          <p className="no-tasks">No upcoming tasks.</p>
        ) : (
          tasks
            .filter((task) => getTaskStatus(task) === 'upcoming')
            .map((task) => (
              <div key={task.id} className="task-card upcoming">
                <span>
                  {task.text} (Due: {task.dueDate})
                </span>
                <div className="task-actions">
                  <button
                    onClick={() => markAsDone(task.id)}
                    className="btn-done-task"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="btn-delete-task"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
        )}

        <h2>Overdue Tasks</h2>
        {tasks.filter((task) => getTaskStatus(task) === 'overdue').length ===
        0 ? (
          <p className="no-tasks">No overdue tasks.</p>
        ) : (
          tasks
            .filter((task) => getTaskStatus(task) === 'overdue')
            .map((task) => (
              <div key={task.id} className="task-card overdue">
                <span>
                  {task.text} (Due: {task.dueDate})
                </span>
                <div className="task-actions">
                  <button
                    onClick={() => markAsDone(task.id)}
                    className="btn-done-task"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="btn-delete-task"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
        )}

        <h2>Completed Tasks</h2>
        {tasks.filter((task) => getTaskStatus(task) === 'completed').length ===
        0 ? (
          <p className="no-tasks">No completed tasks yet.</p>
        ) : (
          tasks
            .filter((task) => getTaskStatus(task) === 'completed')
            .map((task) => (
              <div key={task.id} className="task-card completed">
                <span>
                  {task.text} (Completed)
                </span>
                <div className="task-actions">
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="btn-delete-task"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default TaskPage;

import React from 'react';
import PropTypes from 'prop-types';

// PUBLIC_INTERFACE
/**
 * PetProfilePage
 * Displays the selected pet's details, lists scheduled tasks, and shows care logs/history.
 * Provides editing and management controls via handler props.
 *
 * Props:
 *  - pet:           object with pet profile details (id, name, type, age, notes)
 *  - tasks:         array of care tasks associated with this pet
 *  - careLogs:      array of care log entries for this pet
 *  - onEditPet:         function: (petId) => void
 *  - onDeletePet:       function: (petId) => void
 *  - onAddTask:         function: (petId) => void
 *  - onEditTask:        function: (taskId) => void
 *  - onDeleteTask:      function: (taskId) => void
 *  - onAddCareLog:      function: (petId) => void
 *  - onEditCareLog:     function: (logId) => void
 *  - onDeleteCareLog:   function: (logId) => void
 *
 * Example usage:
 * <PetProfilePage
 *   pet={selectedPet}
 *   tasks={petTasks}
 *   careLogs={petCareLogs}
 *   onEditPet={handleEditPet}
 *   onDeletePet={handleDeletePet}
 *   onAddTask={handleAddTask}
 *   onEditTask={handleEditTask}
 *   onDeleteTask={handleDeleteTask}
 *   onAddCareLog={handleAddCareLog}
 *   onEditCareLog={handleEditCareLog}
 *   onDeleteCareLog={handleDeleteCareLog}
 * />
 */
export default function PetProfilePage({
  pet,
  tasks = [],
  careLogs = [],
  onEditPet = () => {},
  onDeletePet = () => {},
  onAddTask = () => {},
  onEditTask = () => {},
  onDeleteTask = () => {},
  onAddCareLog = () => {},
  onEditCareLog = () => {},
  onDeleteCareLog = () => {},
}) {
  if (!pet) {
    return (
      <section
        style={{
          padding: 32,
          textAlign: 'center',
          color: 'var(--text-secondary)',
        }}
      >
        <h2 style={{ color: 'var(--kavia-orange)' }}>Select a Pet</h2>
        <div>Choose a pet from the sidebar to view their profile.</div>
      </section>
    );
  }

  return (
    <section
      style={{
        background: 'var(--kavia-dark)',
        color: 'var(--text-color)',
        borderRadius: 11,
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)',
        padding: '2rem 1.3rem 2rem 1.3rem',
        margin: 0,
        maxWidth: 760,
      }}
      className="pet-profile-page"
      aria-labelledby="pet-profile-title"
    >
      {/* Pet Details Header */}
      <header style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h2 id="pet-profile-title" style={{ color: 'var(--kavia-orange)', marginBottom: 8, marginTop: 0 }}>
            {pet.name || "Unnamed Pet"}
          </h2>
          <div style={{ color: "var(--text-secondary)", fontSize: "1.18em", marginBottom: 7 }}>
            <span style={{ marginRight: 16 }}>
              <b>Type:</b> {pet.type || "—"}
            </span>
            <span style={{ marginRight: 16 }}>
              <b>Age:</b> {pet.age !== undefined && pet.age !== null && pet.age !== "" ? pet.age : "—"}
            </span>
          </div>
          {pet.notes && (
            <div
              style={{
                marginTop: 5,
                fontSize: "1.04em",
                maxWidth: 420,
                color: "#bababa"
              }}
            >
              <em>{pet.notes}</em>
            </div>
          )}
        </div>
        <div>
          <button
            className="btn"
            style={{ marginRight: 8, padding: "6px 14px", fontSize: "0.98em" }}
            aria-label={`Edit ${pet.name || 'pet'} profile`}
            onClick={() => onEditPet(pet.id)}
            title="Edit Pet Details"
          >✎ Edit</button>
          <button
            className="btn"
            style={{
              background: "#FF7676", color: "#fff",
              fontWeight: 600, padding: "6px 14px", fontSize: "0.98em"
            }}
            aria-label={`Delete ${pet.name || 'pet'} profile`}
            onClick={() => onDeletePet(pet.id)}
            title="Delete Pet"
          >🗑️ Delete</button>
        </div>
      </header>

      {/* Task List Section */}
      <section style={{ marginTop: 30, marginBottom: 37 }}>
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3}}>
          <h3 style={{ margin: 0, color: "#4CAF50" }}>Scheduled Tasks</h3>
          <button
            className="btn"
            style={{ background: "var(--kavia-orange)", color: "#fff", padding: "6px 13px", fontWeight: 500 }}
            aria-label={`Add task for ${pet.name || 'pet'}`}
            onClick={() => onAddTask(pet.id)}
            title="Add New Task"
          >+ Add Task</button>
        </div>
        {tasks.length === 0 ? (
          <div style={{ color: "var(--text-secondary)", marginTop: 14 }}>
            No scheduled tasks yet for this pet.
          </div>
        ) : (
          <ul style={{listStyle: "none", padding: 0, margin: 0, marginTop: 4}}>
            {tasks.map(task => (
              <li key={task.id} style={{
                border: "1px solid var(--border-color)",
                borderRadius: 5,
                padding: "10px 13px",
                marginBottom: 11,
                display: "flex",
                alignItems: "center",
                background: "#232323"
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ fontSize: "1.06em" }}>{task.taskName}</strong>
                  <span style={{
                    marginLeft: 8,
                    color: "var(--kavia-orange)",
                    fontSize: ".97em"
                  }}>
                    {task.scheduledTime ? `@ ${task.scheduledTime}` : ""}
                  </span>
                  <span style={{
                    marginLeft: 12,
                    color: "#A1EAC6",
                    fontSize: ".96em"
                  }}>
                    {task.recurrence ? `[${task.recurrence}]` : ""}
                  </span>
                  {task.notes && (
                    <div style={{
                      color: "var(--text-secondary)",
                      fontSize: ".99em",
                      marginTop: 3,
                    }}>
                      {task.notes}
                    </div>
                  )}
                </div>
                <button
                  className="btn"
                  style={{
                    background: "transparent",
                    color: "#FF9800",
                    padding: "5px 8px",
                    fontSize: "1em",
                    marginRight: 2,
                  }}
                  aria-label={`Edit ${task.taskName} task`}
                  onClick={() => onEditTask(task.id)}
                  title="Edit Task"
                >✎</button>
                <button
                  className="btn"
                  style={{
                    background: "transparent",
                    color: "#FF7676",
                    padding: "5px 8px",
                    fontSize: "1em"
                  }}
                  aria-label={`Delete ${task.taskName} task`}
                  onClick={() => onDeleteTask(task.id)}
                  title="Delete Task"
                >🗑️</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Care Logs Section */}
      <section style={{ marginBottom: 0 }}>
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 1}}>
          <h3 style={{ margin: 0, color: "#FF9800" }}>Care Logs</h3>
          <button
            className="btn"
            style={{ background: "#FF9800", color: "#fff", padding: "6px 12px", fontWeight: 500 }}
            aria-label={`Add care log entry for ${pet.name || 'pet'}`}
            onClick={() => onAddCareLog(pet.id)}
            title="Add Care Log Entry"
          >+ Add Log</button>
        </div>
        {careLogs.length === 0 ? (
          <div style={{ color: "var(--text-secondary)", marginTop: 13 }}>
            No care log entries yet for this pet.
          </div>
        ) : (
          <ul style={{listStyle: "none", padding: 0, margin: 0, marginTop: 4}}>
            {careLogs.map(log => (
              <li key={log.id} style={{
                border: "1px solid var(--border-color)",
                borderRadius: 5,
                padding: "10px 13px",
                marginBottom: 10,
                background: "#1E2128",
                display: "flex",
                alignItems: "center"
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{
                    fontWeight: 500,
                    color: "#4CAF50",
                    fontSize: "1.02em"
                  }}>
                    {log.taskName || "Care Activity"}
                  </span>
                  <span style={{
                    color: "var(--text-secondary)",
                    marginLeft: 9,
                    fontSize: ".99em"
                  }}>
                    {log.timestamp ? new Date(log.timestamp).toLocaleString() : "Unknown date"}
                  </span>
                  {log.notes && (
                    <div style={{
                      color: "var(--text-secondary)",
                      marginTop: 3,
                      fontSize: ".98em"
                    }}>
                      {log.notes}
                    </div>
                  )}
                </div>
                <button
                  className="btn"
                  style={{
                    background: "transparent",
                    color: "#FF9800",
                    padding: "5px 8px",
                    fontSize: "1em",
                    marginRight: 2,
                  }}
                  aria-label={`Edit care log entry`}
                  onClick={() => onEditCareLog(log.id)}
                  title="Edit Log Entry"
                >✎</button>
                <button
                  className="btn"
                  style={{
                    background: "transparent",
                    color: "#FF7676",
                    padding: "5px 8px",
                    fontSize: "1em"
                  }}
                  aria-label={`Delete care log entry`}
                  onClick={() => onDeleteCareLog(log.id)}
                  title="Delete Log Entry"
                >🗑️</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}

// Static PropTypes for robust developer usage and intellisense
PetProfilePage.propTypes = {
  pet: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    notes: PropTypes.string,
  }),
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      taskName: PropTypes.string.isRequired,
      scheduledTime: PropTypes.string,
      recurrence: PropTypes.string,
      notes: PropTypes.string,
    })
  ),
  careLogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      taskName: PropTypes.string,
      timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Date .toISOString() or unix timestamp
      notes: PropTypes.string,
    })
  ),
  onEditPet: PropTypes.func,
  onDeletePet: PropTypes.func,
  onAddTask: PropTypes.func,
  onEditTask: PropTypes.func,
  onDeleteTask: PropTypes.func,
  onAddCareLog: PropTypes.func,
  onEditCareLog: PropTypes.func,
  onDeleteCareLog: PropTypes.func,
};

/*
-------------------
Example MOCK DATA

const mockPet = {
  id: 1,
  name: "Bella",
  type: "Dog",
  age: 4,
  notes: "Needs gentle brushing, loves chicken treats."
};

const mockTasks = [
  { id: 101, taskName: "Morning Walk", scheduledTime: "07:00", recurrence: "daily", notes: "15min, leash", },
  { id: 102, taskName: "Feed Dinner", scheduledTime: "18:00", recurrence: "daily", notes: "Reduce portions", }
];

const mockCareLogs = [
  { id: 201, taskName: "Morning Walk", timestamp: "2024-06-12T07:05:02", notes: "Went smoothly." },
  { id: 202, taskName: "Feed Dinner", timestamp: "2024-06-11T18:05:12", notes: "Ate everything." }
];
-------------------
*/

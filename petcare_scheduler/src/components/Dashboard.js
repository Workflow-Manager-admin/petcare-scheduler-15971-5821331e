import React from 'react';
import PropTypes from 'prop-types';

// PUBLIC_INTERFACE
/**
 * Dashboard - Shows today's scheduled tasks for all pets.
 *
 * @param {Object[]} tasks - Array of today's tasks. Each task should have:
 *   {
 *     id: string|number,           // Unique task identifier
 *     petName: string,             // Name of the pet
 *     taskName: string,            // The title of the task
 *     scheduledTime: string,       // (Optional) Scheduled time in HH:mm or human format
 *     completed: boolean,          // Completion status for the day
 *   }
 * @param {function} onTaskCompletionToggle - Handler function: (taskId: string|number, checked: boolean) => void
 *
 * Example mock data to pass as props:
 * const mockTasks = [
 *   { id: 1, petName: "Bella", taskName: "Feed Breakfast", scheduledTime: "08:00", completed: false },
 *   { id: 2, petName: "Max", taskName: "Morning Walk", scheduledTime: "07:30", completed: true },
 *   { id: 3, petName: "Bella", taskName: "Medication", scheduledTime: "09:00", completed: false },
 *   ...
 * ];
 */

function groupTasksByPet(tasks) {
  const grouped = {};
  tasks.forEach(task => {
    if (!grouped[task.petName]) grouped[task.petName] = [];
    grouped[task.petName].push(task);
  });
  return grouped;
}

export default function Dashboard({ tasks, onTaskCompletionToggle }) {
  const groupedTasks = groupTasksByPet(tasks || []);

  return (
    <div className="dashboard-container" style={{
      background: 'var(--kavia-dark)',
      color: 'var(--text-color)',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 10px 0 rgba(0,0,0,0.1)',
      marginTop: '32px',
      marginBottom: '32px',
      maxWidth: '900px'
    }}>
      <h2 style={{marginTop: 0}}>Today's Pet Care Tasks</h2>
      {Object.keys(groupedTasks).length === 0 && (
        <div style={{ color: 'var(--text-secondary)' }}>
          No scheduled tasks for today.
        </div>
      )}
      {Object.entries(groupedTasks).map(([petName, petTasks]) => (
        <div key={petName} style={{
          marginBottom: '28px',
          borderLeft: '4px solid var(--kavia-orange)',
          paddingLeft: '17px',
          paddingTop: '7px'
        }}>
          <h3 style={{ color: 'var(--kavia-orange)', marginBottom: '8px', marginTop: '0.5em' }}>
            {petName}
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {petTasks.map(task => (
              <li key={task.id} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  gap: '12px',
                  background: task.completed ? 'rgba(76,175,80,0.07)' : 'var(--kavia-dark)',
                  borderRadius: '4px',
                  padding: '7px 11px',
                  border: '1px solid var(--border-color)'
                }}>
                  <input
                    type="checkbox"
                    checked={!!task.completed}
                    onChange={e => onTaskCompletionToggle(task.id, e.target.checked)}
                    style={{
                      accentColor: 'var(--kavia-orange)',
                      transform: 'scale(1.3)'
                    }}
                    aria-label={
                      task.completed
                        ? `Mark ${task.taskName} for ${petName} as incomplete`
                        : `Mark ${task.taskName} for ${petName} as complete`
                    }
                  />
                  <span style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'var(--text-secondary)' : 'inherit',
                    fontWeight: 500
                  }}>
                    {task.taskName}
                  </span>
                  {task.scheduledTime && (
                    <span style={{
                      marginLeft: 'auto',
                      fontSize: '0.98em',
                      color: 'var(--text-secondary)',
                      fontWeight: 400
                    }}>
                      {task.scheduledTime}
                    </span>
                  )}
                  {task.completed && (
                    <span style={{
                      marginLeft: '10px',
                      fontSize: '0.96em',
                      color: '#4CAF50',
                      fontWeight: 500
                    }}>
                      ✓ Completed
                    </span>
                  )}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// Only for developer usage/proptypes; actual propTypes usage is recommended on integration.
/**
Dashboard.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    petName: PropTypes.string.isRequired,
    taskName: PropTypes.string.isRequired,
    scheduledTime: PropTypes.string,
    completed: PropTypes.bool.isRequired
  })),
  onTaskCompletionToggle: PropTypes.func.isRequired
};
*/

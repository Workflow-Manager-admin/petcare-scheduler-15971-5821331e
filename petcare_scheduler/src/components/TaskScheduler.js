import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// PUBLIC_INTERFACE
/**
 * TaskScheduler - Modal or section for creating/editing a recurring care task for a pet.
 *
 * Props:
 *  - pet:     { id, name, type, age, notes }            // Current pet info (required)
 *  - task:    { id, taskName, type, schedule, recurrence, reminder } // Existing task to edit (optional)
 *  - isEdit:  boolean                                   // If true, edit mode; else, create new
 *  - onSave:  function                                 // Handler: (taskData) => void
 *  - onCancel:function                                 // Handler: () => void
 *  - show:    boolean                                  // Controls modal visibility
 *  - availableTypes: [string]                          // Optional: list of task types (e.g., Feeding, Walking)
 *  - recurrenceOptions: [string|object]                // Optional: list of recurrence patterns/descriptions
 *
 * Any missing integration (e.g., availableTypes, recurrenceOptions) is covered by fallback data.
 */
export default function TaskScheduler({
  pet,
  task = null,
  isEdit = false,
  onSave = () => {},
  onCancel = () => {},
  show = true,
  availableTypes = null,
  recurrenceOptions = null
}) {
  // Fallbacks if not integrated yet
  const DEFAULT_TYPES = ['Feeding', 'Walking', 'Grooming', 'Medication', 'Other'];
  const DEFAULT_RECURRENCE = [
    { label: 'Every Day', value: 'daily' },
    { label: 'Every Week', value: 'weekly' },
    { label: 'On Specific Days', value: 'custom' }
  ];

  // State for form fields
  const [taskName, setTaskName] = useState('');
  const [type, setType] = useState('');
  const [schedule, setSchedule] = useState(''); // time, e.g., '08:00'
  const [recurrence, setRecurrence] = useState('');
  const [customDays, setCustomDays] = useState([]); // For custom recurrence
  const [reminder, setReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState('');

  // Populate if editing
  useEffect(() => {
    if (task) {
      setTaskName(task.taskName || '');
      setType(task.type || '');
      setSchedule(task.schedule || '');
      setRecurrence(task.recurrence || '');
      setCustomDays(Array.isArray(task.customDays) ? task.customDays : []);
      setReminder(!!task.reminder);
      setReminderTime(task.reminderTime || '');
    } else {
      setTaskName('');
      setType('');
      setSchedule('');
      setRecurrence('');
      setCustomDays([]);
      setReminder(false);
      setReminderTime('');
    }
  }, [task, show]);

  // Handle submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !type || !schedule || !recurrence) {
      alert('Please fill in all required fields.');
      return;
    }
    const data = {
      id: task?.id || undefined,
      petId: pet?.id,
      taskName,
      type,
      schedule,
      recurrence,
      customDays: recurrence === 'custom' ? customDays : undefined,
      reminder: !!reminder,
      reminderTime: reminder ? reminderTime : undefined,
    };
    onSave(data);
  };

  // For custom days of week selection UI (if recurrence is "custom")
  const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const handleCustomDayToggle = (d) => {
    setCustomDays(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    );
  };

  // Modal Styles (since we can't use external CSS frameworks)
  if (!show) return null;
  return (
    <div
      className="modal-overlay"
      role="dialog"
      tabIndex={-1}
      aria-modal="true"
      aria-labelledby="task-scheduler-title"
      style={{
        position: 'fixed',
        left: 0, top: 0, right: 0, bottom: 0,
        background: 'rgba(30,30,40,0.78)',
        zIndex: 5000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        className="modal-content"
        style={{
          background: 'var(--kavia-dark, #232323)',
          color: 'var(--text-color, #fff)',
          minWidth: 340,
          maxWidth: 450,
          width: '90vw',
          borderRadius: 11,
          boxShadow: '0 8px 32px 2px rgba(35,35,36,0.19)',
          padding: '26px 26px 20px 26px',
          position: 'relative',
        }}
      >
        <h2 id="task-scheduler-title" style={{ marginTop: 0, color: 'var(--kavia-orange)' }}>
          {isEdit ? 'Edit Task' : 'Add New Task'}
        </h2>
        <div style={{ color: "var(--text-secondary)", marginBottom: 18, fontSize: "1.07em" }}>
          For pet: <strong>{pet?.name || 'Unnamed Pet'}</strong>
        </div>
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          {/* Task Name */}
          <label style={{fontWeight: 500}}>
            Task Name<span style={{color: "#FF9800"}}>*</span>
            <input
              type="text"
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
              style={inputStyle}
              required
              aria-required="true"
              autoFocus
              maxLength={60}
              placeholder="e.g. Walk in Park"
            />
          </label>
          {/* Task Type */}
          <label style={{fontWeight: 500}}>
            Task Type<span style={{color: "#FF9800"}}>*</span>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              style={inputStyle}
              required
            >
              <option value="" disabled>Choose type…</option>
              {(availableTypes || DEFAULT_TYPES).map(t => (
                <option value={t} key={t}>{t}</option>
              ))}
            </select>
          </label>
          {/* Schedule Time */}
          <label style={{fontWeight: 500}}>
            Time to Perform<span style={{color: "#FF9800"}}>*</span>
            <input
              type="time"
              value={schedule}
              onChange={e => setSchedule(e.target.value)}
              style={inputStyle}
              required
            />
          </label>
          {/* Recurrence */}
          <label style={{fontWeight: 500}}>
            Recurrence<span style={{color: "#FF9800"}}>*</span>
            <select
              value={recurrence}
              onChange={e => setRecurrence(e.target.value)}
              style={inputStyle}
              required
            >
              <option value="" disabled>Choose recurrence…</option>
              {(recurrenceOptions || DEFAULT_RECURRENCE).map(opt =>
                typeof opt === 'string' ? (
                  <option value={opt} key={opt}>{opt}</option>
                ) : (
                  <option value={opt.value} key={opt.value}>{opt.label}</option>
                )
              )}
            </select>
          </label>
          {/* Custom Days for 'custom' recurrence */}
          {recurrence === 'custom' && (
            <div style={{marginTop: -7, marginBottom: 1, fontWeight: 500}}>
              Select Days:
              <div style={{display: 'flex', gap: 7, marginTop: 4}}>
                {DAYS.map(day => (
                  <label
                    key={day}
                    style={{
                      display: 'flex', alignItems: 'center',
                      gap: 2, background: customDays.includes(day)
                        ? 'var(--kavia-orange, #e87a41)'
                        : 'rgba(255,255,255,0.08)',
                      color: customDays.includes(day)
                        ? '#fff'
                        : 'var(--text-secondary, #bbb)',
                      borderRadius: 4, padding: '3px 8px', fontSize: '0.98em', cursor: 'pointer'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={customDays.includes(day)}
                      onChange={() => handleCustomDayToggle(day)}
                      style={{accentColor: 'var(--kavia-orange)', marginRight: 2}}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>
          )}
          {/* Reminder Option */}
          <div>
            <label style={{fontWeight: 500}}>
              <input
                type="checkbox"
                checked={reminder}
                onChange={e => setReminder(e.target.checked)}
                style={{ accentColor: "var(--kavia-orange)", marginRight: 5 }}
              />
              Set Reminder
            </label>
            {reminder && (
              <span style={{marginLeft: 12}}>
                at
                <input
                  type="time"
                  value={reminderTime}
                  onChange={e => setReminderTime(e.target.value)}
                  style={{
                    ...inputStyle,
                    width: 120,
                    marginLeft: 5
                  }}
                  required={reminder}
                />
              </span>
            )}
          </div>
          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: 15,
            marginTop: 14,
            justifyContent: "flex-end"
          }}>
            <button
              type="button"
              className="btn"
              style={{
                background: "transparent",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-color)",
                fontWeight: 500
              }}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn"
              style={{
                background: "var(--kavia-orange)",
                color: "#fff",
                fontWeight: 600
              }}
            >
              {isEdit ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
        {/* Small close X in corner */}
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          style={{
            position: 'absolute', right: 13, top: 13, background: "none", border: "none",
            color: "var(--text-secondary)", fontSize: "1.6em", cursor: "pointer", lineHeight: 1
          }}
          tabIndex={0}
        >
          ×
        </button>
      </div>
    </div>
  );
}

// Inline style object to ensure dark, modern theme consistent with App.css
const inputStyle = {
  display: 'block',
  width: '100%',
  fontSize: '1em',
  padding: '7px 8px',
  marginTop: '4px',
  marginBottom: '1px',
  borderRadius: '4px',
  border: '1px solid var(--border-color, #222)',
  background: '#181818',
  color: "#fff",
  outline: "none"
};

TaskScheduler.propTypes = {
  pet: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    type: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    notes: PropTypes.string,
  }),
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    taskName: PropTypes.string,
    type: PropTypes.string,
    schedule: PropTypes.string,
    recurrence: PropTypes.string,
    customDays: PropTypes.arrayOf(PropTypes.string),
    reminder: PropTypes.bool,
    reminderTime: PropTypes.string,
  }),
  isEdit: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  show: PropTypes.bool,
  availableTypes: PropTypes.arrayOf(PropTypes.string),
  recurrenceOptions: PropTypes.array,
};

import React from 'react';
import './App.css';

import Dashboard from './components/Dashboard';
import PetSidebar from './components/PetSidebar';
import PetProfile from './components/PetProfile';
import CareLogs from './components/CareLogs';
import TaskSchedulerModal from './components/TaskSchedulerModal';
import ReminderModal from './components/ReminderModal';

// PUBLIC_INTERFACE
function App() {
  // Placeholder layout for PetCare Scheduler with all skeleton components referenced
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> PetCare Scheduler
            </div>
            <button className="btn">Add Task</button>
          </div>
        </div>
      </nav>

      <main style={{ marginTop: 90, display: "flex", height: "85vh" }}>
        {/* Sidebar for switching pet profiles */}
        <div style={{ width: 220, borderRight: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
          <PetSidebar />
        </div>

        {/* Main content area */}
        <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          <Dashboard />
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ flex: 2 }}>
              <PetProfile />
            </div>
            <div style={{ flex: 2 }}>
              <CareLogs />
            </div>
          </div>
        </div>

        {/* Modals */}
        <TaskSchedulerModal />
        <ReminderModal />
      </main>
    </div>
  );
}

export default App;
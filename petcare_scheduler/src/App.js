import React from 'react';
import './App.css';
import MainContainer from './components/MainContainer';

function App() {
  // PUBLIC_INTERFACE
  /**
   * The root component of the PetCare Scheduler app.
   * Renders the MainContainer which contains all major features and navigation.
   */
  return (
    <div className="app">
      <MainContainer />
    </div>
  );
}

export default App;
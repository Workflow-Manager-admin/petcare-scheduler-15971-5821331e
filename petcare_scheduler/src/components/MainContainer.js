import React, { useState, useCallback, useMemo } from 'react';
import PetProfileList from './PetProfileList';
import Dashboard from './Dashboard';

// PUBLIC_INTERFACE
/**
 * MainContainer - The primary container for the PetCare Scheduler.
 * Holds and manages all central application state:
 * - Pet profiles and their data
 * - Scheduled tasks for each pet
 * - List of today's tasks & status
 * Passes down state and handler props to child views.
 */
export default function MainContainer() {
  // --- State Definition ---

  // Pet profiles: [{ id, name, type, age, notes, ... }]
  const [petProfiles, setPetProfiles] = useState(() => [
    // Mock profile examples (these would be fetched from storage in a full app)
    { id: 1, name: "Bella", type: "Dog", age: 4, notes: "Loves car rides" },
    { id: 2, name: "Whiskers", type: "Cat", age: 2, notes: "" }
  ]);
  // Selected pet for sidebar/profile view (default to first if available)
  const [selectedPetId, setSelectedPetId] = useState(() =>
    petProfiles.length > 0 ? petProfiles[0].id : null
  );

  // Keep selectedPetId in sync with petProfiles (if profiles change and id not in list, select first)
  React.useEffect(() => {
    if (
      petProfiles.length > 0 &&
      (selectedPetId === null || !petProfiles.some(p => p.id === selectedPetId))
    ) {
      setSelectedPetId(petProfiles[0].id);
    }
  }, [petProfiles, selectedPetId]);
  // Tasks: [{ id, petId, taskName, recurrence, notes, scheduledTime, ... }]
  const [tasks, setTasks] = useState(() => [
    { id: 1, petId: 1, taskName: "Feed Breakfast", scheduledTime: "08:00", recurrence: "daily", completed: false },
    { id: 2, petId: 2, taskName: "Change litter", scheduledTime: "09:30", recurrence: "daily", completed: false },
    { id: 3, petId: 1, taskName: "Morning Walk", scheduledTime: "07:40", recurrence: "daily", completed: true }
    // More tasks could be added here dynamically
  ]);
  // Completed status: keyed by task id for today's date (for primitive demo, key by task.id)
  const [completedTasks, setCompletedTasks] = useState({});

  // --- Derived Data: Today's Tasks ---
  // This would filter tasks based on recurrence schedule as well as date, for demo we use all.
  const todaysTasks = useMemo(() => {
    return tasks.map(task => ({
      ...task,
      petName: petProfiles.find(pet => pet.id === task.petId)?.name || "Unknown Pet",
      completed: typeof completedTasks[task.id] === 'boolean' ? completedTasks[task.id] : !!task.completed,
    }));
  }, [tasks, petProfiles, completedTasks]);

  // --- PetProfile handlers ---
  // PUBLIC_INTERFACE
  /** Handler to select a pet */
  const handleSelectPet = useCallback(
    (petId) => {
      setSelectedPetId(petId);
    }, []
  );
  // PUBLIC_INTERFACE
  /** Handler to add a pet profile */
  const handleAddPet = useCallback(() => {
    // Ideally, open a modal/form to get data; here, just demo a quick add
    const newId = petProfiles.length > 0 ? Math.max(...petProfiles.map(p => Number(p.id))) + 1 : 1;
    const name = window.prompt("Enter new pet's name:");
    if (!name) return;
    const type = window.prompt("Pet type (dog, cat, etc):");
    const age = window.prompt("Pet age:");
    const notes = window.prompt("Any notes?");
    const newPet = { id: newId, name, type, age, notes };
    setPetProfiles(prev => [...prev, newPet]);
    setSelectedPetId(newId);
  }, [petProfiles]);
  // PUBLIC_INTERFACE
  /** Handler to edit a pet profile */
  const handleEditPet = useCallback((petId) => {
    const pet = petProfiles.find(p => p.id === petId);
    if (!pet) return;
    const name = window.prompt("Edit name:", pet.name);
    if (!name) return;
    const type = window.prompt("Edit type:", pet.type);
    const age = window.prompt("Edit age:", pet.age);
    const notes = window.prompt("Edit notes:", pet.notes);
    const updatedPet = { ...pet, name, type, age, notes };
    setPetProfiles(prev => prev.map(p => p.id === petId ? updatedPet : p));
  }, [petProfiles]);
  // PUBLIC_INTERFACE
  /** Handler to delete a pet profile */
  const handleDeletePet = useCallback((petId) => {
    if (!window.confirm("Are you sure you wish to delete this pet profile?")) return;
    setPetProfiles(prev => prev.filter(p => p.id !== petId));
    // Remove tasks associated with this pet
    setTasks(prev => prev.filter(task => task.petId !== petId));
    // If the selected pet was deleted, select another
    setSelectedPetId(prev => prev === petId
      ? (petProfiles.find(p => p.id !== petId)?.id || null)
      : prev
    );
  }, [petProfiles]);
  
  // --- Dashboard handlers ---
  // PUBLIC_INTERFACE
  /** Handler to mark/unmark a task as complete for today */
  const handleTaskCompletionToggle = useCallback((taskId, checked) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: checked,
    }));
  }, []);

  // Layout style - responsive flex (sidebar + main)
  return (
    <div className="maincontainer-flex" style={{
      display: 'flex',
      alignItems: 'flex-start',
      minHeight: '88vh',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      paddingTop: 48,
    }}>
      {/* Sidebar Pet Profile List */}
      <PetProfileList
        petProfiles={petProfiles}
        selectedPetId={selectedPetId}
        onSelectPet={handleSelectPet}
        onAddPet={handleAddPet}
        onEditPet={handleEditPet}
        onDeletePet={handleDeletePet}
      />

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        padding: '1.5rem 1.2rem',
        background: 'var(--kavia-dark)',
        minHeight: "100%",
        minWidth: 0,
      }}>
        <Dashboard
          tasks={todaysTasks}
          onTaskCompletionToggle={handleTaskCompletionToggle}
        />
        {/* More core views/components (PetProfilePage, CareLogs, etc) go here in future */}
      </main>
    </div>
  );
}

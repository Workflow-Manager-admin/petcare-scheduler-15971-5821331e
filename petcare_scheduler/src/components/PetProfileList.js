import React from 'react';
import PropTypes from 'prop-types';

// PUBLIC_INTERFACE
/**
 * PetProfileList - Lists all pet profiles (sidebar/tab navigation).
 * 
 * Props:
 * @param {Object[]} petProfiles - Array of pet profile objects ({ id, name, type, age, notes } at minimum)
 * @param {string|number} selectedPetId - ID of the currently selected pet
 * @param {function} onSelectPet - Handler function: (petId) => void
 * @param {function} onAddPet - Handler function: () => void
 * @param {function} onEditPet - Handler function: (petId) => void
 * @param {function} onDeletePet - Handler function: (petId) => void
 * 
 * Example mock data:
 * const pets = [
 *   { id: 1, name: "Bella", type: "Dog", age: "4", notes: "Loves car rides" },
 *   { id: 2, name: "Whiskers", type: "Cat", age: "2", notes: "" },
 *   { id: 3, name: "Goldie", type: "Fish", age: "1", notes: "Sensitive to water changes" },
 * ];
 * <PetProfileList
 *   petProfiles={pets}
 *   selectedPetId={1}
 *   onSelectPet={id => setSelectedPetId(id)}
 *   onAddPet={() => openAddModal()}
 *   onEditPet={id => openEditModal(id)}
 *   onDeletePet={id => confirmDelete(id)}
 * />
 */
export default function PetProfileList({
  petProfiles = [],
  selectedPetId = null,
  onSelectPet = () => {},
  onAddPet = () => {},
  onEditPet = () => {},
  onDeletePet = () => {},
}) {
  return (
    <aside
      className="pet-profile-list"
      style={{
        minWidth: 260,
        maxWidth: 340,
        padding: "16px 8px",
        background: "var(--kavia-dark)",
        borderRight: "1px solid var(--border-color)",
        height: "100%",
        boxSizing: 'border-box',
        overflowY: "auto",
      }}
      aria-label="Pet Profiles List"
    >
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18}}>
        <h3 style={{
          margin: 0,
          color: "var(--kavia-orange)",
          fontWeight: 600,
        }}>Your Pets</h3>
        <button
          className="btn"
          style={{padding: "4px 13px", fontSize: 20, fontWeight: 600, borderRadius: 5}}
          aria-label="Add new pet"
          onClick={onAddPet}
          title="Add New Pet"
        >+</button>
      </div>
      {petProfiles.length === 0 && (
        <div style={{color: "var(--text-secondary)", marginTop: 24, fontSize: "1.05em"}}>
          No pets yet. Add your first pet!
        </div>
      )}
      <ul style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "6px"
      }}>
        {petProfiles.map(pet => {
          const isSelected = pet.id === selectedPetId;
          return (
            <li key={pet.id}>
              <div
                className="pet-profile-list-item"
                tabIndex={0}
                onClick={() => onSelectPet(pet.id)}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") onSelectPet(pet.id);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 13px",
                  borderRadius: 5,
                  border: isSelected ? "2px solid var(--kavia-orange)" : "1px solid var(--border-color)",
                  background: isSelected ? "rgba(232,122,65,0.13)" : "var(--kavia-dark)",
                  color: isSelected ? "var(--kavia-orange)" : "var(--text-color)",
                  fontWeight: isSelected ? 600 : 400,
                  cursor: "pointer",
                  outline: "none",
                  boxShadow: isSelected ? "0 1px 6px 0 rgba(232,122,65,0.09)" : "none",
                  transition: "background 0.13s, border 0.13s, color .13s"
                }}
                aria-selected={isSelected}
                role="button"
              >
                <div title={pet.type} style={{
                  flex: 1,
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                }}>
                  <span style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    fontSize: "1.08em"
                  }}>{pet.name || "Unnamed Pet"}</span>
                  <span style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.96em"
                  }}>{pet.type || ""}{pet.age ? `, Age: ${pet.age}` : ""}</span>
                  {pet.notes && (
                    <span
                      style={{
                        color: "#bababa",
                        fontSize: ".92em",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {pet.notes}
                    </span>
                  )}
                </div>
                <button
                  className="btn"
                  style={{
                    background: "transparent",
                    color: "var(--kavia-orange)",
                    border: "none",
                    padding: "2px 5px",
                    fontSize: "1.1em",
                    marginLeft: 6,
                    cursor: "pointer",
                  }}
                  title="Edit pet"
                  aria-label={`Edit ${pet.name || 'pet'}`}
                  onClick={e => {
                    e.stopPropagation();
                    onEditPet(pet.id);
                  }}
                  tabIndex={0}
                >✎</button>
                <button
                  className="btn"
                  style={{
                    background: "transparent",
                    color: "#FF7676",
                    border: "none",
                    padding: "2px 5px",
                    fontSize: "1.1em",
                    marginLeft: 3,
                    cursor: "pointer",
                  }}
                  title="Delete pet"
                  aria-label={`Delete ${pet.name || 'pet'}`}
                  onClick={e => {
                    e.stopPropagation();
                    onDeletePet(pet.id);
                  }}
                  tabIndex={0}
                >🗑️</button>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

// Static PropTypes for developer guidance
PetProfileList.propTypes = {
  petProfiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      type: PropTypes.string,
      age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      notes: PropTypes.string,
    })
  ),
  selectedPetId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelectPet: PropTypes.func,
  onAddPet: PropTypes.func,
  onEditPet: PropTypes.func,
  onDeletePet: PropTypes.func,
};

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HeroBanner = () => {
  // State to hold the selected specialty.
  const [specialty, setSpecialty] = useState("");
  // Hook from react-router-dom to navigate programmatically.
  const navigate = useNavigate();

  // Handles the "Enter" key press event on the specialty buttons.
  const handleItemKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSpecialtyName(event); // Set the specialty when "Enter" is pressed.
    }
  };

  // Updates the state with the value of the selected specialty.
  const handleSpecialtyName = (event) => {
    setSpecialty(event.target.value);
  };

  // Navigates to the ListWorkers page with the selected specialty as state.
  const handleSpecialty = () => {
    navigate("/list_workers", {
      state: {
        specialty: specialty,
      },
    });
  };

  return (
    <section className="hero-banner">
      <div className="hero-container">
        <div className="fill">
          <h1>Demandes plus fréquentes</h1> {/* Title for the hero section */}
          <div className="links">
            {/* Buttons for different specialties */}
            <button
              value='Plombier'
              className="btnSpecialty"
              onMouseEnter={handleSpecialtyName}  // Set specialty on mouse enter
              onTouchStart={handleSpecialtyName}  // Set specialty on touch start (for mobile)
              onClick={handleSpecialty}           // Navigate to the list page on click
              onKeyDown={handleItemKeyDown}       // Handle "Enter" key press
            >
              Plombier
            </button>
            <button
              value='Couturier'
              className="btnSpecialty"
              onMouseEnter={handleSpecialtyName}
              onTouchStart={handleSpecialtyName}
              onClick={handleSpecialty}
              onKeyDown={handleItemKeyDown}
            >
              Couturier
            </button>
            <button
              value='Coiffeur'
              className="btnSpecialty"
              onMouseEnter={handleSpecialtyName}
              onTouchStart={handleSpecialtyName}
              onClick={handleSpecialty}
              onKeyDown={handleItemKeyDown}
            >
              Coiffeur
            </button>
            <button
              value='Chocolatier'
              className="btnSpecialty"
              onMouseEnter={handleSpecialtyName}
              onTouchStart={handleSpecialtyName}
              onClick={handleSpecialty}
              onKeyDown={handleItemKeyDown}
            >
              Chocolatier
            </button>
            <button
              value='Bijoutier'
              className="btnSpecialty"
              onMouseEnter={handleSpecialtyName}
              onTouchStart={handleSpecialtyName}
              onClick={handleSpecialty}
              onKeyDown={handleItemKeyDown}
            >
              Bijoutier
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;


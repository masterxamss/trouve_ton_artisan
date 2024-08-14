import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HeroBanner = () => {
  const [specialty, setSpecialty] = useState("");
  const navigate = useNavigate();

  const handleItemKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSpecialtyName(event);
    }
  };      

  const handleSpecialtyName = (event) => {
    setSpecialty(event.target.value);
  };

  const handleSpecialty = () => {
    // Navigate to ListWorkers and send the status
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
          <h1>Demandes plus fréquentes</h1>
          <div className="links">
            <button
              value='Plombier'
              className="btnSpecialty"
              onMouseEnter={handleSpecialtyName}
              onTouchStart={handleSpecialtyName}
              onClick={handleSpecialty}
              onKeyDown={handleItemKeyDown}
            >
              Plombier
            </button >
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

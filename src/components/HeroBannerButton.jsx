import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const HeroBannerButton = (props) => {
  const [specialty, setSpecialty] = useState("");
  const navigate = useNavigate();

  // Handles the "Enter" key press event on the specialty buttons.
  const handleItemKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSpecialtyName(event);
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
    <button
      value={props.children}
      className="btnSpecialty"
      onMouseEnter={handleSpecialtyName} // Set specialty on mouse enter
      onTouchStart={handleSpecialtyName} // Set specialty on touch start (for mobile)
      onClick={handleSpecialty} // Navigate to the list page on click
      onKeyDown={handleItemKeyDown} // Handle "Enter" key press
    >
      {props.children}
    </button>
  );
};

HeroBannerButton.propTypes = {
  children: PropTypes.string.isRequired,
};

export default HeroBannerButton;

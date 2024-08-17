import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

const MenuButton = (props) => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  // Handles the "Enter" key press event on the menu button.
  const handleMenuItemKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCategoryName(event);
    }
  };

  // Updates the state with the value of the selected category.
  const handleCategoryName = (event) => {
    const categoryValue = event.target.getAttribute("value");
    setCategory(categoryValue);
  };

  // Navigates to the ListWorkers page with the selected category as state.
  const handleCategory = () => {
    navigate("/list_workers", {
      state: {
        category: category,
      },
    });
  };

  return (
    <button
      className="menu-button"
      value={props.category}              // Button value set to the passed category prop.
      onClick={handleCategory}            // Triggers navigation on click.
      tabIndex={0}                        // Makes the button focusable and interactive.
      onMouseEnter={handleCategoryName}   // Sets the category on mouse enter.
      onTouchStart={handleCategoryName}   // Sets the category on touch start (for mobile).
      onKeyDown={handleMenuItemKeyDown}   // Handles "Enter" key press for accessibility.
    >
      {props.category}                    
    </button>
  );
};

// PropTypes to ensure the correct type for the category prop.
MenuButton.propTypes = {
  category: PropTypes.string.isRequired,
};

export default MenuButton;


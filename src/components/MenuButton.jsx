import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

const MenuButton = (props) => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleMenuItemKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCategoryName(event);
    }
  };

  const handleCategoryName = (event) => {
    const categoryValue = event.target.getAttribute("value");
    setCategory(categoryValue);
  };

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
      value={props.category}
      onClick={handleCategory}
      tabIndex={0}
      onMouseEnter={handleCategoryName}
      onTouchStart={handleCategoryName}
      onKeyDown={handleMenuItemKeyDown}
    >
      {props.category}
    </button>
  );
};

MenuButton.propTypes = {
  category: PropTypes.string.isRequired,
};

export default MenuButton;

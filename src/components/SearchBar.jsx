import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../services/dataService";
import { FaChevronDown, FaSearch } from "react-icons/fa";

const SearchBar = () => {
  // State variables for storing the fetched data, UI states, and user selections
  const [data, setData] = useState([]);
  const [showSpecialty, setShowSpecialty] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [name, setName] = useState("");

  // References for dropdowns to handle clicks outside them
  const specialtyRef = useRef();
  const locationRef = useRef();

  // Hook for navigation between routes
  const navigate = useNavigate();

  // Fetch data when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setData(data);
      } catch (error) {
        console.error("Error getting data:", error);
      }
    };

    fetchData();
  }, []);

  // Toggle the visibility of the specialty dropdown
  const toggleSpecialty = () => {
    setShowSpecialty((prev) => !prev);
    setShowLocation(false);
  };

  // Toggle the visibility of the location dropdown
  const toggleLocation = () => {
    setShowLocation((prev) => !prev);
    setShowSpecialty(false);
  };

  // Reset the search fields after performing a search
  const resetItemsState = () => {
    setSelectedSpecialty("");
    setSelectedLocation("");
    setName("");
  };

  // Handle clicks outside the dropdown to close them
  const handleClickOutside = (event) => {
    if (specialtyRef.current && !specialtyRef.current.contains(event.target)) {
      setShowSpecialty(false);
    }
    if (locationRef.current && !locationRef.current.contains(event.target)) {
      setShowLocation(false);
    }
  };

  // Add event listener for detecting clicks outside dropdowns when the component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard interaction for the dropdowns (enter key)
  const handleKeyDown = (event, handler) => {
    if (event.key === "Enter") {
      handler(event);
    }
  };

  // Handle selecting a specialty from the dropdown
  const handleSpecialtySelect = (event) => {
    const selectedValue = event.target.textContent;
    setSelectedSpecialty(selectedValue);
    setShowSpecialty(false);
  };

  // Handle selecting a location from the dropdown
  const handleLocationSelect = (event) => {
    const selectedValue = event.target.textContent;
    setSelectedLocation(selectedValue);
    setShowLocation(false);
  };

  // Update the name state as the user types
  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  // Navigate to the search results page with the selected search parameters
  const handleSearch = () => {
    navigate("/list_workers", {
      state: {
        name,
        specialty: selectedSpecialty,
        location: selectedLocation,
      },
    });
  };

  // Render the search bar UI
  return (
    <div className="searchBar">
      {/* Input for searching by name */}
      <input
        tabIndex="0"
        type="text"
        placeholder="Nom"
        className="field-name"
        value={name}
        onChange={handleInputChange}
        aria-label="Search by name"
        id="name"
      />

      {/* Specialty dropdown */}
      <div className="search-items" ref={specialtyRef}>
        <div
          className="items-placeholder"
          onClick={toggleSpecialty}
          onKeyDown={(event) => handleKeyDown(event, toggleSpecialty)}
          tabIndex="0"
          role="button"
          aria-expanded={showSpecialty}
          aria-controls="specialty-dropdown"
        >
          <p>{selectedSpecialty || "Métier"}</p>
          <FaChevronDown className="chevron-down" />
        </div>

        {/* Dropdown list for specialties */}
        {showSpecialty && (
          <div
            id="specialty-dropdown"
            className="items"
            role="listbox"
            aria-label="Specialties"
          >
            {data.map((item, index) => (
              <p
                key={index}
                role="option"
                tabIndex="0"
                onClick={handleSpecialtySelect}
                onKeyDown={(event) => handleKeyDown(event, handleSpecialtySelect)}
              >
                {item.specialty}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Location dropdown */}
      <div className="search-items" ref={locationRef}>
        <div
          className="items-placeholder"
          onClick={toggleLocation}
          onKeyDown={(event) => handleKeyDown(event, toggleLocation)}
          tabIndex="0"
          role="button"
          aria-expanded={showLocation}
          aria-controls="location-dropdown"
        >
          <p>{selectedLocation || "Ville"}</p>
          <FaChevronDown className="chevron-down" />
        </div>

        {/* Dropdown list for locations */}
        {showLocation && (
          <div
            id="location-dropdown"
            className="items"
            role="listbox"
            aria-label="Locations"
          >
            {data.map((item, index) => (
              <p
                key={index}
                role="option"
                tabIndex="0"
                onClick={handleLocationSelect}
                onKeyDown={(event) => handleKeyDown(event, handleLocationSelect)}
              >
                {item.location}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Search button */}
      <button
        className="search-button"
        onClick={() => { handleSearch(); resetItemsState(); }}
        aria-label="Search"
      >
        <FaSearch className="search-icon" />
        <span>Rechercher</span>
      </button>
    </div>
  );
};

export default SearchBar;





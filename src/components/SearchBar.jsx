import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../services/dataService";
import { FaChevronDown, FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [data, setData] = useState([]);
  const [showSpecialty, setShowSpecialty] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [name, setName] = useState("");

  const specialtyRef = useRef();
  const locationRef = useRef();
  
  const navigate = useNavigate();

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

  const toggleSpecialty = () => {
    setShowSpecialty((prev) => !prev);
    setShowLocation(false);
  };

  const toggleLocation = () => {
    setShowLocation((prev) => !prev);
    setShowSpecialty(false);
  };

  const handleClickOutside = (event) => {
    if (specialtyRef.current && !specialtyRef.current.contains(event.target)) {
      setShowSpecialty(false);
    }
    if (locationRef.current && !locationRef.current.contains(event.target)) {
      setShowLocation(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (event, handler) => {
    if (event.key === "Enter") {
      handler(event);
    }
  };

  const handleSpecialtySelect = (event) => {
    const selectedValue = event.target.textContent;
    setSelectedSpecialty(selectedValue);
    setShowSpecialty(false);
  };

  const handleLocationSelect = (event) => {
    const selectedValue = event.target.textContent;
    setSelectedLocation(selectedValue);
    setShowLocation(false);
  };

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSearch = () => {
    navigate("/list_workers", {
      state: {
        name,
        specialty: selectedSpecialty,
        location: selectedLocation,
      },
    });
  };

  return (
    <div className="searchBar">
      <input
        tabIndex="0"
        type="text"
        placeholder="Nom"
        className="field-name"
        value={name}
        onChange={handleInputChange}
        aria-label="Search by name"
      />

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

      <button
        className="search-button"
        onClick={handleSearch}
        aria-label="Search"
      >
        <FaSearch className="search-icon" />
      </button>
    </div>
  );
};

export default SearchBar;



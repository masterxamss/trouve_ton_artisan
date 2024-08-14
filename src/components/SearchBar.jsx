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

  const handleKeyDownSpecialty = (event) => {
    if (event.key === "Enter") {
      toggleSpecialty();
    }
  };

  const handleKeyDownLocation = (event) => {
    if (event.key === "Enter") {
      toggleLocation();
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

  const handleItemKeyDown = (event, selectHandler) => {
    if (event.key === "Enter") {
      selectHandler(event);
    }
  };

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSearch = () => {
    // Navigate to ListWorkers and send the status
    navigate("/list_workers", {
      state: {
        name: name,
        specialty: selectedSpecialty,
        location: selectedLocation,
      },
    });
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Nom"
        className="field-name"
        value={name}
        onChange={handleInputChange}
      />

      <div className="search-items" ref={specialtyRef}>
        <div
          className="items-placeholder"
          tabIndex="0"
          onClick={toggleSpecialty}
          onKeyDown={handleKeyDownSpecialty}
        >
          <p>{selectedSpecialty || "Métier"}</p>
          <FaChevronDown className="chevron-down" />
        </div>

        {showSpecialty && (
          <div className="items">
            {data.map((specialty, index) => (
              <p
                key={index}
                value={specialty.specialty}
                tabIndex="0"
                onClick={handleSpecialtySelect}
                onKeyDown={(event) =>
                  handleItemKeyDown(event, handleSpecialtySelect)
                }
              >
                {specialty.specialty}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="search-items" ref={locationRef}>
        <div
          className="items-placeholder"
          tabIndex="0"
          onClick={toggleLocation}
          onKeyDown={handleKeyDownLocation}
        >
          <p>{selectedLocation || "Ville"}</p>
          <FaChevronDown className="chevron-down" />
        </div>

        {showLocation && (
          <div className="items">
            {data.map((location, index) => (
              <p
                key={index}
                value={location.location}
                tabIndex="0"
                onClick={handleLocationSelect}
                onKeyDown={(event) =>
                  handleItemKeyDown(event, handleLocationSelect)
                }
              >
                {location.location}
              </p>
            ))}
          </div>
        )}
      </div>

      <button className="search-button" onClick={handleSearch}>
        <FaSearch className="search-icon" />
      </button>
    </div>
  );
};

export default SearchBar;

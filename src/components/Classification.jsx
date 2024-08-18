import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCircleExclamation } from "react-icons/fa6";
import image from  "../assets/images/icons/artisan-calssification.png";
import imageEmployee from "../assets/images/employee-of-the-month.png";

import { printStars } from "../services/utilities"; // Utility function to print star ratings
import { fetchTopData } from "../services/dataService"; // Service function to fetch top workers data


const Classification = () => {
  const top = true;
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [filteredTopData, setFilteredTopData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const loadFilteredTopData = async () => {
      setLoading(true);
      try {
        const filtered = await fetchTopData(top);
        setFilteredTopData(filtered);
      } catch {
        setError("There was an issue fetching the workers");
      } finally {
        setLoading(false);
      }
    };
    loadFilteredTopData();
  }, [top]);

  // Handles the "Enter" key press event on the specialty buttons.
  const handleNameKeyDown = (event) => {
    if (event.key === "Enter") {
      handleName(event);
    }
  };

  // Updates the state with the value of the selected specialty.
  const handleNameValue = (event) => {
    setName(event.target.value);
  };

  // Navigates to the worker_file page with the selected name as state.
  const handleName = () => {
    navigate("/worker_file", {
      state: {
        name: name,
      },
    });
  };

  return (
    <section className="section-classification">
      <div className="classification-title">
        <h2 className="section-title">Artisan du mois</h2>
        <img
          src={image}
          alt="artisan classification"
        />
      </div>

      {/* Conditional rendering based on loading, error, and data status */}
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredTopData.length > 0 ? (
        <div className="container-classification">
          {filteredTopData.map((worker) => (
            <div className="card-classification" key={worker.id}>
              <div className="classification-img">
                <img
                  src={imageEmployee}
                  alt="employee of the month"
                />
              </div>
              <div className="classification-details">
                <ul>
                  <li>
                    <strong>Nom: </strong>
                    {worker.name}
                  </li>
                  <li>
                    <strong>Note: </strong>
                    {printStars(worker.note)} {worker.note} / 5
                  </li>
                  <li>
                    <strong>Métier: </strong>
                    {worker.specialty}
                  </li>
                  <li>
                    <strong>Ville: </strong>
                    {worker.location}
                  </li>
                </ul>
                <button
                  value={worker.name}
                  className="classification-btn"
                  onMouseEnter={handleNameValue} // Set specialty on mouse enter
                  onTouchStart={handleNameValue} // Set specialty on touch start (for mobile)
                  onClick={handleName} // Navigate to the list page on click
                  onKeyDown={handleNameKeyDown} // Handle "Enter" key press
                >
                  Voir artisan
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="error-message" tabIndex={0}>
          <FaCircleExclamation />
          Aucun artisan avec une note supérieure à 4,8
        </p>
      )}
    </section>
  );
};

export default Classification;

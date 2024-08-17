import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchFilteredData } from "../services/dataService";
import { FaArrowCircleDown } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import { AiFillCloseCircle } from "react-icons/ai";
import { getData } from "../services/dataService";

import CardWorker from "../components/CardWorker";
import BreadCrumbs from "../components/BreadCrumbs";

const ListWorkers = () => {
  // Extracting state parameters passed via the router's location object
  const location = useLocation();
  const {
    name,
    specialty,
    location: locationParam,
    category,
  } = location.state || {};

  // State variables to manage filtered data, loading state, error messages, and number of visible cards
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCards, setVisibleCards] = useState(6);

  // Effect hook to load filtered data when component mounts or search parameters change
  useEffect(() => {
    const loadFilteredData = async () => {
      setLoading(true);
      try {
        const filtered = await fetchFilteredData(
          name,
          specialty,
          locationParam,
          category
        );
        setFilteredData(filtered);
        setVisibleCards(6); // Reset visible cards to 6 when new data is fetched
      } catch {
        setError("Il y a eu un problème pour récupérer les données des travailleurs."); // Set error message if data fetching fails
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };
    loadFilteredData();
  }, [name, specialty, locationParam, category]);

  // Function to load more cards when the user clicks "Load more"
  const handleLoadMore = () => {
    setVisibleCards((prevVisible) => prevVisible + 6); // Show 6 more cards
  };

  // Function to handle closing the error message and reloading all data
  const handleCloseErrosMsg = async () => {
    try {
      const data = await getData(); // Fetch all data
      setFilteredData(data); // Set the data as the filtered data
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

  return (
    <section className="section-list-workers">
      {/* Breadcrumbs component to show navigation path */}
      <BreadCrumbs home="Accueil" listWorkers="artisans" />

      <header className="container-title">
        <h2 className="section-title">
          Artisans {category === undefined ? "" : ` - ${category}`} {/* Display category if available */}
        </h2>
        <p>Il y a {filteredData.length} dossier(s)</p> {/* Display number of worker records */}
      </header>

      <ul className="container-list-workers">
        {loading ? (
          <p className="loading" role="status" aria-live="polite">
            Chargement...
          </p> /* Show loading state while data is being fetched */
        ) : error ? (
          <p className="error-message" role="alert">
            {error}
          </p> /* Show error message if data fetching fails */
        ) : filteredData.length > 0 ? (
          filteredData.slice(0, visibleCards).map((worker) => (
            <li key={worker.id}>
              <CardWorker
                name={worker.name}
                note={worker.note}
                specialty={worker.specialty}
                location={worker.location}
                mail={worker.email}
              /> {/* Render worker cards */}
            </li>
          ))
        ) : (
          <p className="error-message" role="alert">
            <FaCircleExclamation className="exclamation-icon" />
            Aucun artisan ne correspond à vos critères.
            <span className="close-icon" onClick={handleCloseErrosMsg}>
              <AiFillCloseCircle />
            </span> {/* Show message if no workers match the search criteria and offer to reload all data */}
          </p>
        )}
      </ul>

      {visibleCards < filteredData.length && (
        <button
          onClick={handleLoadMore}
          className="load-more-button"
          aria-label="Charger plus d'artisans"
        >
          <FaArrowCircleDown aria-hidden="true" />
        </button> /* Button to load more worker cards if there are more than currently visible */
      )}
    </section>
  );
};

export default ListWorkers;


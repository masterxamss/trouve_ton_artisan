import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchFilteredData } from "../services/dataService";
import { FaArrowCircleDown} from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import { AiFillCloseCircle } from "react-icons/ai";
import { getData } from "../services/dataService";

import CardWorker from "../components/CardWorker";
import BreadCumbs from "../components/BreadCumbs";

const ListWorkers = () => {
  const location = useLocation();
  const {
    name,
    specialty,
    location: locationParam,
    category,
  } = location.state || {};

  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCards, setVisibleCards] = useState(6);

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
        setVisibleCards(6);
      } catch {
        setError("Il y a eu un problème pour récupérer les données des travailleurs.");
      } finally {
        setLoading(false);
      }
    };
    loadFilteredData();
  }, [name, specialty, locationParam, category]);

  // Function to load more cards when the user clicks "Load more"
  const handleLoadMore = () => {
    setVisibleCards((prevVisible) => prevVisible + 6);
  };

  const handleCloseErrosMsg = async () => {
    try {
      const data = await getData();
      setFilteredData(data);
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

  return (
    <section className="section-list-workers">
      <BreadCumbs home="Accueil" listWorkers="artisans" />

      <header className="container-title">
        <h2 className="section-title">
          Artisans {category === undefined ? "" : ` - ${category}`}
        </h2>
        <p>Il y a {filteredData.length} dossier(s)</p>
      </header>

      <ul className="container-list-workers">
        {loading ? (
          <p className="loading" role="status" aria-live="polite">
            Chargement...
          </p>
        ) : error ? (
          <p className="error-message" role="alert">
            {error}
          </p>
        ) : filteredData.length > 0 ? (
          filteredData.slice(0, visibleCards).map((worker) => (
            <li key={worker.id}>
              <CardWorker
                name={worker.name}
                note={worker.note}
                specialty={worker.specialty}
                location={worker.location}
                mail={worker.email}
              />
            </li>
          ))
        ) : (
          <p className="error-message" role="alert" >
            <FaCircleExclamation className="exclamation-icon"/>
            Aucun artisan ne correspond à vos critères.
            <span className="close-icon" onClick={handleCloseErrosMsg}><AiFillCloseCircle/></span>
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
        </button>
      )}
    </section>
  );
};

export default ListWorkers;

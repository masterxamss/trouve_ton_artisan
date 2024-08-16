import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchFilteredData } from "../services/dataService";
import { FaTriangleExclamation } from "react-icons/fa6";

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
      } catch {
        setError("There was an issue fetching the workers' data.");
      } finally {
        setLoading(false);
      }
    };
    loadFilteredData();
  }, [name, specialty, locationParam, category]);

  return (
    <section className="section-list-workers">
      <BreadCumbs home="Accueil" listWorkers="artisans" />
      <div className="container-title">
        <h2 className="section-title">
          Artisans {category === undefined ? "" : "- " + category}
        </h2>
        <p>Il y a {filteredData.length} dossier(s)</p>
      </div>
      <div className="container-list-workers">
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredData.length > 0 ? (
          <>
            {filteredData.map((worker) => (
              <CardWorker
                key={worker.id}
                name={worker.name}
                note={worker.note}
                specialty={worker.specialty}
                location={worker.location}
              />
            ))}
          </>
        ) : (
          <p className="error-message">
            <FaTriangleExclamation />
            Aucun artisan ne correspond à vos critères.
          </p>
        )}
      </div>
    </section>
  );
};

export default ListWorkers;

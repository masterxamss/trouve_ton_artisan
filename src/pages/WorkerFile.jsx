import { fetchFilteredData } from "../services/dataService";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaTriangleExclamation } from "react-icons/fa6";

import CardWorkerFile from "../components/CardWorkerFile";
import BreadCumbs from "../components/BreadCumbs";

const WorkerFile = () => {
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
    <section className="section-worker-file">
      <BreadCumbs home="Accueil" listWorkers="artisans" workerFile="fiche-artisan"/>
      {loading ? (
        <p>Chargement</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : filteredData.length > 0 ? (
        <>
          {filteredData.map((worker) => (
            <CardWorkerFile
              key={worker.id}
              name={worker.name}
              specialty={worker.specialty}
              note={worker.note}
              location={worker.location}
              email={worker.email}
              category={worker.category}
              website={worker.website}
            />
          ))}
        </>
      ) : (
        <p className="error-message">
          <FaTriangleExclamation />
          Le dossier de l'artisan n'a pas été trouvé
        </p>
      )}
    </section>
  );
};

export default WorkerFile;

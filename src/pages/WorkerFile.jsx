import { fetchFilteredData } from "../services/dataService";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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

  // load filtered data
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
      <BreadCumbs
        home="Accueil"
        listWorkers="artisans"
        workerFile="fiche-artisan"
      />
      <div className="worker-file-title">
        <h2 className="section-title">Artisan</h2>
      </div>
      {name !== undefined ? (
        loading ? (
          <p className="loading">Chargement</p>
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
                about={worker.about}
              />
            ))}
          </>
        ) : (
          <p className="error-message">
            Le dossier de l'artisan n'a pas été trouvé
          </p>
        )
      ) : (
        <p className="error-message">Veuillez sélectionner un artisan !</p>
      )}
    </section>
  );
};

export default WorkerFile;

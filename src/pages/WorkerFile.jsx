import { fetchFilteredData } from "../services/dataService";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import CardWorkerFile from "../components/CardWorkerFile";
import BreadCumbs from "../components/BreadCumbs";

const WorkerFile = () => {
  // Accessing location state passed from the previous page (e.g., search or selection)
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

  // useEffect to load the filtered worker data when the component mounts or any dependency changes
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

      {/* Conditional rendering based on whether name is provided */}
      {name !== undefined ? (
        loading ? (
          <p className="loading">Chargement</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : filteredData.length > 0 ? (
          // If data is successfully fetched and contains items, render the list of worker files
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
          // If no data was found for the specified criteria, show an error message
          <p className="error-message">
            Le dossier de l'artisan n'a pas été trouvé
          </p>
        )
      ) : (
        // If no artisan was selected, prompt the user to select one
        <p className="error-message">Veuillez sélectionner un artisan !</p>
      )}
    </section>
  );
};

export default WorkerFile;


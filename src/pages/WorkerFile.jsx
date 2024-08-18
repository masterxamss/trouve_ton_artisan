import React from "react";
import { fetchFilteredData } from "../services/dataService";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaCircleExclamation } from "react-icons/fa6";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

// Components
import CardWorkerFile from "../components/CardWorkerFile";
import BreadCrumbs from "../components/BreadCrumbs";
import ContactForm from "../components/ContactForm";

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
    window.scrollTo(0, 0);
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
      <BreadCrumbs
        home="Accueil"
        listWorkers="artisans"
        workerFile="fiche-artisan"
      />
      <header className="worker-file-title">
        <h2 className="section-title">Artisan</h2>
      </header>

      {/* Conditional rendering based on whether name is provided */}
      {name !== undefined ? (
        loading ? (
          <p className="loading" role="status" aria-live="polite">Chargement...</p>
        ) : error ? (
          <p className="error-message" role="alert">{error}</p>
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
            {/* Passing the email of the first worker in the list to ContactForm */}
            <ContactForm email={filteredData[0]?.email || ""}/>
          </>
        ) : (
          // If no data was found for the specified criteria, show an error message
          <p className="error-message" role="alert">
            <FaCircleExclamation className="exclamation-icon"/>
            Le dossier de l&apos;artisan n&apos;a pas été trouvé
          </p>
        )
      ) : (
        // If no artisan was selected, prompt the user to select one
        <p className="error-message" role="alert">
          <FaCircleExclamation className="exclamation-icon"/>
          Veuillez sélectionner un artisan
          <Link to="/list_workers">
            <span className="close-icon"><AiFillCloseCircle/></span>
          </Link>
          
        </p>
      )}
    </section>
  );
};

export default WorkerFile;



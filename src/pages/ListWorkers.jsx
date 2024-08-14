import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchFilteredData } from "../services/dataService";
import { FaTriangleExclamation } from "react-icons/fa6";

const ListWorkers = () => {
  const location = useLocation();
  const { name, specialty, location: locationParam } = location.state || {};

  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFilteredData = async () => {
      setLoading(true);
      try {
        const filtered = await fetchFilteredData(name, specialty, locationParam);
        setFilteredData(filtered);
      } catch {
        setError("There was an issue fetching the workers' data.");
      } finally {
        setLoading(false);
      }
    };
    loadFilteredData();
  }, [name, specialty, locationParam]);

  return (
    <div>
      <h1>List of Workers</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredData.length > 0 ? (
        <ul>
          {filteredData.map((worker) => (
            <li key={worker.id}>
              <p>Name: {worker.name}</p>
              <p>Specialty: {worker.specialty}</p>
              <p>Location: {worker.location}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="error-message">
          <FaTriangleExclamation /> 
          Aucun travailleur ne correspond à vos critères.
        </p>
      )}
    </div>
  );
};

export default ListWorkers;



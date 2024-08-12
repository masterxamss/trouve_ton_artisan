import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getData } from "../services/dataService";

const ListWorkers = () => {
  const location = useLocation();
  const { name, specialty, location: locationParam } = location.state || {};

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();

        // Filtering the data based on the parameters received
        const filtered = data.filter((item) => {
          return (
            (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
            (!specialty || item.specialty === specialty) &&
            (!locationParam || item.location === locationParam)
          );
        });

        setFilteredData(filtered);
      } catch (error) {
        console.error("Error fetching or filtering data:", error);
      }
    };

    fetchData();
  }, [name, specialty, locationParam]);

  return (
    <div>
      <h1>List of Workers</h1>
      {filteredData.length > 0 ? (
        <ul>
          {filteredData.map((worker, index) => (
            <li key={index}>
              <p>Name: {worker.name}</p>
              <p>Specialty: {worker.specialty}</p>
              <p>Location: {worker.location}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No workers found matching your criteria.</p>
      )}
    </div>
  );
};

export default ListWorkers;


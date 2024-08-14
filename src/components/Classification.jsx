import { useEffect, useState } from "react";
import { fetchTopData } from "../services/dataService";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";
const Classification = () => {
  const top = true;

  const [filteredTopData, setFilteredTopData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <section className="section-classification">
      <div className="classification-title">
        <h2 className="section-title">Artisan du mois</h2>
        <img src="/src/assets/images/icons/artisan-calssification.png" alt="artisan classification" />
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredTopData.length > 0 ? (
        <div className="row gap-3 mt-5">
          {filteredTopData.map((worker) => (
            <div className="col-sm" key={worker.id}>
              <div className="classification-img">
                <img
                  src="/src/assets/images/employee-of-the-month.png"
                  alt="employee of the month"
                />
              </div>

              <div className="classification-details">
                <ul>
                  <li>
                    <strong>Nom: </strong>
                    {worker.name}
                  </li>
                  {worker.note === "4.8" || worker.note === "4.9" ? (
                    <li className="stars">
                      <strong>Note: </strong>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                      <p className="note">{worker.note + "/5"}</p>
                    </li>
                  ) : (
                    <li className="stars">
                      <strong>Note: </strong>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <p className="note">{worker.note + "/5"}</p>
                    </li>
                  )}
                  <li>
                    <strong>Métier: </strong>
                    {worker.specialty}
                  </li>
                  <li>
                    <strong>Ville: </strong>
                    {worker.location}
                  </li>
                </ul>

                <button value={worker.id} className="classification-btn">
                  Voir artisan
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="error-message" tabIndex={0}>
          <FaTriangleExclamation /> 
          Aucun artisan avec une note supérieure à 4,8
        </p>
      )}
    </section>
  );
};

export default Classification;

import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import { printStars } from "../services/utilities";

const CardWorker = ({ name, note, specialty, location }) => {

  const navigate = useNavigate();
  const handleCategory = () => {
    navigate("/worker_file", {
      state: {
        name: name,
      },
    });
  };

  return (
    <div className="card-worker" tabIndex={0} onClick={handleCategory}>
      <img src="/src/assets/images/icons/cat-bg-1.webp" alt="icon workers" />
      <ul>
        <li>
          <strong>Nom :</strong> {name}
        </li>
        <li>
          <strong>Note :</strong> {printStars(note)} {note} / 5
        </li>
        <li>
          <strong>Métier :</strong> {specialty}
        </li>
        <li>
          <strong>Ville :</strong> {location}
        </li>
      </ul>
      <button className="cardWorker-btn" onClick={handleCategory}>Voir cet artisan</button>
    </div>
  );
};

CardWorker.propTypes = {
  name: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default CardWorker;

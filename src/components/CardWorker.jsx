import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { printStars } from "../services/utilities";

const CardWorker = ({ name, note, specialty, location }) => {

  return (
    <div className="card-worker" tabIndex={0}>
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
      <Link to="/worker_file">Voir cet artisan</Link>
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

import { printStars } from "../services/utilities";
import PropTypes from "prop-types";

const CardWorkerFile = (props) => {
  return (
    <div className="worker-infos">
      <img
        src="/src/assets/images/icons/worker-file.png"
        alt="fiche d'artisan"
      />
      <ul>
        <li>
          <strong>Nom :</strong> {props.name}
        </li>
        <li>
          <strong>Métier :</strong> {props.specialty}
        </li>
        <li>
          <strong>Note :</strong> {printStars(props.note)} {props.note} / 5
        </li>
        <li>
          <strong>Ville :</strong> {props.location}
        </li>
        <li>
          <strong>Email :</strong> {props.email}
        </li>
        <li>
          <strong>Catergorie :</strong> {props.category}
        </li>
        <li>
          <strong>Site :</strong> {props.website}
        </li>
      </ul>
    </div>
  );
};

CardWorkerFile.propTypes = {
  name: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
};

export default CardWorkerFile;

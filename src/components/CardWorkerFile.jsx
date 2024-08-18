import { printStars } from "../services/utilities";
import PropTypes from "prop-types";
import workerFileImg from "../assets/images/icons/worker-file.png";

const CardWorkerFile = (props) => {
  return (
    <>
      <div className="worker-infos">
        <img
          src={workerFileImg}
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
            <strong>Site :</strong>{" "}
            {props.website === "" ? "Non renseigne" : props.website}
          </li>
        </ul>
      </div>

      <div
        className="accordion rounded mb-5"
        id="accordionPanelsStayOpenExample"
      >
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              À propos
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="accordion-body">{props.about}</div>
          </div>
        </div>
      </div>
    </>
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
  about: PropTypes.string.isRequired,
};

export default CardWorkerFile;

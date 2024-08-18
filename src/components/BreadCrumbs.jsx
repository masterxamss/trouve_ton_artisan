
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaPrint, FaEnvelope } from "react-icons/fa6";

const BreadCrumbs = (props) => {
  function handlePrint() {
    window.print();
  }
  return (
    <div className="bread-cumbs">
      <div className="links">
        <Link to="/">{props.home}</Link>
        <span> / </span>
        <Link to="/list_workers">{props.listWorkers}</Link>
        <span> / </span>
        <Link to="/worker_file">{props.workerFile}</Link>
      </div>
      <div className="printer-email">
        <span className="bread-cumbs-icon" onClick={handlePrint}>
          <FaPrint className="icon" />
          <p>Imprimer</p>
        </span>

        <span className="bread-cumbs-icon" onClick={() => window.location.href = "mailto:?subject=" + document.title + "&body=" + encodeURI(document.location)}>
          <FaEnvelope className="icon" />
          <p>Envoyer par email</p>
        </span>
      </div>
    </div>
  );
};

export default BreadCrumbs;

BreadCrumbs.propTypes = {
  home: PropTypes.string,
  listWorkers: PropTypes.string,
  workerFile: PropTypes.string,
};

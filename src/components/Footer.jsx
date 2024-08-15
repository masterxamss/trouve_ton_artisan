import { FaPhoneAlt, FaLocationArrow, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      <div className="container m-0 text-light">
        <div className="row">
          <div className="col-sm-6 d-flex justify-content-center">
            <address className="p-5 fw-bold">
              <p>
                <FaLocationArrow className="me-2" />
                101 cours Charlemagne
              </p>
              <p>CS 20233</p>
              <p>69269 LYON CEDEX 02</p>
              <p>FRANCE</p>
              <p>
                <FaPhoneAlt className="me-2" />
                <abbr title="Telephone">Tel:</abbr> +33(0)4 26 73 40 00
              </p>
            </address>
          </div>

          <div className="col-sm-6 d-flex justify-content-center p-5">
            <div className="d-flex flex-column">
              <Link
                to="/legal_mentions"
                className="p-2 fw-bold text-decoration-none text-light text-start"
              >
                <FaChevronRight />
                Mentions légales
              </Link>
              <Link
                to="/personal_data"
                className="p-2 fw-bold text-decoration-none text-light"
              >
                <FaChevronRight />
                Donnés personnelles
              </Link>
              <Link
                to="/accessibility"
                className="p-2 fw-bold text-decoration-none text-light"
              >
                <FaChevronRight />
                Accessibilité
              </Link>
              <Link
                to="/cookies"
                className="p-2 fw-bold text-decoration-none text-light"
              >
                <FaChevronRight />
                Cookies
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 d-flex justify-content-center p-2 border-top">
            <p className="w-100 text-center m-0">
              Copyright 2024. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

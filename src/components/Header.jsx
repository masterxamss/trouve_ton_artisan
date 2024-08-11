import { NavLink, Link } from "react-router-dom";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import SearchBar from "./SearchBar";

const Header = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <section className="header-nav__container">
        <Link to="/">
          <img className="logo" src="/src/assets/images/Logo.png" alt="logo" />
        </Link>
        <div className="nav-container">
          <nav ref={navRef}>
            <ul>
              <li>
                <NavLink to="/batiment" onClick={showNavbar}>
                  Bâtiment
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" onClick={showNavbar}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/fabrication" onClick={showNavbar}>
                  Fabrication
                </NavLink>
              </li>
              <li>
                <NavLink to="/alimentation" onClick={showNavbar}>
                  Alimentation
                </NavLink>
              </li>
            </ul>
            <button className="nav-btn nav-close-btn" onClick={showNavbar}>
              <FaTimes />
            </button>
          </nav>
          <button className="nav-btn" onClick={showNavbar}>
            <FaBars />
          </button>
        </div>
      </section>
      <section className="header-searchBar__container">
        <SearchBar />
      </section>
    </header>
  );
};

export default Header;

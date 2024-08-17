import { Link } from "react-router-dom";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import SearchBar from "./SearchBar";
import MenuButton from "./MenuButton";

const Header = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <section className="header-nav__container">
        <Link to="/" className="logo-link">
          <img className="logo" src="/src/assets/images/Logo.png" alt="logo" />
        </Link>
        <div className="nav-container">
          <nav ref={navRef} aria-label="Main navigation">
            <ul>
              <li onClick={showNavbar}>
                <MenuButton category={"Bâtiment"}/>
              </li>
              <li onClick={showNavbar}>
                <MenuButton category={"Services"} />
              </li>
              <li onClick={showNavbar}>
                <MenuButton category={"Fabrication"} />
              </li>
              <li onClick={showNavbar}>
                <MenuButton category={"Alimentation"} />
              </li>
            </ul>
            {/* Close button for the responsive navbar */}
            <button className="nav-btn nav-close-btn" onClick={showNavbar} tabIndex={0}>
              <FaTimes />
            </button>
          </nav>
          
          {/* Button to open the navigation menu (only visible on small screens) */}
          <button className="nav-btn" onClick={showNavbar} name="menu">
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


import { Link } from "react-router-dom";
const UnderConstruction = () => {
  return (
    <div className="d-flex align-items-center flex-column">
        <img className="w-50" src="/src/assets/images/under-construction.webp" alt="sous-construction"/>
        <Link to="/" className="p-5 fw-bold">
            Accueil
        </Link>
    </div>
  )
}

export default UnderConstruction
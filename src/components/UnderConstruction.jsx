import { Link } from "react-router-dom";
import underConstructionImg from "../assets/images/under-construction.webp";
const UnderConstruction = () => {
  return (
    <div className="d-flex align-items-center flex-column">
        <img className="w-50" src={underConstructionImg} alt="sous-construction"/>
        <Link to="/" className="p-5 fw-bold"> 
            Accueil
        </Link>
    </div>
  )
}

export default UnderConstruction
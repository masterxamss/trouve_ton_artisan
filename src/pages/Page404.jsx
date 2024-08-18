import { Link } from "react-router-dom";
import Img404 from "../assets/images/404.webp";
const Page404 = () => {
  return (
    <div className="d-flex align-items-center flex-column">
      <img src={Img404} alt="image page non trouvée" className="w-25"/>
      <Link to="/" className="p-3 fw-bold">
            Accueil
      </Link>
    </div>
  )
}

export default Page404;




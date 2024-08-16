import { Link } from "react-router-dom";
const Page404 = () => {
  return (
    <div className="d-flex align-items-center flex-column">
      <img src="/src/assets/images/404.jpg" alt="image page non trouvée" className="w-25"/>
      <Link to="/" className="p-3 fw-bold">
            Accueil
      </Link>
    </div>
  )
}

export default Page404;




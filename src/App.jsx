import { Route, Routes} from "react-router-dom"

// COMPONENTS
import Header from "./components/Header"
import Footer from "./components/Footer"

//PAGES
import Home from "./pages/Home"
import Page404 from "./pages/Page404"
import Cookies from "./pages/Cookies"
import LegalMentions from "./pages/LegalMentions"
import Accessibility from "./pages/Accessibility"
import PersonalData from "./pages/PersonalData"
import FileWorker from "./pages/Batiment"
import Batiment from "./pages/Batiment"
import Services from "./pages/Services"
import Fabrication from "./pages/Fabrication"
import Alimentation from "./pages/Alimentation"
import ListWorkers from "./pages/ListWorkers"

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/legal_mentions" element={<LegalMentions />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/personal_data" element={<PersonalData />} />
        <Route path="/file_worker" element={<FileWorker />} />
        <Route path="/batiment" element={<Batiment />} />
        <Route path="/services" element={<Services />} />
        <Route path="/fabrication" element={<Fabrication />} />
        <Route path="/alimentation" element={<Alimentation />} />
        <Route path="/list_workers" element={<ListWorkers />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

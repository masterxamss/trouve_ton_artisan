import { Route, Routes} from "react-router-dom"

// COMPONENTS
import Header from "./components/Header"
import Footer from "./components/Footer"
// import HeroBanner from "./components/HeroBanner"
// import Classification from "./components/Classification"
// import SectionFindWorker from "./components/SectionFindWorker"

//PAGES
import Home from "./pages/Home"
import Page404 from "./pages/Page404"
import Cookies from "./pages/Cookies"
import LegalMentions from "./pages/LegalMentions"
import Accessibility from "./pages/Accessibility"
import PersonalData from "./pages/PersonalData"
import FileWorker from "./pages/FileWorker"
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
        <Route path="/list_workers" element={<ListWorkers />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

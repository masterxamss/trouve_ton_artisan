import { Routes, Route } from "react-router-dom";

// COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer";

// PAGES
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import Cookies from "./pages/Cookies";
import LegalMentions from "./pages/LegalMentions";
import Accessibility from "./pages/Accessibility";
import PersonalData from "./pages/PersonalData";
import ListWorkers from "./pages/ListWorkers";
import WorkerFile from "./pages/WorkerFile";

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/legal_mentions" element={<LegalMentions />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/personal_data" element={<PersonalData />} />
          <Route path="/list_workers" element={<ListWorkers />} />
          <Route path="/worker_file" element={<WorkerFile />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;

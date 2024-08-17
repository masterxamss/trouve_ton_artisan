import HeroBanner from "../components/HeroBanner";
import Classification from "../components/Classification";
import SectionFindWorker from "../components/SectionFindWorker";
import { useEffect } from "react";
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <HeroBanner />
      <SectionFindWorker />
      <Classification />
    </main>
  );
};

export default Home;

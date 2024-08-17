import HeroBannerButton from "./HeroBannerButton";

const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <div className="hero-container">
        <div className="fill">
          <h1>Demandes plus fréquentes</h1>
          <div className="links">
            <HeroBannerButton>Plombier</HeroBannerButton>
            <HeroBannerButton>Couturier</HeroBannerButton>
            <HeroBannerButton>Coiffeur</HeroBannerButton>
            <HeroBannerButton>Chocolatier</HeroBannerButton>
            <HeroBannerButton>Bijoutier</HeroBannerButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

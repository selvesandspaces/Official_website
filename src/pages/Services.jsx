import ServicesSection from "../sections/services/Services";
import FirstVisitPopup from "../components/FirstVisitPopup";
import FirstVisitSection from "../sections/firstvisit/FirstVisitSection";

const Services = () => {
  return (
    <main>
      <FirstVisitPopup />
      <ServicesSection />
      <FirstVisitSection />
    </main>
  );
};

export default Services;

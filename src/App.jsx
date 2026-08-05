import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeGallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import OurWork from "./pages/OurWork";
import Blog from "./pages/Blog";
import FirstVisit from "./pages/FirstVisit";
import Workshops from "./pages/Workshops";
import SchoolMentalHealth from "./pages/SchoolMentalHealth";
import Assessments from "./pages/Assessments";
import Partners from "./pages/Partners";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our team" element={<About />} />
        <Route path="/what we offer" element={<Services />} />
        <Route path="/gallery" element={<HomeGallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/our work" element={<OurWork />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/first-visit" element={<FirstVisit />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/school-mental-health" element={<SchoolMentalHealth />} />
        <Route path="/assessments" element={<Assessments />} />
        <Route path="/partners" element={<Partners />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileContactBar from "./components/MobileContactBar";
import RouteMeta from "./components/RouteMeta";
import AuthProvider from "./components/AuthProvider";
import Home from "./pages/Home";

const HomeGallery = lazy(() => import("./pages/Gallery"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Services = lazy(() => import("./pages/Services"));
const OurWork = lazy(() => import("./pages/OurWork"));
const Blog = lazy(() => import("./pages/Blog"));
const FirstVisit = lazy(() => import("./pages/FirstVisit"));
const Workshops = lazy(() => import("./pages/Workshops"));
const SchoolMentalHealth = lazy(() => import("./pages/SchoolMentalHealth"));
const Assessments = lazy(() => import("./pages/Assessments"));
const Partners = lazy(() => import("./pages/Partners"));
const Shop = lazy(() => import("./pages/Shop"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const Login = lazy(() => import("./pages/Login"));
const Privacy = lazy(() => import("./pages/Privacy"));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <MotionConfig reducedMotion="user">
        <RouteMeta />
        <Navbar />
        <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/our-team" element={<About />} />
            <Route path="/what-we-offer" element={<Services />} />
            <Route path="/gallery" element={<HomeGallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/first-visit" element={<FirstVisit />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/school-mental-health" element={<SchoolMentalHealth />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* Legacy URLs that contained spaces */}
            <Route path="/our team" element={<Navigate to="/our-team" replace />} />
            <Route path="/what we offer" element={<Navigate to="/what-we-offer" replace />} />
            <Route path="/our work" element={<Navigate to="/our-work" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <MobileContactBar />
      </MotionConfig>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

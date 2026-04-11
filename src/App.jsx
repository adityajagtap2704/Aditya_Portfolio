import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import TechnicalSkills from "./components/TechnicalSkills";
import OrbitalSkills from "./components/OrbitalSkills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <div className="font-sans antialiased text-slate-800">
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Experience />
      <TechnicalSkills />
      <OrbitalSkills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

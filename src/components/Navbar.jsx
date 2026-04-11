import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "../data/portfolio";

const navLinks = [
  { label: "About",          id: "about" },
  { label: "Education",      id: "education" },
  { label: "Experience",     id: "experience" },
  { label: "Skills",         id: "technical-skills" },
  { label: "Projects",       id: "projects" },
  { label: "Certifications", id: "certifications" },
  { label: "Contact",        id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => document.getElementById(l.id));
      sections.forEach((sec) => {
        if (sec) {
          const top = sec.getBoundingClientRect().top;
          if (top <= 100 && top >= -sec.offsetHeight + 100) setActive(sec.id);
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-gradient cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          AJ.
        </span>

        {/* Desktop */}
        <ul className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  active === link.id
                    ? "text-indigo-600"
                    : "text-slate-600 hover:text-indigo-500"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href={personalInfo.resumeLink}
          download="Aditya_Jagtap_Resume.pdf"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Resume
        </a>

        {/* Mobile hamburger */}
        <button className="md:hidden text-slate-700" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="text-2xl">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 pb-4"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left py-3 text-slate-700 hover:text-indigo-600 font-medium border-b border-slate-100 last:border-0"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

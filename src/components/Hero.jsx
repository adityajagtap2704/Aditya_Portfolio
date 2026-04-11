import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiDownload, FiArrowDown } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { personalInfo } from "../data/portfolio";
import heroImg from "../assets/hero.png";

/* Floating particle */
function Particle({ style }) {
  return (
    <motion.div
      className="absolute rounded-full bg-indigo-400/20 pointer-events-none"
      style={style}
      animate={{ y: [0, -30, 0], opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
      transition={{ duration: style.duration, repeat: Infinity, ease: "easeInOut", delay: style.delay }}
    />
  );
}

const particles = [
  { width: 12, height: 12, top: "15%", left: "8%", duration: 4, delay: 0 },
  { width: 8, height: 8, top: "70%", left: "5%", duration: 5, delay: 1 },
  { width: 16, height: 16, top: "30%", right: "10%", duration: 3.5, delay: 0.5 },
  { width: 10, height: 10, top: "80%", right: "15%", duration: 6, delay: 2 },
  { width: 6, height: 6, top: "50%", left: "20%", duration: 4.5, delay: 1.5 },
  { width: 14, height: 14, top: "20%", right: "25%", duration: 5.5, delay: 0.8 },
];

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const role = personalInfo.roles[roleIndex];
    let i = typing ? 0 : role.length;
    const interval = setInterval(() => {
      if (typing) {
        setDisplayed(role.slice(0, i + 1));
        i++;
        if (i > role.length) { clearInterval(interval); setTimeout(() => setTyping(false), 1800); }
      } else {
        setDisplayed(role.slice(0, i - 1));
        i--;
        if (i < 0) { clearInterval(interval); setRoleIndex((p) => (p + 1) % personalInfo.roles.length); setTyping(true); }
      }
    }, typing ? 70 : 40);
    return () => clearInterval(interval);
  }, [roleIndex, typing]);

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50 pt-20 relative overflow-hidden">
      {/* Particles */}
      {particles.map((p, i) => <Particle key={i} style={p} />)}

      {/* Large blurred orbs */}
      <div className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-indigo-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-cyan-200/40 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text side */}
        <div>
          <motion.span
            custom={0} variants={textVariants} initial="hidden" animate="visible"
            className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4"
          >
            👋 Hello, I'm
          </motion.span>

          <motion.h1
            custom={1} variants={textVariants} initial="hidden" animate="visible"
            className="text-5xl md:text-6xl font-extrabold text-slate-800 leading-tight mb-3"
          >
            Aditya <span className="text-gradient">Jagtap</span>
          </motion.h1>

          <motion.div
            custom={2} variants={textVariants} initial="hidden" animate="visible"
            className="h-10 mb-4"
          >
            <span className="text-2xl font-semibold text-indigo-600">
              {displayed}<span className="animate-pulse">|</span>
            </span>
          </motion.div>

          <motion.p
            custom={3} variants={textVariants} initial="hidden" animate="visible"
            className="text-slate-500 text-lg mb-8 max-w-md leading-relaxed"
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.div
            custom={4} variants={textVariants} initial="hidden" animate="visible"
            className="flex flex-wrap gap-4 mb-8"
          >
            <motion.a
              href={personalInfo.resumeLink}
              download="Aditya_Jagtap_Resume.pdf"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
            >
              <FiDownload /> Download Resume
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-all"
            >
              Hire Me
            </motion.button>
          </motion.div>

          <motion.div
            custom={5} variants={textVariants} initial="hidden" animate="visible"
            className="flex gap-4"
          >
            {[
              { href: personalInfo.github, icon: <FiGithub size={20} />, label: "GitHub" },
              { href: personalInfo.linkedin, icon: <FiLinkedin size={20} />, label: "LinkedIn" },
              { href: personalInfo.leetcode, icon: <SiLeetcode size={18} />, label: "LeetCode" },
            ].map(({ href, icon, label }) => (
              <motion.a
                key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}
                className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:shadow-indigo-200 transition-all"
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Photo side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <div className="relative">
            {/* Spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-300/60 scale-110"
            />
            {/* Second ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-cyan-300/40 scale-125"
            />

            <div className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 p-1 shadow-2xl shadow-indigo-200 relative z-10">
              <img
                src={heroImg}
                alt="Aditya Jagtap"
                className="w-full h-full rounded-full object-cover bg-white"
              />
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-xl px-3 py-2 text-sm font-bold text-indigo-700 z-20 border border-indigo-100"
            >
              🚀 MERN Stack
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl px-3 py-2 text-sm font-bold text-cyan-700 z-20 border border-cyan-100"
            >
              ☁️ AWS
            </motion.div>
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 -right-10 bg-white rounded-2xl shadow-xl px-3 py-2 text-sm font-bold text-purple-700 z-20 border border-purple-100"
            >
              ⚡ React
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-slate-400">scroll</span>
        <FiArrowDown size={20} />
      </motion.div>
    </section>
  );
}

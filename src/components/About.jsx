import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { about, personalInfo } from "../data/portfolio";
import { FiMapPin, FiMail, FiCode } from "react-icons/fi";

/* Animated counter */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const num = parseFloat(target);
    const isDecimal = target.toString().includes(".");
    const steps = 40;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) { setCount(num); clearInterval(timer); }
      else setCount(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current));
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { label: "Projects", value: 4, suffix: "+", color: "from-indigo-500 to-indigo-600" },
  { label: "Internships", value: 2, suffix: "", color: "from-cyan-500 to-cyan-600" },
  { label: "Certifications", value: 6, suffix: "+", color: "from-violet-500 to-violet-600" },
  { label: "CGPA", value: 8.14, suffix: "", color: "from-emerald-500 to-emerald-600" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-indigo-50 blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle label="About Me" />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-14 items-center mt-12"
        >
          {/* Left */}
          <motion.div variants={itemVariants}>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">{about}</p>
            <div className="space-y-3">
              {[
                { icon: <FiMapPin />, text: personalInfo.location },
                { icon: <FiMail />, text: personalInfo.email },
                { icon: <FiCode />, text: "B.Tech Computer Engineering | CGPA: 8.14" },
              ].map(({ icon, text }) => (
                <motion.div
                  key={text}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-slate-600 transition-transform"
                >
                  <span className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 flex-shrink-0">
                    {icon}
                  </span>
                  <span className="text-sm">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — animated stat cards */}
          <motion.div variants={containerVariants} className="grid grid-cols-2 gap-4">
            {stats.map(({ label, value, suffix, color }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                whileHover={{ scale: 1.06, rotate: 1 }}
                className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white text-center shadow-lg cursor-default`}
              >
                <div className="text-3xl font-extrabold">
                  <Counter target={value} suffix={suffix} />
                </div>
                <div className="text-sm opacity-90 mt-1 font-medium">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function SectionTitle({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-2"
    >
      <h2 className="text-4xl font-extrabold text-slate-800">{label}</h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-3 mx-auto h-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
      />
    </motion.div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { technicalSkills } from "../data/portfolio";
import { SectionTitle } from "./About";

const INITIAL_COUNT = 12;

export default function TechnicalSkills() {
  const [ref, inView] = useInView();
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? technicalSkills : technicalSkills.slice(0, INITIAL_COUNT);

  return (
    <section id="technical-skills" className="py-24 bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle label="Technical Skills" />
        <p className="text-center text-slate-500 mt-2 mb-12">
          A curated selection of my expertise in full-stack development and cloud
        </p>

        <motion.div
          ref={ref}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
        >
          <AnimatePresence>
            {visible.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ scale: 1.08, boxShadow: "0 8px 30px rgba(99,102,241,0.15)" }}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm cursor-default group transition-all"
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <span className="text-xs font-semibold text-slate-600 text-center leading-tight">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show All button */}
        <div className="flex flex-col items-center mt-10 gap-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
          >
            {showAll ? "Show Less" : `Show All (${technicalSkills.length})`}
          </motion.button>
          {!showAll && (
            <p className="text-slate-400 text-sm italic">
              ...and plenty more technologies I'm exploring & mastering every day.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

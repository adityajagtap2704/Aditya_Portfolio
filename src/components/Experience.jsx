import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { experience } from "../data/portfolio";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

export default function Experience() {
  const [ref, inView] = useInView(0.1);
  const [active, setActive] = useState(0);

  return (
    <section id="experience" className="py-28 relative overflow-hidden bg-white">
      {/* Subtle background accents */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-50 blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-50 blur-3xl opacity-70 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-indigo-500 text-xs font-bold tracking-[0.3em] uppercase mb-3">
            — Work History
          </p>
          <h2 className="text-5xl font-extrabold text-slate-800">
            Experience
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
          />
        </motion.div>

        <div className="grid md:grid-cols-[260px_1fr] gap-6">
          {/* Tab list */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex md:flex-col gap-3"
          >
            {experience.map((exp, i) => (
              <motion.button
                key={exp.company}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                }}
                onClick={() => setActive(i)}
                className={`relative text-left px-5 py-4 rounded-2xl border transition-all duration-300 ${
                  active === i
                    ? "bg-indigo-50 border-indigo-300 shadow-md shadow-indigo-100"
                    : "bg-slate-50 border-slate-200 hover:bg-indigo-50/50 hover:border-indigo-200"
                }`}
              >
                {active === i && (
                  <motion.div
                    layoutId="activeTabLight"
                    className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-cyan-400"
                  />
                )}
                <div className="relative z-10 pl-1">
                  <p className={`font-bold text-sm ${active === i ? "text-indigo-700" : "text-slate-600"}`}>
                    {exp.company}
                  </p>
                  <p className={`text-xs mt-0.5 ${active === i ? "text-indigo-400" : "text-slate-400"}`}>
                    {exp.duration}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Content panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 relative overflow-hidden bg-white border border-slate-100 shadow-xl shadow-slate-100"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-indigo-50 blur-3xl opacity-60 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-800 mb-1">
                      {experience[active].role}
                    </h3>
                    <p className="text-indigo-600 font-semibold text-lg">
                      {experience[active].company}
                    </p>
                  </div>
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold text-indigo-700 border border-indigo-200 bg-indigo-50">
                    {experience[active].duration}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {experience[active].points.map((pt, j) => (
                    <motion.li
                      key={pt}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.1 }}
                      className="flex gap-3 text-slate-600 text-sm leading-relaxed"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      {pt}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-5 border-t border-slate-100">
                  {experience[active].tech.map((t, j) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: j * 0.06 }}
                      className="px-3 py-1 rounded-lg text-xs font-semibold text-indigo-700 border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-default"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { education } from "../data/portfolio";
import { SectionTitle } from "./About";
import { FiCalendar, FiAward } from "react-icons/fi";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

export default function Education() {
  const [ref, inView] = useInView();

  return (
    <section id="education" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-indigo-50 blur-3xl opacity-70 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <SectionTitle label="Academic Journey" />
        <p className="text-center text-slate-500 mt-2 mb-12">
          My educational background and academic milestones
        </p>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 via-cyan-300 to-emerald-300 hidden md:block" />

          <div className="space-y-10">
            {education.map((edu, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={edu.level}
                  variants={{
                    hidden: { opacity: 0, x: isLeft ? -60 : 60 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className={`flex items-center gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Card */}
                  <div className={`w-full md:w-[45%] ${isLeft ? "md:pr-10" : "md:pl-10"}`}>
                    <motion.div
                      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(99,102,241,0.12)" }}
                      className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden group transition-all duration-300"
                    >
                      <div className={`h-1.5 bg-gradient-to-r ${edu.color}`} />
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r ${edu.color} mb-2`}>
                              {edu.level}
                            </span>
                            <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                              {edu.degree}
                            </h3>
                            <p className="text-slate-600 font-medium text-sm">{edu.institution}</p>
                          </div>
                          <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, delay: i * 0.5 }}
                            className="text-3xl"
                          >
                            {edu.icon}
                          </motion.span>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-3 text-sm text-slate-500">
                          <span className="flex items-center gap-1"><FiCalendar size={13} /> {edu.year}</span>
                          <span className="flex items-center gap-1 font-semibold text-indigo-600"><FiAward size={13} /> {edu.score}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{edu.board}</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-[10%] justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: i * 0.2 + 0.3, type: "spring", stiffness: 300 }}
                      className={`w-5 h-5 rounded-full bg-gradient-to-br ${edu.color} border-4 border-white shadow-lg z-10`}
                    />
                  </div>

                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { projects } from "../data/portfolio";
import { FiGithub, FiExternalLink, FiArrowUpRight, FiX } from "react-icons/fi";

/* Magnetic tilt card */
function MagneticCard({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {/* Spotlight glow that follows cursor */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(280px circle at ${gx}% ${gy}%, rgba(99,102,241,0.08), transparent 70%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const gradientMap = {
  "from-indigo-500 to-purple-600": "rgba(99,102,241,0.85), rgba(147,51,234,0.85)",
  "from-cyan-500 to-blue-600": "rgba(6,182,212,0.85), rgba(37,99,235,0.85)",
  "from-emerald-500 to-teal-600": "rgba(16,185,129,0.85), rgba(13,148,136,0.85)",
  "from-orange-500 to-red-500": "rgba(249,115,22,0.85), rgba(239,68,68,0.85)",
};

export default function Projects() {
  const [ref, inView] = useInView(0.05);
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="py-28 relative overflow-hidden bg-slate-50">
      {/* Subtle blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-100/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-cyan-100/60 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-indigo-500 text-xs font-bold tracking-[0.3em] uppercase mb-3">
            — What I've Built
          </p>
          <h2 className="text-5xl font-extrabold text-slate-800">
            Projects
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
          />
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={cardVariants}>
              <MagneticCard className="group relative h-full cursor-pointer">
                <div
                  className="relative h-full rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-2xl hover:shadow-indigo-100/60 transition-all duration-500 flex flex-col"
                  onClick={() => setSelected(project)}
                >
                  {/* Gradient banner */}
                  <div
                    className="relative h-36 flex items-center justify-center overflow-hidden flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${gradientMap[project.color]})` }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.15) 0,rgba(255,255,255,0.15) 1px,transparent 0,transparent 50%)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute w-32 h-32 rounded-full bg-white/15 blur-2xl"
                    />
                    <span className="text-6xl relative z-10 drop-shadow-2xl">{project.emoji}</span>

                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
                    >
                      <FiGithub size={15} />
                    </motion.a>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 relative z-10">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-xl font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <FiArrowUpRight
                        size={18}
                        className="text-slate-300 group-hover:text-indigo-500 transition-colors flex-shrink-0 mt-1"
                      />
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 border border-slate-200 bg-slate-50 hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 transition-colors cursor-default"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </MagneticCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
            >
              <div className="relative w-full max-w-lg rounded-3xl overflow-hidden pointer-events-auto bg-white shadow-2xl shadow-slate-300/50 border border-slate-100">
                {/* Banner */}
                <div
                  className="h-44 flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${gradientMap[selected.color]})` }}
                >
                  <span className="text-7xl drop-shadow-2xl">{selected.emoji}</span>
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                  >
                    <FiX size={14} />
                  </button>
                </div>

                <div className="p-7">
                  <h3 className="text-2xl font-extrabold text-slate-800 mb-2">{selected.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{selected.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selected.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-lg text-xs font-semibold text-indigo-700 border border-indigo-200 bg-indigo-50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors shadow-lg shadow-indigo-200"
                    >
                      <FiGithub size={15} /> View Code
                    </a>
                    {selected.live && (
                      <a
                        href={selected.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
                      >
                        <FiExternalLink size={15} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

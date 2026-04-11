import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { projects } from "../data/portfolio";
import { FiGithub, FiExternalLink, FiArrowRight, FiX, FiCode, FiLayers } from "react-icons/fi";

/* ── Accent colors per project ─────────────────────────── */
const accent = {
  "from-indigo-500 to-purple-600": {
    from: "#6366f1", to: "#9333ea",
    light: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.25)",
    tag: "bg-indigo-50 text-indigo-700 border-indigo-200",
    btn: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200",
    num: "text-indigo-200",
  },
  "from-cyan-500 to-blue-600": {
    from: "#06b6d4", to: "#2563eb",
    light: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.25)",
    tag: "bg-cyan-50 text-cyan-700 border-cyan-200",
    btn: "bg-cyan-600 hover:bg-cyan-700 shadow-cyan-200",
    num: "text-cyan-200",
  },
  "from-emerald-500 to-teal-600": {
    from: "#10b981", to: "#0d9488",
    light: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.25)",
    tag: "bg-emerald-50 text-emerald-700 border-emerald-200",
    btn: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200",
    num: "text-emerald-200",
  },
  "from-orange-500 to-red-500": {
    from: "#f97316", to: "#ef4444",
    light: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.25)",
    tag: "bg-orange-50 text-orange-700 border-orange-200",
    btn: "bg-orange-600 hover:bg-orange-700 shadow-orange-200",
    num: "text-orange-200",
  },
};

/* ── Cursor-following spotlight ────────────────────────── */
function SpotlightCard({ children, accentColor, className }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bg = useTransform([mx, my], ([x, y]) =>
    `radial-gradient(380px circle at ${x}% ${y}%, ${accentColor}, transparent 65%)`
  );
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} className={className}>
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: bg }}
      />
      {children}
    </motion.div>
  );
}

/* ── Featured (first) card — full width ────────────────── */
function FeaturedCard({ project, index, onClick }) {
  const a = accent[project.color];
  const [ref, inView] = useInView(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <SpotlightCard
        accentColor={a.light}
        className="group relative rounded-3xl overflow-hidden border bg-white cursor-pointer"
        style={{ borderColor: a.border, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
      >
        <div
          className="relative flex flex-col lg:flex-row"
          onClick={() => onClick(project)}
        >
          {/* Left — gradient visual panel */}
          <div
            className="relative lg:w-2/5 h-56 lg:h-auto flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}
          >
            {/* Animated grid */}
            <motion.div
              animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.12) 0,rgba(255,255,255,0.12) 1px,transparent 0,transparent 50%)",
                backgroundSize: "24px 24px",
              }}
            />
            {/* Pulsing orb */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-48 h-48 rounded-full bg-white/10 blur-3xl"
            />
            {/* Big number */}
            <span
              className="absolute bottom-4 right-6 text-8xl font-black leading-none select-none"
              style={{ color: a.num, opacity: 0.35 }}
            >
              0{index + 1}
            </span>
            <span className="text-7xl relative z-10 drop-shadow-2xl">{project.emoji}</span>
          </div>

          {/* Right — content */}
          <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between relative z-10">
            <div>
              {/* Label */}
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-slate-400">
                  <FiLayers size={11} /> Featured Project
                </span>
              </div>

              <h3 className="text-3xl font-extrabold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-slate-500 leading-relaxed mb-6 max-w-lg">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${a.tag}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all shadow-lg ${a.btn}`}
              >
                <FiGithub size={15} /> View Code
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
                >
                  <FiExternalLink size={15} /> Live Demo
                </a>
              )}
              <button
                onClick={() => onClick(project)}
                className="ml-auto flex items-center gap-1 text-sm font-semibold text-slate-400 hover:text-indigo-600 transition-colors"
              >
                Details <FiArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

/* ── Regular card ───────────────────────────────────────── */
function ProjectCard({ project, index, delay, onClick }) {
  const a = accent[project.color];
  const [ref, inView] = useInView(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <SpotlightCard
        accentColor={a.light}
        className="group relative h-full rounded-3xl overflow-hidden border bg-white cursor-pointer flex flex-col"
        style={{ borderColor: a.border, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
        onClick={() => onClick(project)}
      >
        {/* Top color bar */}
        <div
          className="h-1.5 w-full flex-shrink-0"
          style={{ background: `linear-gradient(90deg, ${a.from}, ${a.to})` }}
        />

        {/* Visual strip */}
        <div
          className="relative h-32 flex items-center justify-center overflow-hidden flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${a.from}18, ${a.to}18)` }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg,currentColor 0,currentColor 1px,transparent 0,transparent 50%)",
              backgroundSize: "20px 20px",
              color: a.from,
            }}
          />
          <span className="text-5xl relative z-10">{project.emoji}</span>
          <span
            className="absolute bottom-2 right-4 text-6xl font-black leading-none select-none opacity-20"
            style={{ color: a.from }}
          >
            0{index + 1}
          </span>

          {/* GitHub icon top-right */}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.15, rotate: 8 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 flex items-center justify-center text-slate-600 hover:text-indigo-600 shadow-sm transition-colors"
          >
            <FiGithub size={14} />
          </motion.a>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1 relative z-10">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors duration-300 leading-snug">
              {project.title}
            </h3>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FiArrowRight size={16} className="text-slate-300 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-0.5" />
            </motion.div>
          </div>

          <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
            {project.description}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${a.tag}`}
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border border-slate-200 bg-slate-50 text-slate-500">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

/* ── Detail Modal ───────────────────────────────────────── */
function Modal({ project, onClose }) {
  const a = accent[project.color];
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 40 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="relative w-full max-w-lg rounded-3xl overflow-hidden pointer-events-auto bg-white shadow-2xl border border-slate-100">
          {/* Banner */}
          <div
            className="relative h-48 flex items-center justify-center overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}
          >
            <motion.div
              animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.15) 0,rgba(255,255,255,0.15) 1px,transparent 0,transparent 50%)",
                backgroundSize: "24px 24px",
              }}
            />
            <span className="text-7xl drop-shadow-2xl relative z-10">{project.emoji}</span>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
            >
              <FiX size={16} />
            </button>
          </div>

          <div className="p-7">
            {/* Title */}
            <div className="flex items-center gap-3 mb-1">
              <FiCode size={16} className="text-indigo-500" />
              <h3 className="text-2xl font-extrabold text-slate-800">{project.title}</h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-5 mt-2">{project.description}</p>

            {/* Tech */}
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className={`px-3 py-1 rounded-full text-xs font-semibold border ${a.tag}`}>
                  {t}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100 mb-5" />

            {/* Actions */}
            <div className="flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all shadow-lg ${a.btn}`}
              >
                <FiGithub size={15} /> View Code
              </a>
              {project.live && (
                <a
                  href={project.live}
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
  );
}

/* ── Main Section ───────────────────────────────────────── */
export default function Projects() {
  const [selected, setSelected] = useState(null);
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id="projects" className="py-28 relative overflow-hidden bg-white">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-50 blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-cyan-50 blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <p className="text-indigo-500 text-xs font-bold tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-indigo-400 inline-block" />
              Selected Work
            </p>
            <h2 className="text-5xl font-extrabold text-slate-800 leading-tight">
              Projects
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
            />
          </div>
          <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
            A collection of things I've built — from full-stack platforms to cloud infrastructure.
          </p>
        </motion.div>

        {/* ── Featured card ── */}
        <div className="mb-6">
          <FeaturedCard project={featured} index={0} onClick={setSelected} />
        </div>

        {/* ── Rest — 3-col grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i + 1}
              delay={i * 0.1}
              onClick={setSelected}
            />
          ))}
        </div>

        {/* ── GitHub CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/adityajagtap2704"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:border-indigo-400 hover:text-indigo-600 transition-all group"
          >
            <FiGithub size={16} />
            See all projects on GitHub
            <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

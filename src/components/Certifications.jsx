import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { certifications } from "../data/portfolio";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Certifications() {
  const [ref, inView] = useInView();

  return (
    <section id="certifications" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-10 left-10 w-96 h-96 rounded-full bg-indigo-500 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{ repeat: Infinity, duration: 8, delay: 2 }}
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyan-500 blur-3xl pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-2">
            — Credentials
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Certifications &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Awards
            </span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-3 h-1 rounded-full bg-indigo-500"
          />
        </motion.div>

        {/* 2-column grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 gap-5"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.name}
              variants={cardVariants}
              whileHover={{ scale: 1.03, borderColor: "rgba(99,102,241,0.6)", backgroundColor: "rgba(255,255,255,0.08)" }}
              className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 cursor-default group"
            >
              {/* Icon badge */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
                className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-2xl shadow-lg`}
              >
                {cert.icon}
              </motion.div>

              {/* Content */}
              <div className="min-w-0">
                <h3 className="text-white font-bold text-sm leading-snug mb-0.5 group-hover:text-indigo-300 transition-colors">
                  {cert.name}
                </h3>
                <p className="text-indigo-300 text-xs font-medium mb-1">{cert.issuer}</p>
                <p className="text-slate-400 text-xs">{cert.date} · {cert.score}</p>
                <p className="text-slate-500 text-xs mt-1 truncate">{cert.detail}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

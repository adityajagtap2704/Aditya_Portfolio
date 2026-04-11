import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/* ─── Skill data ─────────────────────────────────────────── */
const orbitSkills = [
  // Orbit 0 — innermost
  { name: "React.js",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",                                    orbit: 0, speed: 22 },
  { name: "Node.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",                                   orbit: 0, speed: 22 },
  { name: "MongoDB",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",                                 orbit: 0, speed: 22 },
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",                                 orbit: 0, speed: 22 },
  // Orbit 1 — middle
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",                           orbit: 1, speed: 32 },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",                           orbit: 1, speed: 32 },
  { name: "Docker",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",                                   orbit: 1, speed: 32 },
  { name: "AWS",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",        orbit: 1, speed: 32 },
  { name: "Git",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",                                         orbit: 1, speed: 32 },
  { name: "MySQL",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",                                     orbit: 1, speed: 32 },
  // Orbit 2 — outermost
  { name: "Next.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",                                   orbit: 2, speed: 44 },
  { name: "Jenkins",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",                                 orbit: 2, speed: 44 },
  { name: "Socket.IO",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",                               orbit: 2, speed: 44 },
  { name: "Ansible",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg",                                 orbit: 2, speed: 44 },
  { name: "SonarQube",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg",                             orbit: 2, speed: 44 },
  { name: "C++",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",                             orbit: 2, speed: 44 },
  { name: "Redux",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",                                     orbit: 2, speed: 44 },
];

// Desktop radii — large and well-spaced
const ORBIT_RADII_DESKTOP = [210, 330, 460];
const ORBIT_RADII_TABLET  = [155, 245, 345];
const ORBIT_RADII_MOBILE  = [115, 185];

const ORBIT_COLORS = [
  "rgba(99,102,241,0.5)",
  "rgba(6,182,212,0.45)",
  "rgba(168,85,247,0.4)",
];

/* ─── Stars ──────────────────────────────────────────────── */
function Stars({ count = 140 }) {
  const stars = useRef(
    Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 1.8 + 0.4,
      op: Math.random() * 0.55 + 0.15,
      dur: Math.random() * 4 + 2,
      delay: Math.random() * 4,
    }))
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.current.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r * 2, height: s.r * 2, opacity: s.op }}
          animate={{ opacity: [s.op, s.op * 0.15, s.op] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        />
      ))}
    </div>
  );
}

/* ─── Tooltip ────────────────────────────────────────────── */
function Tooltip({ skill, x, y }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.15 }}
      className="fixed z-[999] pointer-events-none"
      style={{ left: x + 18, top: y - 44 }}
    >
      <div className="flex items-center gap-2 bg-slate-900/95 border border-indigo-400/50 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-2xl shadow-indigo-900/60 whitespace-nowrap backdrop-blur-md">
        <img src={skill.icon} alt="" className="w-5 h-5 object-contain" onError={(e) => { e.target.style.display = "none"; }} />
        {skill.name}
      </div>
    </motion.div>
  );
}

/* ─── Sphere ─────────────────────────────────────────────── */
function Sphere({ tiltX, tiltY, size }) {
  return (
    <motion.div
      style={{ rotateX: tiltX, rotateY: tiltY, width: size, height: size }}
      className="relative rounded-full flex-shrink-0"
    >
      {/* Solid opaque base — this is what occludes icons behind it */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 32% 30%, #a5b4fc, #4338ca 38%, #1e1b4b 65%, #020617 100%)",
          boxShadow: `0 0 ${size * 0.25}px rgba(99,102,241,0.7), 0 0 ${size * 0.5}px rgba(99,102,241,0.3), inset 0 0 ${size * 0.15}px rgba(0,0,0,0.7)`,
        }}
      />

      {/* Rotating atmosphere shimmer */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{ opacity: 0.35 }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent 40%, rgba(139,92,246,0.7) 55%, rgba(6,182,212,0.5) 65%, transparent 80%)",
          }}
        />
      </motion.div>

      {/* Counter-rotating shimmer */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{ opacity: 0.18 }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: "conic-gradient(from 180deg, transparent 45%, rgba(6,182,212,0.5) 58%, transparent 72%)" }}
        />
      </motion.div>

      {/* Latitude grid lines */}
      {[20, 40, 60, 80].map((pct) => (
        <div key={pct} className="absolute left-0 right-0 border-t border-white/[0.07]" style={{ top: `${pct}%` }} />
      ))}
      {/* Longitude grid lines */}
      {[20, 40, 60, 80].map((pct) => (
        <div key={pct} className="absolute top-0 bottom-0 border-l border-white/[0.07]" style={{ left: `${pct}%` }} />
      ))}

      {/* Specular highlight */}
      <div
        className="absolute rounded-full bg-white/25 blur-lg"
        style={{ width: size * 0.3, height: size * 0.18, top: size * 0.08, left: size * 0.14 }}
      />

      {/* Pulse rings */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full border-2 border-indigo-400/40"
        style={{ inset: -size * 0.07 }}
      />
      <motion.div
        animate={{ scale: [1, 1.28, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute rounded-full border border-cyan-400/25"
        style={{ inset: -size * 0.14 }}
      />
    </motion.div>
  );
}

/* ─── Single orbiting icon ───────────────────────────────── */
function OrbitIcon({ skill, radius, angleOffset, paused, iconSize, onHover, onLeave, onClick }) {
  const angleRef = useRef(angleOffset);
  const [pos, setPos] = useState({ x: 0, y: 0, depth: 0 });
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const pausedRef = useRef(paused);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const tick = (ts) => {
      if (!lastTimeRef.current) lastTimeRef.current = ts;
      const dt = Math.min((ts - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = ts;
      if (!pausedRef.current) angleRef.current += (360 / skill.speed) * dt;
      const rad = (angleRef.current * Math.PI) / 180;
      // Y-factor 0.55 gives a nice tilted-orbit look without being too flat
      setPos({
        x: Math.cos(rad) * radius,
        y: Math.sin(rad) * radius * 0.55,
        depth: Math.sin(rad),
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [radius, skill.speed]);

  const scale = 0.7 + 0.3 * ((pos.depth + 1) / 2);
  const opacity = 0.5 + 0.5 * ((pos.depth + 1) / 2);
  // KEY: behind sphere (depth < 0) → zIndex 5 (below sphere z-20), front → zIndex 30
  const zIndex = pos.depth >= 0 ? 30 : 5;
  const half = iconSize / 2;

  return (
    <div
      className="absolute cursor-pointer"
      style={{
        left: "50%",
        top: "50%",
        transform: `translate(${pos.x - half}px, ${pos.y - half}px) scale(${scale})`,
        opacity,
        zIndex,
        transition: "opacity 0.05s",
      }}
      onMouseEnter={(e) => onHover(skill, e)}
      onMouseLeave={onLeave}
      onClick={() => onClick(skill)}
    >
      <motion.div
        whileHover={{ scale: 1.45 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="rounded-2xl flex flex-col items-center justify-center gap-1 group"
        style={{
          width: iconSize,
          height: iconSize,
          background: "rgba(15,23,42,0.85)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
        }}
      >
        <img
          src={skill.icon}
          alt={skill.name}
          style={{ width: iconSize * 0.52, height: iconSize * 0.52 }}
          className="object-contain group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.9)] transition-all"
          onError={(e) => {
            e.target.replaceWith(Object.assign(document.createElement("span"), {
              className: "text-white font-bold text-sm",
              textContent: skill.name.slice(0, 2),
            }));
          }}
        />
        <span
          className="text-white/70 font-medium leading-none text-center px-1 truncate w-full text-center"
          style={{ fontSize: iconSize * 0.13 }}
        >
          {skill.name}
        </span>
      </motion.div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function OrbitalSkills() {
  const containerRef = useRef(null);
  const tiltX = useSpring(useMotionValue(0), { stiffness: 50, damping: 18 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 50, damping: 18 });

  const [tooltip, setTooltip] = useState(null);
  const [pausedOrbit, setPausedOrbit] = useState(null);
  const [selected, setSelected] = useState(null);
  const [dims, setDims] = useState({ radii: ORBIT_RADII_DESKTOP, arena: 900, sphere: 180, icon: 72 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setDims({ radii: ORBIT_RADII_MOBILE, arena: 420, sphere: 160, icon: 60 });
      } else if (w < 768) {
        setDims({ radii: ORBIT_RADII_TABLET, arena: 720, sphere: 240, icon: 68 });
      } else {
        setDims({ radii: ORBIT_RADII_DESKTOP, arena: 980, sphere: 380, icon: 76 });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    tiltX.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * -14);
    tiltY.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 14);
  }, [tiltX, tiltY]);

  const handleMouseLeave = useCallback(() => { tiltX.set(0); tiltY.set(0); }, [tiltX, tiltY]);

  const onHover = useCallback((skill, e) => {
    setTooltip({ skill, x: e.clientX, y: e.clientY });
    setPausedOrbit(skill.orbit);
  }, []);

  const onLeave = useCallback(() => { setTooltip(null); setPausedOrbit(null); }, []);
  const onClick = useCallback((skill) => setSelected((p) => p?.name === skill.name ? null : skill), []);

  const visibleSkills = dims.radii.length < 3 ? orbitSkills.filter((s) => s.orbit < 2) : orbitSkills;
  const skillsByOrbit = dims.radii.map((_, oi) => visibleSkills.filter((s) => s.orbit === oi));

  return (
    <section
      id="orbital-skills"
      className="relative bg-[#030712] overflow-hidden"
      style={{ paddingTop: 80, paddingBottom: 80 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Stars count={150} />

      {/* Nebula blobs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-950/60 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-950/50 blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-950/30 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-indigo-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">
            — Tech Universe
          </p>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Skills{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-purple-400">
              Orbit
            </span>
          </h2>
          <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
            Hover to pause an orbit · Click a skill to inspect · Watch the universe spin
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-5 mx-auto h-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500"
          />
        </motion.div>

        {/* Arena */}
        <div
          ref={containerRef}
          className="relative mx-auto flex items-center justify-center"
          style={{ width: dims.arena, height: dims.arena * 0.78, maxWidth: "100%" }}
        >
          {/* Glowing orbit rings */}
          {dims.radii.map((r, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: r * 2,
                height: r * 2 * 0.55,
                border: `1.5px solid ${ORBIT_COLORS[i]}`,
                boxShadow: `0 0 18px ${ORBIT_COLORS[i]}, inset 0 0 18px ${ORBIT_COLORS[i]}`,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5 + i * 0.8, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* Sphere — z-20 so icons with zIndex:5 go behind it */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <Sphere tiltX={tiltX} tiltY={tiltY} size={dims.sphere} />
          </div>

          {/* Orbiting icons */}
          {skillsByOrbit.map((group, oi) =>
            group.map((skill, si) => (
              <OrbitIcon
                key={skill.name}
                skill={skill}
                radius={dims.radii[oi]}
                angleOffset={(360 / group.length) * si}
                paused={pausedOrbit === skill.orbit}
                iconSize={dims.icon}
                onHover={onHover}
                onLeave={onLeave}
                onClick={onClick}
              />
            ))
          )}
        </div>

        {/* Selected skill card */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 mx-auto max-w-xs text-center rounded-3xl p-6 backdrop-blur-xl"
              style={{
                background: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(99,102,241,0.35)",
                boxShadow: "0 0 40px rgba(99,102,241,0.2), 0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <img src={selected.icon} alt={selected.name} className="w-16 h-16 mx-auto mb-3 object-contain drop-shadow-[0_0_12px_rgba(99,102,241,0.8)]" onError={(e) => { e.target.style.display = "none"; }} />
              <h3 className="text-white font-extrabold text-xl mb-1">{selected.name}</h3>
              <p className="text-slate-400 text-xs mb-4">Orbit {selected.orbit + 1} · Active in production projects</p>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${78 + selected.orbit * 4}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500"
                />
              </div>
              <p className="text-indigo-400 text-xs font-semibold">{78 + selected.orbit * 4}% proficiency</p>
              <button onClick={() => setSelected(null)} className="mt-4 text-slate-500 hover:text-slate-300 text-xs transition-colors">✕ close</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {["Core Stack", "Languages & Tools", "DevOps & Cloud"].slice(0, dims.radii.length).map((label, i) => (
            <div key={label} className="flex items-center gap-2 text-xs text-slate-400">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: ORBIT_COLORS[i], boxShadow: `0 0 8px ${ORBIT_COLORS[i]}` }}
              />
              {label}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {tooltip && <Tooltip skill={tooltip.skill} x={tooltip.x} y={tooltip.y} />}
      </AnimatePresence>
    </section>
  );
}

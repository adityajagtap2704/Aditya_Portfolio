import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

/* ─── Skills Data ────────────────────────────────────────── */
const skillsData = [
  // Inner orbit
  { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", orbit: 0, speed: 0.5, color: "#61DAFB" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", orbit: 0, speed: 0.5, color: "#339933" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", orbit: 0, speed: 0.5, color: "#47A248" },
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", orbit: 0, speed: 0.5, color: "#FFFFFF" },
  
  // Middle orbit
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", orbit: 1, speed: 0.35, color: "#F7DF1E" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", orbit: 1, speed: 0.35, color: "#3178C6" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", orbit: 1, speed: 0.35, color: "#2496ED" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", orbit: 1, speed: 0.35, color: "#FF9900" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", orbit: 1, speed: 0.35, color: "#F05032" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", orbit: 1, speed: 0.35, color: "#4479A1" },
  
  // Outer orbit
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", orbit: 2, speed: 0.25, color: "#FFFFFF" },
  { name: "Jenkins", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg", orbit: 2, speed: 0.25, color: "#D24939" },
  { name: "Socket.IO", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg", orbit: 2, speed: 0.25, color: "#010101" },
  { name: "Ansible", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg", orbit: 2, speed: 0.25, color: "#EE0000" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", orbit: 2, speed: 0.25, color: "#00599C" },
];

const ORBIT_RADII = [4.5, 7, 9.5];
const ORBIT_TILT = [0.15, -0.2, 0.1]; // Radians

/* ─── Starfield Background ───────────────────────────────── */
function Starfield() {
  const starsRef = useRef();
  const count = 2000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 50 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#ffffff" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

/* ─── Central Sphere (Earth-like) ────────────────────────── */
function CentralSphere() {
  const sphereRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.002;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y -= 0.001;
    }
  });

  return (
    <group>
      {/* Main sphere */}
      <mesh ref={sphereRef} castShadow receiveShadow>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          color="#1e3a8a"
          metalness={0.4}
          roughness={0.3}
          emissive="#3b82f6"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Grid overlay */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.52, 32, 32]} />
        <meshBasicMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Pulsing atmosphere */}
      <mesh>
        <sphereGeometry args={[2.65, 32, 32]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/* ─── Orbit Ring ─────────────────────────────────────────── */
function OrbitRing({ radius, tilt, color }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial ref={ringRef} color={color} transparent opacity={0.2} />
    </mesh>
  );
}

/* ─── Single Skill Icon (Orbiting) ───────────────────────── */
function SkillIcon({ skill, index, totalInOrbit, onHover, onLeave, onClick, paused }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  const radius = ORBIT_RADII[skill.orbit];
  const tilt = ORBIT_TILT[skill.orbit];
  const angleOffset = (index / totalInOrbit) * Math.PI * 2;

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = paused ? state.clock.elapsedTime - (state.clock.elapsedTime - meshRef.current.userData.pauseTime || 0) : state.clock.elapsedTime;
    const angle = angleOffset + time * skill.speed;
    
    // Calculate 3D position on tilted orbit
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * Math.sin(tilt);
    const z = Math.sin(angle) * radius * Math.cos(tilt);
    
    meshRef.current.position.set(x, y, z);
    
    // Billboard effect - always face camera
    meshRef.current.lookAt(state.camera.position);
    
    // Scale based on hover
    const targetScale = hovered ? 1.5 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    
    if (paused && !meshRef.current.userData.pauseTime) {
      meshRef.current.userData.pauseTime = state.clock.elapsedTime;
    } else if (!paused) {
      meshRef.current.userData.pauseTime = null;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(skill);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        onLeave();
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(skill);
      }}
    >
      <planeGeometry args={[0.8, 0.8]} />
      <meshBasicMaterial transparent opacity={0.95}>
        <primitive attach="map" object={new THREE.TextureLoader().load(skill.icon)} />
      </meshBasicMaterial>
      
      {/* Glow effect when hovered */}
      {hovered && (
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[1.2, 1.2]} />
          <meshBasicMaterial color={skill.color} transparent opacity={0.3} />
        </mesh>
      )}
      
      {/* Label */}
      <Html distanceFactor={10} position={[0, -0.6, 0]} center>
        <div
          className="px-2 py-1 rounded-lg text-white text-xs font-semibold whitespace-nowrap pointer-events-none"
          style={{
            background: hovered ? "rgba(99,102,241,0.9)" : "rgba(15,23,42,0.8)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: hovered ? "0 0 20px rgba(99,102,241,0.6)" : "0 4px 12px rgba(0,0,0,0.5)",
            transition: "all 0.2s",
          }}
        >
          {skill.name}
        </div>
      </Html>
    </mesh>
  );
}

/* ─── All Orbiting Skills ────────────────────────────────── */
function OrbitingSkills({ onHover, onLeave, onClick, pausedOrbit }) {
  const skillsByOrbit = useMemo(() => {
    return ORBIT_RADII.map((_, orbitIndex) =>
      skillsData.filter((s) => s.orbit === orbitIndex)
    );
  }, []);

  return (
    <group>
      {/* Orbit rings */}
      {ORBIT_RADII.map((radius, i) => (
        <OrbitRing
          key={i}
          radius={radius}
          tilt={ORBIT_TILT[i]}
          color={["#6366f1", "#06b6d4", "#a855f7"][i]}
        />
      ))}

      {/* Skills */}
      {skillsByOrbit.map((orbitSkills, orbitIndex) =>
        orbitSkills.map((skill, skillIndex) => (
          <SkillIcon
            key={skill.name}
            skill={skill}
            index={skillIndex}
            totalInOrbit={orbitSkills.length}
            onHover={onHover}
            onLeave={onLeave}
            onClick={onClick}
            paused={pausedOrbit === skill.orbit}
          />
        ))
      )}
    </group>
  );
}

/* ─── Camera Controller (Mouse Parallax) ─────────────────── */
function CameraController() {
  const { camera } = useThree();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.1;
    camera.position.x = Math.sin(t) * 0.5;
    camera.position.y = Math.cos(t * 0.7) * 0.3;
  });

  return null;
}

/* ─── 3D Scene ───────────────────────────────────────────── */
function Scene({ onHover, onLeave, onClick, pausedOrbit }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={0.8} castShadow />

      {/* Scene elements */}
      <Starfield />
      <CentralSphere />
      <OrbitingSkills onHover={onHover} onLeave={onLeave} onClick={onClick} pausedOrbit={pausedOrbit} />
      <CameraController />
    </>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function OrbitalSkills3D() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [pausedOrbit, setPausedOrbit] = useState(null);

  const handleHover = (skill) => {
    setHoveredSkill(skill);
    setPausedOrbit(skill.orbit);
  };

  const handleLeave = () => {
    setHoveredSkill(null);
    setPausedOrbit(null);
  };

  const handleClick = (skill) => {
    setSelectedSkill((prev) => (prev?.name === skill.name ? null : skill));
  };

  return (
    <section id="orbital-skills-3d" className="relative bg-[#020617] overflow-hidden" style={{ height: "100vh", minHeight: 700 }}>
      {/* Header */}
      <div className="absolute top-8 left-0 right-0 z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-indigo-400 text-xs font-bold tracking-[0.3em] uppercase mb-2">
            — 3D Tech Universe
          </p>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-2">
            Skills{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-purple-400">
              Orbit
            </span>
          </h2>
          <p className="text-slate-400 text-sm">
            Hover to pause · Click to explore · Rotate to view all angles
          </p>
        </motion.div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 3, 18], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene
            onHover={handleHover}
            onLeave={handleLeave}
            onClick={handleClick}
            pausedOrbit={pausedOrbit}
          />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Selected Skill Detail */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 max-w-sm w-full mx-4"
          >
            <div
              className="rounded-3xl p-6 text-center backdrop-blur-xl"
              style={{
                background: "rgba(15,23,42,0.95)",
                border: "1px solid rgba(99,102,241,0.4)",
                boxShadow: "0 0 60px rgba(99,102,241,0.3), 0 20px 80px rgba(0,0,0,0.6)",
              }}
            >
              <img
                src={selectedSkill.icon}
                alt={selectedSkill.name}
                className="w-16 h-16 mx-auto mb-3 object-contain"
                style={{ filter: `drop-shadow(0 0 12px ${selectedSkill.color})` }}
              />
              <h3 className="text-white font-extrabold text-2xl mb-1">{selectedSkill.name}</h3>
              <p className="text-slate-400 text-xs mb-4">
                Orbit {selectedSkill.orbit + 1} · Production Ready
              </p>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${80 + selectedSkill.orbit * 5}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${selectedSkill.color}, #a855f7)` }}
                />
              </div>
              <p className="text-indigo-400 text-sm font-semibold mb-4">
                {80 + selectedSkill.orbit * 5}% Proficiency
              </p>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-slate-500 hover:text-white text-sm transition-colors"
              >
                ✕ Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute bottom-8 left-8 z-10 hidden md:block">
        <div className="space-y-2">
          {["Core Stack", "Languages & Tools", "DevOps & Cloud"].map((label, i) => (
            <div key={label} className="flex items-center gap-2 text-xs text-slate-400">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: ["#6366f1", "#06b6d4", "#a855f7"][i],
                  boxShadow: `0 0 8px ${["#6366f1", "#06b6d4", "#a855f7"][i]}`,
                }}
              />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 right-8 z-10 text-right text-xs text-slate-500 hidden md:block">
        <p>Drag to rotate</p>
        <p>Scroll to zoom</p>
      </div>
    </section>
  );
}

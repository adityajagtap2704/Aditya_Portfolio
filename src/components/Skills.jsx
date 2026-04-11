import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { skills } from "../data/portfolio";
import { SectionTitle } from "./About";
import {
  SiCplusplus, SiJavascript, SiTypescript,
  SiReact, SiNextdotjs, SiHtml5, SiTailwindcss,
  SiNodedotjs, SiExpress,
  SiMongodb, SiMysql,
  SiGit, SiGithub, SiDocker, SiJenkins, SiPostman,
} from "react-icons/si";
import { FiCloud } from "react-icons/fi";

const iconMap = {
  "C++": <SiCplusplus />, "JavaScript": <SiJavascript />, "TypeScript": <SiTypescript />,
  "React.js": <SiReact />, "Next.js": <SiNextdotjs />, "HTML5": <SiHtml5 />,
  "CSS3": null, "Tailwind CSS": <SiTailwindcss />,
  "Node.js": <SiNodedotjs />, "Express.js": <SiExpress />,
  "MongoDB": <SiMongodb />, "MySQL": <SiMysql />, "SQL": <SiMysql />,
  "Git": <SiGit />, "GitHub": <SiGithub />, "Docker": <SiDocker />,
  "Jenkins": <SiJenkins />, "Postman": <SiPostman />,
  "AWS EC2": <FiCloud />, "AWS S3": <FiCloud />,
  "CodePipeline": <FiCloud />, "CloudFormation": <FiCloud />,
};

const categoryColors = {
  "Programming": "from-orange-400 to-red-500",
  "Frontend": "from-blue-400 to-indigo-500",
  "Backend": "from-green-400 to-emerald-500",
  "Database": "from-yellow-400 to-orange-500",
  "Tools": "from-purple-400 to-violet-500",
  "Cloud & DevOps": "from-cyan-400 to-blue-500",
};

export default function Skills() {
  const [ref, inView] = useInView();

  return (
    <section id="skills" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-100 blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle label="Skills" />
        <motion.div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(99,102,241,0.1)" }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 transition-all duration-300"
            >
              <div className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold mb-4 bg-gradient-to-r ${categoryColors[group.category]}`}>
                {group.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.1 + j * 0.05 + 0.2 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 transition-colors cursor-default"
                  >
                    {iconMap[skill] && <span className="text-base">{iconMap[skill]}</span>}
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

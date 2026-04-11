import { FiGithub, FiLinkedin, FiHeart } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { personalInfo } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm flex items-center gap-1">
          Built with <FiHeart className="text-red-400" /> by{" "}
          <span className="text-white font-semibold ml-1">Aditya Jagtap</span>
        </p>

        <p className="text-sm">© {new Date().getFullYear()} All rights reserved.</p>

        <div className="flex gap-4">
          {[
            { href: personalInfo.github, icon: <FiGithub size={18} />, label: "GitHub" },
            { href: personalInfo.linkedin, icon: <FiLinkedin size={18} />, label: "LinkedIn" },
            { href: personalInfo.leetcode, icon: <SiLeetcode size={16} />, label: "LeetCode" },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="hover:text-white transition-colors"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

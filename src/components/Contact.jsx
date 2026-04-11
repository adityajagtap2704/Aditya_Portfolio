import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { personalInfo } from "../data/portfolio";
import { SectionTitle } from "./About";
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend } from "react-icons/fi";

export default function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, wire this to a backend or EmailJS
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle label="Get In Touch" />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 mt-12"
        >
          {/* Info */}
          <div>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              I'm open to full-time roles, internships, and freelance projects. Feel free to reach out — I'll get back to you soon.
            </p>
            <div className="space-y-4">
              {[
                { icon: <FiMail />, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: <FiMapPin />, label: personalInfo.location, href: null },
              ].map(({ icon, label, href }) => (
                <div key={label} className="flex items-center gap-3 text-slate-600">
                  <span className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    {icon}
                  </span>
                  {href ? <a href={href} className="hover:text-indigo-600 transition-colors">{label}</a> : <span>{label}</span>}
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              {[
                { href: personalInfo.github, icon: <FiGithub size={20} />, label: "GitHub" },
                { href: personalInfo.linkedin, icon: <FiLinkedin size={20} />, label: "LinkedIn" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: "name", type: "text", placeholder: "Your Name" },
              { name: "email", type: "email", placeholder: "Your Email" },
            ].map(({ name, type, placeholder }) => (
              <input
                key={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-slate-700 placeholder-slate-400 transition-all"
              />
            ))}
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-slate-700 placeholder-slate-400 transition-all resize-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              {sent ? "Message Sent ✓" : <><FiSend /> Send Message</>}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

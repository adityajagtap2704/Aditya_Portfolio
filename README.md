# Aditya Jagtap — Personal Portfolio

A modern, fully responsive developer portfolio built with React + Vite + Tailwind CSS. Features a 3D orbital skills section, smooth scroll animations, dark/light themed sections, and a clean professional layout.

---

## Live Demo

> [Deploy on Vercel and add your URL here.](https://aditya-portfolio-theta-liard.vercel.app/)

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| 3D / WebGL | Three.js, @react-three/fiber, @react-three/drei |
| Icons | React Icons |
| Deployment | Vercel |

---

## Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── Aditya_Jagtap_Resume.pdf     ← place your resume here
├── src/
│   ├── assets/
│   │   └── hero.png                 ← your profile photo
│   ├── components/
│   │   ├── Navbar.jsx               ← sticky nav with active section highlight
│   │   ├── Hero.jsx                 ← typing animation, floating badges, particles
│   │   ├── About.jsx                ← animated counters, info cards
│   │   ├── Education.jsx            ← alternating timeline (10th / 12th / B.Tech)
│   │   ├── Experience.jsx           ← tab switcher, white theme
│   │   ├── TechnicalSkills.jsx      ← icon grid with show all toggle
│   │   ├── OrbitalSkills.jsx        ← 3D-style sphere with orbiting skill icons
│   │   ├── Projects.jsx             ← magnetic tilt cards, modal, white theme
│   │   ├── Certifications.jsx       ← dark glass cards with stagger animation
│   │   ├── Contact.jsx              ← contact form + social links
│   │   ├── Footer.jsx               ← minimal footer
│   │   └── ScrollToTop.jsx          ← floating scroll-to-top button
│   ├── data/
│   │   └── portfolio.js             ← all content in one place (edit here)
│   ├── hooks/
│   │   └── useInView.js             ← intersection observer hook
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── vercel.json                      ← SPA rewrite rule for Vercel
├── vite.config.js
└── package.json
```

---

## Sections

| Section | Description |
|---|---|
| Hero | Name, typing role animation, profile photo, resume download, social links |
| About | Summary, location, animated stat counters |
| Education | B.Tech, 12th, 10th — alternating timeline layout |
| Experience | Tab-switcher showing internship details (Kalnet Global, Senim Solutions) |
| Technical Skills | Icon grid of 26 skills with Show All toggle |
| Skills Orbit | Pseudo-3D sphere with 17 skills orbiting in 3 rings |
| Projects | 4 projects — StudyNotion, Streamify VC, Cab Booking, AWS CI/CD |
| Certifications | 6 certifications — NPTEL, CCNA, Google Cloud, Saylor Academy |
| Contact | Contact form + email + social links |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
# Clone the repo
git clone https://github.com/adityajagtap2704/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with:

```bash
npm run preview
```

---

## Adding Your Resume

1. Export your resume as a PDF
2. Rename it to `Aditya_Jagtap_Resume.pdf`
3. Drop it into the `public/` folder

The "Download Resume" button in the Hero section and Navbar will automatically serve it.

---

## Customization

All content lives in one file — `src/data/portfolio.js`. Edit it to update:

- Personal info (name, email, links)
- Skills list
- Projects (title, description, tech, GitHub link)
- Experience (company, role, points, tech)
- Education
- Certifications

To swap your profile photo, replace `src/assets/hero.png` with your own image (keep the same filename or update the import in `Hero.jsx`).

---

## Deploying to Vercel

1. Push the project to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Set the **root directory** to `portfolio`
4. Framework preset: **Vite** (auto-detected)
5. Click **Deploy**

The `vercel.json` file handles SPA routing so direct URL access never 404s.

---

## Features

- Typing animation cycling through roles
- Scroll-triggered entrance animations on every section
- 3D magnetic tilt on project cards
- Cursor spotlight glow on project cards
- Pseudo-3D orbital sphere with depth occlusion (icons hide behind sphere)
- Animated number counters in About section
- Tab-switcher Experience section with blur transition
- Click-to-expand project modal
- Sticky navbar with active section highlighting
- Scroll-to-top button
- Fully responsive (mobile, tablet, desktop)
- Resume download on button click

---

## License

MIT — free to use and modify for your own portfolio.

---

## Author

**Aditya Jagtap**
- GitHub: [@adityajagtap2704](https://github.com/adityajagtap2704)
- LinkedIn: [aditya-jagtap-4327a42bb](https://www.linkedin.com/in/aditya-jagtap-4327a42bb)
- LeetCode: [adi_jagtap_27](https://leetcode.com/u/adi_jagtap_27/)
- Email: adityajagtap2704@gmail.com

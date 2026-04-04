# Arjun – MERN Stack Developer Portfolio

A fully responsive, dark-themed portfolio website built with React + Vite.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server (localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Component Structure

```
src/
├── App.jsx              # Root component — assembles all sections
├── App.css              # Global CSS variables, typography, animations
├── main.jsx             # React entry point
└── components/
    ├── Navbar.jsx / .css     # Fixed top nav with scroll-aware active state
    ├── Hero.jsx   / .css     # Full-screen hero with animated image & tags
    ├── About.jsx  / .css     # About me + qualities grid
    ├── Skills.jsx / .css     # Skill cards with animated progress bars
    ├── Projects.jsx / .css   # Filterable project cards grid
    ├── Journey.jsx / .css    # Alternating timeline (work history)
    ├── Contact.jsx / .css    # Two-column contact section with form
    └── Footer.jsx / .css     # Simple footer
```

## 🎨 Design System

| Token | Value |
|---|---|
| Primary BG | `#0a0e1a` |
| Secondary BG | `#0f1524` |
| Accent (Cyan) | `#00d4ff` |
| Display Font | Syne (700/800) |
| Body Font | DM Sans (400/500) |

## ✏️ Customisation

1. **Personal info** — Edit name, description, social links in `Hero.jsx`
2. **Projects** — Update the `projects` array in `Projects.jsx`
3. **Experience** — Edit the `experiences` array in `Journey.jsx`
4. **Skills** — Adjust levels in the `skillCategories` array in `Skills.jsx`
5. **Contact** — Replace email/location in `Contact.jsx`
6. **Photo** — Swap the Unsplash URL in `Hero.jsx` with your own image

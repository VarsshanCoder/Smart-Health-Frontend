<!-- 🌐 SmartCare+ Frontend README -->

<p align="center">
  <img src="https://github.com/VarsshanCoder/Smart-Health-Frontend/blob/main/assets/banner.png" alt="SmartCare+ Banner" width="100%" />
</p>

<h1 align="center">🌈 SmartCare+ — Frontend UI/UX System</h1>

<p align="center">
  <b>Reimagining healthcare through design, motion, and intelligence 🧠💫</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/UI-Glassmorphism-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Animations-FramerMotion-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Design-System-Modern-purple?style=flat-square" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" />
</p>

## 🖌️ Overview  

**SmartCare+ Frontend** is a futuristic, fully-animated UI/UX system built for healthcare intelligence.  
It’s designed with **Glassmorphism**, **dark neon effects**, and **AI-enhanced interactions** to deliver a seamless digital healthcare experience — connecting **patients, doctors, and hospitals** through beauty and logic.  

---

## 🌟 Key Highlights  

✨ **100% Animated UI** — glowing transitions, page morphs, and dynamic element entry  
🧠 **AI-Ready Components** — integrated chatbot & health insights display  
🌫️ **Glassmorphism & Dark Mode** — aesthetic, elegant, and easy on the eyes  
⚡ **Responsive Design** — optimized for desktop, tablet, and mobile  
🎨 **Modular Architecture** — scalable component system with atomic design  
🌈 **Smooth User Flow** — optimized UX for patients, doctors, and admins  

---

## 🧩 Tech Stack  

| Category | Tools & Frameworks |
|-----------|-------------------|
| **Core Framework** | React.js / Next.js |
| **Styling** | TailwindCSS + Framer Motion + Glassmorphism |
| **Animation** | Framer Motion / GSAP |
| **State Management** | Zustand / Redux Toolkit |
| **AI Components** | OpenAI API / Chatbot UI |
| **API Layer** | Axios / React Query |
| **Design System** | Shadcn/UI + Custom Motion Components |
| **Build Tools** | Vite / Next Build / ESLint + Prettier |

---


## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd varshgpt
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── layout/          # Main layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ChatArea.tsx
│   │   ├── Composer.tsx
│   │   └── ContextPanel.tsx
│   └── ui/              # Reusable UI components
│       ├── button.tsx
│       ├── input.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── mode-switcher.tsx
│       └── keyboard-shortcuts.tsx
├── contexts/            # React contexts
│   ├── ThemeContext.tsx
│   └── ChatContext.tsx
├── hooks/               # Custom hooks
│   └── useKeyboardShortcuts.ts
├── lib/                 # Utilities
│   └── utils.ts
├── types/               # TypeScript types
│   └── index.ts
├── App.tsx
├── index.tsx
└── index.css
```

## Design System

### Colors
- **Background**: #0B0F12 (very dark)
- **Surface**: #0F1417 (cards and panels)
- **Primary**: #4FB0FF (calm blue)
- **Secondary**: #7BE38B (soft green)
- **CTA**: #5CC8FF (call-to-action)
- **Error**: #FF6B6B
- **Muted**: #AEB6BD (secondary text)

### Typography
- **Primary Font**: Inter (sans-serif)
- **Monospace**: JetBrains Mono
- **Sizes**: 12px (small) to 24px (large)

### Layout
- **Desktop**: Three-column layout (sidebar, chat, context)
- **Mobile**: Single column with collapsible panels
- **Breakpoints**: Mobile-first responsive design

## Keyboard Shortcuts

- `Ctrl/Cmd + K` - Quick search
- `Ctrl/Cmd + N` - New chat
- `Ctrl/Cmd + /` - Toggle shortcuts
- `Ctrl/Cmd + B` - Toggle sidebar
- `Ctrl/Cmd + J` - Toggle context panel
- `Enter` - Send message
- `Shift + Enter` - New line
- `Esc` - Close modals

## Features Implementation Status

- ✅ Project setup and configuration
- ✅ Core layout components
- ✅ Theme system (dark/light)
- ✅ Chat interface with message bubbles
- ✅ Mode switcher for different chat types
- ✅ Responsive design
- ✅ Keyboard shortcuts
- ✅ Accessibility features
- 🔄 AI integration (placeholder)
- 🔄 File upload functionality
- 🔄 Code execution
- 🔄 Voice input

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Design inspired by modern AI chat interfaces
- Built with accessibility in mind
- Optimized for student and professional workflows

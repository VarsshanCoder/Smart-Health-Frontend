# VarshGpt - AI Coding & Exam Prep

A modern, clean UI/UX implementation for VarshGpt - an AI chatbot designed for exam prep, coding help, and productivity. Built with React, TypeScript, and TailwindCSS.

## Features

### 🎯 **Multi-Mode Support**
- **Aptitude Mode**: Logical reasoning & quantitative problems
- **Coding Mode**: Algorithms, data structures & programming help
- **Document Mode**: Analyze & summarize uploaded documents
- **Quiz Mode**: Practice tests & assessments
- **Custom Mode**: General conversation

### 🎨 **Modern Design**
- Dark mode by default with light mode option
- Clean, minimal interface focused on content
- Responsive design (desktop, tablet, mobile)
- Custom VarshGpt color palette
- Smooth animations and transitions

### 💬 **Chat Features**
- Real-time message streaming
- Code syntax highlighting
- File upload support
- Voice input capability
- Message reactions and feedback
- Source citations and references

### 🛠️ **Tools & Context**
- Integrated code runner
- Document preview and analysis
- Quick action buttons
- Context-aware suggestions
- Keyboard shortcuts

### ♿ **Accessibility**
- Full keyboard navigation
- ARIA attributes and screen reader support
- High contrast mode
- Focus management
- Keyboard shortcuts overlay

## Tech Stack

- **React 18** with TypeScript
- **TailwindCSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **Context API** for state management

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

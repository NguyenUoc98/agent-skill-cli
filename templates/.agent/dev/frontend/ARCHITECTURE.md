# Antigravity Kit Architecture

> System overview for the current single-agent development setup.

---

## 🏗️ Directory Structure

```plaintext
.agent/
├── ARCHITECTURE.md          # This file (System Overview)
├── agents/                  # Specialist AI Persona (1 active)
├── rules/                   # Global Rules (GEMINI.md)
├── skills/                  # Domain-specific knowledge modules
└── workflows/               # Slash Command Procedures
```

---

## 🤖 Active Agent

| Agent                 | Focus                                  | Location                                |
| --------------------- | -------------------------------------- | --------------------------------------- |
| `frontend-specialist` | Web UI/UX, Performance, React, Next.js | `.agent/agents/frontend-specialist.md` |

---

## 🧩 Active Skills (4)

Modular knowledge domains loaded by the `frontend-specialist`.

| Skill                    | Description                                  |
| ------------------------ | -------------------------------------------- |
| `frontend-design`        | Design systems and UX patterns               |
| `nextjs-react-expert`   | Next.js performance and patterns             |
| `tailwind-patterns`      | Utility-first styling with Tailwind CSS      |
| `web-design-guidelines` | Accessibility and design audit principles    |

---

## 🔄 Workflows (1)

Slash command procedures. Invoke with `/command`.

| Command       | Description                 | Location                            |
| ------------- | --------------------------- | ----------------------------------- |
| `/brainstorm` | Socratic discovery & design | `.agent/workflows/brainstorm.md`    |

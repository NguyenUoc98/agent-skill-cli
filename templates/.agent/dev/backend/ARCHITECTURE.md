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

| Agent                | Focus                                   | Location                                 |
| -------------------- | --------------------------------------- | ---------------------------------------- |
| `backend-specialist` | API, Laravel, Business Logic, TDD/SOLID | `.agent/agents/backend-specialist.md`    |

---

## 🧩 Active Skills (6)

Modular knowledge domains loaded by the `backend-specialist`.

| Skill                    | Description                                                                 |
| ------------------------ | --------------------------------------------------------------------------- |
| `laravel-app-guidelines` | Laravel guidelines and conventions (read this first) if laravel project     |
| `laravel-tdd`            | TDD workflow with Pest/PHPUnit in Laravel                                   |
| `mysql`                  | MySQL optimization and schema management                                    |
| `clichouse-expert`       | ClickHouse database expertise                                               |
| `docker`                 | Containerization and deployment patterns                                    |
| `python-patterns`        | Python standards, FastAPI                                                   |

---

## 🔄 Workflows (1)

Slash command procedures. Invoke with `/command`.

| Command      | Description                 | Location                            |
| ------------ | --------------------------- | ----------------------------------- |
| `/brainstorm`| Socratic discovery & design | `.agent/workflows/brainstorm.md`    |
| `/dict:add`  | Import table to Dictionary  | `.agent/workflows/dict_add.md`      |
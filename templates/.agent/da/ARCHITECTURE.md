# Data Analytics (DA) Kit Architecture

> System overview for the multi-agent Data Analytics development setup.

---

## 🏗️ Directory Structure

```plaintext
[Project Root]/
├── data_dictionary/         # Central Source of Truth for Database Schema & Metrics
│   ├── README.md            # Map of the Data Warehouse & DB indexes
│   └── [table_name].md      # Granular schema details for tables
└── .agent/
    ├── ARCHITECTURE.md      # This file (System Overview)
    ├── agents/              # Specialist AI Personas for DA workflow
    ├── rules/               # Global Rules (GEMINI.md, TESTING.md)
    ├── skills/              # Domain-specific knowledge modules
    └── workflows/           # Slash Command Procedures
```

---

## 🤖 Active Agents

The DA workflow utilizes a specialized multi-agent system. Each agent focuses on a distinct layer of the data lifecycle.

| Agent                  | Focus                                   | Location                                 |
| ---------------------- | --------------------------------------- | ---------------------------------------- |
| `orchestrator`         | DA Tech Lead, Multi-agent coordination  | `.agent/agents/orchestrator.md`          |
| `project-planner`      | Report planning, task decomposition     | `.agent/agents/project-planner.md`       |
| `data-analyst`         | Metrics, Dashboards, SQL, Insights      | `.agent/agents/data-analyst.md`          |
| `data-engineer`        | ETL/ELT pipelines, Data Warehousing     | `.agent/agents/data-engineer.md`         |
| `database-optimizer`   | Query tuning, Indexing, Performance     | `.agent/agents/database-optimizer.md`    |
| `backend-specialist`   | FastAPI, Python Data APIs               | `.agent/agents/backend-specialist.md`    |
| `frontend-specialist`  | React, D3.js, Recharts, Dashboard UI    | `.agent/agents/frontend-specialist.md`   |

---

## 🧩 Active Skills Library

Modular knowledge domains dynamically loaded by the active agents inside `.agent/skills/`.

### Data & Backend
| Skill | Description |
|-------|-------------|
| `python-pro` & `fastapi-pro` | Advanced Python backend APIs and data aggregation patterns |
| `database`, `database-optimizer`, `clickhouse-expert` | Core SQL architecture, heavy aggregations, ClickHouse mastery, and query optimization |
| `python-testing-patterns` | TDD implementation tests for Python/FastAPI workflows |
| `tdd-*` | Core Test-Driven Development components (`orchestrator`, `cycle`, `red`, `green`, `refactor`) |

### Frontend & Data Visualization
| Skill | Description |
|-------|-------------|
| `claude-d3js-skill` | Interactive and performant data visualizations with D3.js |
| `nextjs-react-expert` & `react-patterns` | Component architecture, `useMemo` optimization for heavy data points |
| `shadcn` & `tailwind-*` | Clean, accessible UI components and data grid designs |
| `frontend-design` & `web-design-guidelines` | Architectural UX guidelines tailored for reporting and analytics |

---

## 🔄 Workflows

Slash command procedures. Invoke with `/command`.

| Command           | Description                                      | Location                                   |
| ----------------- | ------------------------------------------------ | ------------------------------------------ |
| `/dict:add`       | Import table to Dictionary                       | `.agent/workflows/dict_add.md`             |
| `/report_builder` | End-to-end report build (multi-agent, phased)    | `.agent/workflows/report_builder.md`       |
| `/brainstorm`     | Socratic discovery & design                      | `.agent/workflows/brainstorm.md`           |

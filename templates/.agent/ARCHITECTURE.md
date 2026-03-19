# Architecture

---

## 🏗️ Folder Structure

The `.agent` directory is organized by **role**, with each role having its own set of agents, rules, skills, and workflows.

```text
.agent/
├── common/             # Global components
│   └── workflow/
├── dev/                # Developer roles
│   ├── common/         # Shared Dev rules/skills
│   ├── frontend/       # Frontend specialized content
│   └── backend/        # Backend specialized content
├── designer/           # Designer role
├── po_ba/              # Product Owner / BA role
└── tester/             # Tester role
```

---

## 🧭 Role Architecture

For detailed information about each role:

- 💻 **[dev/ARCHITECTURE.md](dev/ARCHITECTURE.md)**: Technical development (Frontend/Backend) and TDD.
- 📐 **[designer/ARCHITECTURE.md](designer/ARCHITECTURE.md)**: UI/UX Design patterns and guidelines.
- 📋 **[po_ba/ARCHITECTURE.md](po_ba/ARCHITECTURE.md)**: Product Management, Requirements, and Documentation.
- 🧪 **[tester/ARCHITECTURE.md](tester/ARCHITECTURE.md)**: Quality Assurance, Automated and Functional Testing.

---

> **MANDATORY:** Check the `rules/` within each role folder to understand how the AI perceives and executes its job for that specific role.



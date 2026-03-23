# Agent Skills CLI (`@uocnv1998/agent-kit`)

A powerful command-line tool designed to scaffold and manage AI Agent environments. This tool specifically builds the foundation for AI agents (like Antigravity) by setting up structured **Skills**, **Rules**, and **Workflows** within your project.

## 🚀 Overview

The **Agent Skills CLI** streamlines the process of initializing a project for specific AI roles. It ensures that your AI collaborator has the right context, tools, and operational procedures to be effective immediately.

## 🛠 Installation & Usage

You can run this tool directly using `npx` without installation:

```bash
npx @uocnv1998/agent-kit --role=<role_name>
```

Replace `<role_name>` with one of the supported roles.

### Example:
```bash
npx @uocnv1998/agent-kit --role=dev
```

## 🎭 Supported Roles

| Role | Description |
| :--- | :--- |
| `po_ba` | Product Owner / Business Analyst context and requirements gathering skills. |
| `designer` | UI/UX design patterns and aesthetic guidelines. |
| `dev` | Development standards, coding patterns, and technical implementation skills. |
| `tester` | Quality assurance, testing strategies, and bug reporting workflows. |
| `all` | Installs the full suite of roles and global configurations. |

## 📁 Project Structure

When you run the command, it creates or updates a `.agent/` directory in your project root:

```text
your-project/
├── .agent/
│   ├── rules/       # Global and role-specific operational rules
│   ├── skills/      # Specialized instructions for different agent roles
│   └── workflows/   # Step-by-step guides for common tasks
└── ...
```

## ⚙️ How it Works

The CLI copies pre-defined templates from the `@uocnv1998/agent-kit` package into your local `.agent` folder:
1. **Selective Skills**: Only the skills relevant to the chosen role are copied.
2. **Workflows**: Role-specific `*-workflow.md` files are placed in the workflows directory.
3. **Rules**: Role-specific `GEMINI.md` rules are established to guide the agent's behavior.

## 🤝 Contributing

This project is built to improve the "Local-First, Handoff via Jira" strategy for AI Agent collaboration. If you have suggestions for new skills or role templates, feel free to contribute!
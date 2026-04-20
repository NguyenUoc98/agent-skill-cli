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

### Examples:
```bash
# Standard role installation
npx @uocnv1998/agent-kit --role=dev

# DA role with interactive AI framework selection
npx @uocnv1998/agent-kit --role=da
# → Choose between: Antigravity (default) or Claude
```

## 🎭 Supported Roles

| Role | Description |
| :--- | :--- |
| `po_ba` | Product Owner / Business Analyst context and requirements gathering skills. |
| `designer` | UI/UX design patterns and aesthetic guidelines. |
| `dev` | Development standards, coding patterns, and technical implementation skills. |
| `tester` | Quality assurance, testing strategies, and bug reporting workflows. |
| `da` | **NEW** Data Analytics workflow with multi-agent coordination (choose Antigravity or Claude). |
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
3. **Rules**: Role-specific rules are established to guide the agent's behavior.

## 🤖 AI Framework Selection (DA Role Only)

For the **Data Analytics (`da`) role**, you'll be prompted to choose your AI framework:

```
? Which AI framework would you like to use?
  ◉ Antigravity - Default Antigravity framework
  ○ Claude - Claude AI with advanced features (Opus 4.6, Sonnet 4.6)
```

**Use arrow keys ↑↓ to navigate, SPACE/ENTER to select.**

### Antigravity Setup
- Agents use `model: inherit` (flexible)
- Rules: `.agent/rules/GEMINI.md`
- Minimal overhead, maximum flexibility

### Claude Setup
- Agents pre-optimized with **Opus 4.6** and **Sonnet 4.6**
- Rules: `.agent/rules/CLAUDE.md` (advanced optimization)
- Features: Prompt caching, MCP server integration, safety hooks
- Setup Guide: `.agent/CLAUDE_SETUP.md`
- Settings Template: `.agent/templates/claude.settings.json`

**Choose Claude if you use Claude Code IDE for best experience and advanced agent capabilities.**

## 📊 DA Workflow Overview (Data Analytics Role)

The DA role comes with a complete multi-agent system for building data reports end-to-end:

### Available Agents

| Agent | Purpose | AI Framework |
|-------|---------|--------------|
| `orchestrator` | Coordinates all 5 specialist agents | Opus 4.6 / inherit |
| `project-planner` | Breaks down report tasks into phases | Sonnet 4.6 / inherit |
| `data-analyst` | Metrics design, KPI definition, SQL analysis | Sonnet 4.6 / inherit |
| `data-engineer` | ETL/pipeline design, ClickHouse optimization | Opus 4.6 / inherit |
| `database-optimizer` | Query tuning, indexing, performance | Opus 4.6 / inherit |
| `backend-specialist` | FastAPI endpoints, Pydantic models | Sonnet 4.6 / inherit |
| `frontend-specialist` | React dashboards, D3.js visualizations | Opus 4.6 / inherit |

### Getting Started with DA Workflow

```bash
# 1. Initialize DA role
npx @uocnv1998/agent-kit --role=da
# Choose: Antigravity or Claude

# 2. If Claude, copy settings template
cp .agent/templates/claude.settings.json ./settings.json

# 3. Read architecture & rules
cat .agent/ARCHITECTURE.md
cat .agent/rules/GEMINI.md  # or CLAUDE.md if Claude chosen

# 4. Start building reports!
# Invoke orchestrator for end-to-end report builds
# Or individual agents for specific tasks
```

### Workflow Phases

1. **ANALYSIS** (data-analyst) - Define metrics and KPIs
2. **DATA DESIGN** (data-engineer) - Create SQL schemas and pipelines
3. **OPTIMIZATION** (database-optimizer) - Tune query performance
4. **API** (backend-specialist) - Build data APIs
5. **UI** (frontend-specialist) - Create interactive dashboards

## 🤝 Contributing

This project is built to improve the "Local-First, Handoff via Jira" strategy for AI Agent collaboration. If you have suggestions for new skills, role templates, or AI framework improvements, feel free to contribute!
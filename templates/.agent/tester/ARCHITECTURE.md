# Tester Architecture

---

## 🗂️ Context Sources (Dual-Layer)

Tester and Dev work in **separate workspaces**. They do NOT share a project root. The only cross-workspace communication channel is **Jira/Confluence** (via `mcp-atlassian`).

### Layer 1: OpenSpec — Spec Artifacts (Tester-owned)
The Tester uses [OpenSpec](https://github.com/Fission-AI/OpenSpec) within its own workspace to document test specs per feature. Each ticket gets its own change folder following the OpenSpec convention.

```plaintext
openspec/changes/
└── test-{JIRA-KEY}/            ← Created in Phase 1+2, archived after Phase 3
    ├── proposal.md             ← Test scope: WHY, what's in/out of scope
    ├── specs/
    │   ├── analysis.md         ← Phase 1 output: AC breakdown, risks, traceability map
    │   └── test-scenarios.md   ← Phase 2 output: full test case table (Playwright-ready)
    ├── design.md               ← Phase 2 output: test strategy, ISTQB techniques used
    └── tasks.md                ← Phase 2 output: checklist of all test cases (- [ ] TC-001...)
```

> **Input to Phase 1**: Jira AC + Confluence PRD (fetched via `mcp-atlassian`).  
> **NOT** read from Dev's workspace — Dev and Tester have separate project roots.

### Layer 2: `test-registry/` — Execution Artifacts + Persistent State (Tester-owned)
Stores runtime results and persistent QA metadata that survives across sprints.

```plaintext
test-registry/
├── README.md                   ← Master index — MUST read at session start (Step 0)
├── environment.md              ← DEV/STG URLs, Playwright browser config
├── feature-map.md              ← Feature coverage status across all sprints
└── runs/
    └── {JIRA-KEY}/
        ├── execution-log.md    ← Phase 3 output: per-case pass/fail + evidence
        └── summary-report.md   ← Phase 3 output: sprint closure report
```

> **Rule:** Every Tester workflow MUST read `test-registry/README.md` as its first step (Step 0).

---

## 🤖 Agents

| Agent | Focus |
| :--- | :--- |
| `qa-specialist` | QA generalist: business understanding, bug reporting, sprint coordination. |
| `test-engineer` | Functional testing, regression, edge case scenario design. |
| `qa-automation-engineer` | Automated test execution via Playwright MCP. |

---

## 🧩 Skills

| Skill | Description |
| :--- | :--- |
| `test-analysis-document` | Requirement analysis with 8 core mindsets (Input→Logic→Output breakdown). |
| `test-planning` | 4-Phase workflow orchestration (Plan→Execute→Bug Report→Closure). |
| `testcase-writing` | ISTQB techniques (EP, BVA, Decision Table, State Transition) + 2-2-1 baseline rule. |

---

## 🚀 Getting Started

Run once in the QA project root to set up the full environment:

```bash
npx agent-kit --role=tester
```

This command:
1. Installs [OpenSpec](https://github.com/Fission-AI/OpenSpec) globally (`@fission-ai/openspec@latest`)
2. Runs `openspec init --tools antigravity` → creates `openspec/` structure
3. Copies `.agent/` templates → installs QA workflows, skills, rules
4. Creates `test-registry/` → environment config, feature coverage map, runs archive

After setup, **fill in `test-registry/environment.md`** with the project's DEV/STG URLs before the first test session.

---

## 🔄 Workflows

| Command | Phase | Input | Output |
| :--- | :--- | :--- | :--- |
| `/tester-analyze <KEY>` | Phase 1 | Jira AC (via `mcp-atlassian`) | `openspec/changes/test-{KEY}/proposal.md` + `specs/analysis.md` |
| `/tester-write-plan <KEY>` | Phase 2 | `analysis.md` | `specs/test-scenarios.md` + `design.md` + `tasks.md` |
| `/tester-execute <KEY>` | Phase 3 | `tasks.md` + `test-scenarios.md` | `test-registry/runs/{KEY}/` + bugs in Jira + openspec archived |

---

## 🛠️ Rules

- `GEMINI.md`: Core principles, multi-agent routing, quality execution standards.
- `DOCUMENT_ANALYSIS.md`: Rules for analyzing PRD/business requirements before testing.
- `TESTCASE_DESIGN.md`: Rules for designing test cases (ISTQB-Aligned).

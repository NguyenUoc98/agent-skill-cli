---
description: Phase 1 — Analyze the requirement/ticket and clarify ambiguities before any test writing begins.
---

# Workflow: Requirement Analysis & Refinement

Trigger this workflow when you receive a new Jira Ticket, PRD, or User Story for testing. The goal is to produce a clear, unambiguous understanding of the feature under test **before** writing any test plans or test cases.

Call via: `/tester-analyze <JIRA-KEY>`

---

## Step 0: Load Project Context (Mandatory First Step)

Before doing anything else, read the project's QA context:

1. `view_file` → `test-registry/README.md` — Understand the project overview and available sources.
2. `view_file` → `test-registry/environment.md` — Confirm the active test environment and BASE_URL.
3. `view_file` → `test-registry/feature-map.md` — Check if this feature has been tested before (any prior history).
4. Check if `openspec/changes/test-{JIRA-KEY}/` already exists in this workspace — if yes, load existing spec artifacts rather than starting from scratch.

> If `test-registry/` does not exist, stop and instruct the user to run `/tester-init` first.

---

## Step 1: Gather Input Context

> **NOTE:** Tester and Dev work in **separate workspaces**. The Tester cannot access Dev's file system directly. All requirement inputs must come via shared tools (Jira, Confluence).

- **Primary — Jira Ticket** (use `mcp-atlassian` to fetch):
  - Read **Acceptance Criteria (AC)** — the single source of truth for what to test.
  - Read linked design references (Figma, API specs, Confluence PRD links).
  - Note the feature scope: Is this a UI flow, API endpoint, or both?
- **Secondary — Confluence** (if linked on the Jira ticket):
  - Read the PRD or feature spec page for full business context.
- **Tertiary — Local API specs in Tester workspace** (if shared files exist):
  - Check for `openapi.yaml`, Postman collections, or exported Swagger files.

## Step 2: Apply `test-analysis-document` Skill

Invoke the `test-analysis-document` skill to systematically analyze the gathered input:
- Break down the system into **Input → Logic → Output**.
- Identify the **End-to-End flow** across the feature.
- Distinguish the **Main flow**, **Sub flows**, and **Edge cases**.
- Cross-compare: Ticket AC ↔ Figma design ↔ API Request/Response for any mismatches.

## Step 3: Identify Gaps & Risks

- Flag any AC that is **vague or untestable** (no clear measurable expected result).
- Flag any **missing data** (no API spec, no design spec, no error state definition).
- Identify high-risk areas: Where are money flows? Where is role-based access control?

## Step 4: CHECKPOINT — Refinement Request

Pause and present your findings to the QA PIC or stakeholder:

> *"Gửi QA PIC, tôi đã phân tích xong ticket `[JIRA-KEY]`. Tôi có `[N]` điểm cần làm rõ trước khi viết test plan:*
> *1. [Điểm chưa rõ 1]*
> *2. [Điểm chưa rõ 2]*
> *Vui lòng xác nhận hoặc bổ sung trước khi tôi chuyển qua giai đoạn viết test."*

**Do NOT proceed to test writing until all critical gaps are resolved or explicitly acknowledged.**

## Output

Create the Tester's own OpenSpec folder for this ticket:
```
openspec/changes/test-{JIRA-KEY}/
├── proposal.md     ← Test scope: why we're testing this, what's in/out of scope
└── specs/
    └── analysis.md  ← Feature summary, risks, gaps, traceability map (AC-01, AC-02...)
```

Also update `test-registry/feature-map.md`: set this feature's status to `🔍 Analyzing`.

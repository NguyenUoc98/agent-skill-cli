---
description: Phase 2 — Write Test Plan and Test Cases based on the analyzed requirements.
---

# Workflow: Test Plan & Test Case Writing

Trigger this workflow **after** `analyze-and-refine` is complete and all critical gaps have been resolved. The goal is to produce a structured, Playwright-executable set of test cases stored locally.

Call via: `/tester-write-plan <JIRA-KEY>`

**Prerequisite:** `/tester-analyze <JIRA-KEY>` must have been completed. File `test-registry/test-cases/{JIRA-KEY}/analysis.md` must exist.

---

## Step 0: Load Context

1. `view_file` → `openspec/changes/test-{JIRA-KEY}/specs/analysis.md` — Load Phase 1 analysis output.
2. `view_file` → `openspec/changes/test-{JIRA-KEY}/proposal.md` — Load scope and objectives.
3. `view_file` → `test-registry/environment.md` — Confirm target environment.

---

## Step 1: Define Test Strategy (via `test-planning` Skill)

Invoke the `test-planning` skill to establish:
- **Scope**: Confirm in-scope vs out-of-scope items from `analysis.md`.
- **Test Types**: Determine which types of tests apply (UI/E2E, API Black-box, Validation).
- **Environment**: Confirm the target environment (DEV SERVER URL). Do not use local unless explicitly approved.
- **Tooling**: Playwright MCP for UI/E2E execution. REST client tools for API testing.

## Step 2: Generate Test Cases (via `testcase-writing` Skill)

Invoke the `testcase-writing` skill to produce the full test case matrix.

For **each Acceptance Criteria** identified in `analysis.md`:
1. Identify applicable ISTQB technique(s): EP, BVA, Decision Table, State Transition, or Use Case Testing.
2. Apply the **2-2-1 baseline rule** as minimum coverage:
   - 2 Positive (Happy Path)
   - 2 Negative (Validation / Auth errors)
   - 1 Edge Case (Boundary / Security / Timeout)

## Step 3: Format Output Table

Store results locally at:
```
test-registry/test-cases/{JIRA-KEY}/test-plan.md
```

The table must include all required columns:

| Test_ID | Type | Technique | Scenario_Title | Pre_conditions | Steps | Expected_Result |
|---|---|---|---|---|---|---|
| TC-001 | Positive | Use Case | ... | ... | ... | ... |

**Steps must be Playwright-executable** (specific element selectors, clear navigation paths, exact assertions — not vague descriptions).

## Step 4: CHECKPOINT — Plan Review

Pause and present the completed test plan to the QA PIC:

> *"Gửi QA PIC, tôi đã hoàn thành bộ test case cho ticket `[JIRA-KEY]` gồm `[N]` scenarios (`[X]` Positive, `[Y]` Negative, `[Z]` Edge). Vui lòng review trước khi tôi tiến hành thực thi."*

**Do NOT proceed to execution until the user explicitly approves.**

## Step 5: Sync to Jira (Optional — upon approval)

Once the user approves the plan:
- Use `mcp-atlassian` to create a **Sub-task** on the original Jira ticket (e.g., `"[QA] Test Cases & Execution Plan — {JIRA-KEY}"`).
- The Sub-task description **MUST** include the full test case table for cloud visibility and team traceability.

## Output

Store results in the Tester's OpenSpec folder:
```
openspec/changes/test-{JIRA-KEY}/
├── proposal.md                  ← (already created in Phase 1)
├── specs/
│   ├── analysis.md              ← (already created in Phase 1)
│   └── test-scenarios.md        ← Full test case table (Playwright-ready)
├── design.md                    ← Test strategy: techniques, scope, tool config
└── tasks.md                     ← Checklist of all test cases (- [ ] TC-001...)
```
Jira Sub-task created (if approved).

Also update `test-registry/feature-map.md`: set status to `✍️ Plan Written`, update AC Count and Test Cases columns.

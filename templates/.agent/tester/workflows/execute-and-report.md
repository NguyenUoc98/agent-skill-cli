---
description: Phase 3 — Execute tests via Playwright MCP and generate the final QA report.
---

# Workflow: Test Execution & Reporting

Trigger this workflow **after** `write-test-plan` is complete and the QA PIC has approved the test plan. The goal is to execute all approved test scenarios, log bugs, and produce a Sprint Test Summary Report.

Call via: `/tester-execute <JIRA-KEY>`

**Prerequisite:** `/tester-write-plan <JIRA-KEY>` must have been completed and approved. File `test-registry/test-cases/{JIRA-KEY}/test-plan.md` must exist.

---

## Step 0: Load Context

1. `view_file` → `test-registry/README.md` — Get project overview.
2. `view_file` → `test-registry/environment.md` — Load the BASE_URL and Playwright browser config.
3. `view_file` → `openspec/changes/test-{JIRA-KEY}/tasks.md` — Load the test case checklist.
4. `view_file` → `openspec/changes/test-{JIRA-KEY}/specs/test-scenarios.md` — Load the full test scenarios table.

---

## Step 1: Environment Setup

- Confirm the target BASE_URL from `test-registry/environment.md`.
- Ensure the Playwright MCP is connected and reachable to the target URL.
- Load the test plan from `test-registry/test-cases/{JIRA-KEY}/test-plan.md`.

> **WARNING:** It is strictly forbidden to begin automated execution without the QA PIC's explicit approval from the previous workflow checkpoint.

---

## Step 2: Execute Test Scenarios via Playwright MCP

Run each test case in the approved plan **sequentially**:

1. Use Playwright MCP tools to execute each step:
   - `browser_navigate` — Navigate to the target URL/route.
   - `browser_fill_form` — Fill input fields.
   - `browser_click` — Trigger actions (buttons, links).
   - `browser_snapshot` — Capture DOM state for assertions.
   - `browser_wait_for` — Wait for expected text/element to appear.
   - `browser_console_messages` — Check for JS errors.
   - `browser_take_screenshot` — Capture visual evidence on failure.

2. For each test case, record the result:
   - ✅ **PASS**: Expected result matches actual result.
   - ❌ **FAIL**: Mismatch found. Capture screenshot and console logs as evidence.

3. Save the run log at:
```
test-registry/runs/{JIRA-KEY}/execution-log.md
```

---

## Step 3: Bug Reporting (on Failure)

For each **FAILED** test case:

1. Pause and notify the QA PIC:
   > *"Dear QA PIC, test case `[TC-ID]` — `[Scenario_Title]` has FAILED. Evidence saved locally. Do you approve creating a Bug ticket on Jira?"*
2. **Do NOT create a Jira ticket until the user explicitly approves.**
3. Once approved, use `mcp-atlassian` → `create_jira_issue` with:
   - **Issue Type**: `Bug`
   - **Name Format**: `[Bug] <Short error name — Impact level P0/P1/P2/P3>`
   - **Description must include**:
     - Environment (e.g., Dev Server v1.x)
     - Steps to Reproduce (from the test case steps)
     - Expected Output vs Actual Output
     - Screenshot or log evidence (reference local file path)
   - **Link** the Bug to the parent Jira ticket.

---

## Step 4: Sprint Closure — Test Summary Report

After all test cases have been executed:

1. Aggregate results:
   - Total scenarios executed
   - `% Pass` vs `% Fail`
   - List of bugs created (linked Jira IDs)

2. Generate the **Test Summary Report** at:
```
test-registry/runs/{JIRA-KEY}/summary-report.md
```

Template:
```markdown
# Test Summary Report — [JIRA-KEY]
**Date:** [Date]
**Environment:** [DEV/STG URL]
**Tester:** [Agent / QA Name]

## Coverage
| Total Scenarios | Pass | Fail | Pass Rate |
|---|---|---|---|
| N | X | Y | Z% |

## Bugs Found
| Bug Jira ID | Severity | Scenario | Status |
|---|---|---|---|
| BUG-001 | P1 | TC-003 | Open |

## Assessment
[Brief qualitative summary — is the feature ready to proceed / needs rework?]
```

3. If `mcp-atlassian` is available and approved by QA PIC, publish the summary report to the designated **Confluence page**.

---

## Output

```
openspec/changes/test-{JIRA-KEY}/          ← Spec artifacts (archived after closure)
├── proposal.md
├── specs/
│   ├── analysis.md
│   └── test-scenarios.md
├── design.md
└── tasks.md                              ← Check off each TC after execution

test-registry/runs/{JIRA-KEY}/             ← Execution artifacts (persistent)
├── execution-log.md                      ← Per-case pass/fail records + evidence
└── summary-report.md                     ← Sprint closure report
```
Jira Bug tickets created for all failures (if approved).
Confluence page updated with summary report (if approved).

After Confluence publish is confirmed, run:
```
openspec archive openspec/changes/test-{JIRA-KEY}
```
to move the spec folder to `openspec/changes/archive/`.

Also update `test-registry/feature-map.md`:
- Set status to `✅ Covered` (if Pass Rate ≥ 80%) or `❌ Failed` (if Pass Rate < 80%).
- Update `Last Tested` column with today's date.

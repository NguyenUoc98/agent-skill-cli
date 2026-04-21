---
name: test-planning
description: QA Strategy, Workflow Orchestration, and Execution Setup across the testing lifecycle.
origin: QA
---

# Test Planning and Execution Workflow

This skill guides QA Specialists in defining test strategies, configuring environments, and orchestrating the End-to-End testing lifecycle from planning to bug reporting. It serves as the master workflow governing how tests are conducted and managed.

## When to Use

- When initiating testing for a new feature or sprint based on PRD.
- To establish the test environment boundaries and testing scope (API vs UI).
- To orchestrate the active execution loops during a sprint, integrating with test frameworks and reporting tools (like Jira and Confluence).

## How It Works

As a QA Specialist, your mission is to protect quality by enforcing a strict testing lifecycle. You operate on the **Local-First (Internal Document Storage) and Handoff via Integrations** principle.

### 1. Context & Scope
- **Primary Tools**: You will use the **Playwright MCP** to execute UI/E2E interactions, and the **mcp-atlassian** to log issues/summaries.
- **Local Documents**: All Test Plans, Scenarios, and Run results must be stored locally in the Workspace (e.g., `/tests`, `/e2e`, or Markdown reports).
- **Environment Targeting**: Always ensure test execution is verified against the **DEV SERVER** or Staging environment. Do not target production or unstable local endpoints unless explicitly requested.

> **WARNING:** It is strictly forbidden to execute automated test suites without prior checkpoint approval from the QA PIC.

### 2. The 4-Phase Testing Workflow (Mandatory)

For every new feature, you must strictly follow this lifecycle:

#### Phase 1: Planning & Design
1. Trigger the `test-analysis-document` skill to evaluate the PRD and Acceptance Criteria.
2. Trigger the `testcase-writing` skill to generate the detailed Test Scenarios list (using 2-2-1 rule).
3. **CHECKPOINT (PLAN REVIEW)**: Wait and report to the user:
   >*"Dear QA PIC, I have formulated the Strategy and the Test Scenarios suite. Please review to ensure coverage before proceeding to execution."*

#### Phase 2: Execution & Validation via Playwright
1. Configure your Playwright MCP environment / scripts to target the DEV SERVER.
2. Execute the approved Test Scenarios using Playwright MCP tools (`browser_navigate`, `browser_click`, `browser_fill_form`, etc.).
3. Monitor the DOM interactions, accessibility snapshots, or console messages against the expected standard outputs.

#### Phase 3: Bug Reporting
1. If any testcase fails or an automation log throws errors, log it as an issue. If `mcp-atlassian` is available, call `create_jira_issue`.
2. **Issue Format**: `[Bug] <Short error name containing Impact level (P0-P3)>` (Issue Type: Bug).
3. **Body Standard**: Must include Environment, Steps to Reproduce, Expected Output, and Actual Output (including screenshots or logs).

#### Phase 4: Sprint Closure
1. At the end of the testing loop, aggregate the `% Test Pass` vs `% Fail` data.
2. Generate a "Test Summary Report / QA Evaluation" and outline testing outcomes to be shared with the team (e.g., via Confluence).
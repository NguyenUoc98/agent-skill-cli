---
name: test-planning
description: QA Test Planning and Execution Workflow using TestSprite, Jira, and Confluence.
origin: QA
---

# Test Planning and Execution Workflow

This skill guides QA Specialists in creating standard Test Plans, ensuring maximum system coverage, executing tests on DEV environments, and effectively logging issues in Jira using a structured local-first approach.

## When to Use

- When starting testing for a new feature based on its PRD or Acceptance Criteria.
- When generating a structured Test Plan or designing a suite of test scenarios.
- When running active execution loops during a sprint, ranging from API to UI components.
- When logging, reporting bugs, and generating sprint test summaries via integrations.

## How It Works

As an independent QA/QC Specialist, your mission is to protect quality by creating test scenarios and maximizing system coverage through tests (E2E, API Black-box, Web UI Tests).

> **WARNING:** It is strictly forbidden to execute test flows automatically without prior approval from the QA PIC.

### 1. Primary Tools
- **TestSprite MCP**: Supports source code analysis (repo), creates "Test Plans" (Test Scenarios list), and acts as a tool for executing tests.
- **mcp-atlassian**: Supports exporting test summaries or logs to Confluence and automatically creating Bug Issues in Jira.

### 2. Context (Scope & Data Sources)
You operate on the **Local-First (Internal Document Storage) and Handoff via Jira/Integrations** principle:

- **Internal Documents (Local Workspace files)**: Your primary workspace.
  - **Test Plan & Test Cases**: Markdown or CSV/Excel files listing test scenarios, stored physically in the Tester project.
  - **API Specifications**: Local OpenAPI specs (Swagger), Postman Collections.
  - **Bug Reports (QA Reports)**: Report templates or Automation logs generated locally.
  - **Automation Source Code**: The entire directory containing test source code (e.g., `/tests` or `/e2e`).
- **Handoff via Tools (Handoff Integrations)**:
  - **Jira MCP**: Gather Input (Requirement, AC, Design Tokens) from Jira Tickets. Provide Output by creating/updating Bug Tickets. (Strictly forbidden to draft massive Test Plans inside Jira).
  - **Test Management Tools** (TestRail, Zephyr): Update final results.
  - **TestSprite MCP**: Support local test scenario execution.

### 3. Test Scenario Generation Standard (The 2-2-1 Rule)

Your FIRST step is planning based on the "Acceptance Criteria" provided by the PO ROLE.
For EACH Feature (Acceptance Criteria), you must outline at MINIMUM:

- **2 Positive Scenarios**: (Happy path - Success flows, e.g., code `200 OK`, valid login).
- **2 Negative Scenarios**: (Input errors, validation errors `400 Bad Request`, authority denial `401 Unauth`).
- **1 Edge Case**: (Unpredictable system behavior, massive payloads mimicking DoS, special characters XSS / SQL Injection, processing Timeout errors).

*NOTE: All generated cases must be structured and presented in a SUMMARY TABLE.*

### 4. Execution Workflow (Mandatory)

#### Phase 1: Test Planning
1. Read the PRD from Confluence/Jira (the approved version with Acceptance Criteria). 
2. Use TestSprite to create a Test Scenarios table (Plan) according to the "2-2-1" standard above for internal APIs or Web Pages.
3. **CHECKPOINT (PLAN REVIEW)**: 
   >*"Dear QA PIC, I have finished the test scenarios suite (my Testcases table). Please review it to see if it provides sufficient coverage before I attach the tools for practical execution."*

#### Phase 2: Execution on Dev Server
1. Configure TestSprite (Environment Variable `BASE_URL`) to point the URL environment to the **DEV SERVER** (Strictly follow QA PIC instructions - do not use local unless requested).
2. Proceed to run the entire test plan (`testsprite_generate_code_and_execute`).

#### Phase 3: Bug Reporting
1. If any Testcase fails, the Tester immediately and automatically uses the Jira Atlassian MCP. Call `create_jira_issue` to create an Issue Type of `Bug`.
2. Issue Name Format: `[Bug] <Short error name containing Impact level (P0-P3)>`.
3. Issue Body (Description) format must conform to the Reporter Standard:
   - Environment (e.g., Dev Server Staging v1.2)
   - Steps to Reproduce
   - Expected Output vs Actual Output (Theoretical content vs Actual recording/Screenshot reported by TestSprite).

#### Phase 4: Sprint Closure
1. Aggregate `% Test Pass` vs `% Fail` data.
2. Formally write the "Test Summary Report - End of Season Evaluation" and publish this report to Confluence.

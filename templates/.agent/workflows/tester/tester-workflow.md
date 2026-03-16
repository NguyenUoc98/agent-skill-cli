---
description: Testing, planning, and Bug reporting workflow for Testers/QA.
---

# Tester Execution Workflow (Tester Workflow)

Whenever receiving a Jira Ticket for testing or when called via `/tester-workflow`, you perform these 4 steps:

### Step 1: Gather Context (Input Context)
- Use `mcp-atlassian` to Fetch information from the Jira Ticket (read Acceptance Criteria, read Design Tokens if UI testing).
- List related API Specs (Swagger/Postman) if shared on the system ticket.

### Step 2: Create 2-2-1 Plan (Local Project)
- In the Tester's project directory (e.g., `/test-cases`), generate test scenarios following the 2 Positive - 2 Negative - 1 Edge Case rule.
- Store plans and test scripts physically in the local system. Do not expose all these files on Jira.

### Step 3: Execute Automation Code (Local Execution)
- Run automated testing systems in your Test source code directory (e.g., using E2E Playwright or TestSprite MCP).
- Evaluate and save outputs (Logs, JSON reports) locally as evidence.

### Step 4: Sync Alerts (Handoff Bug to Jira)
- Only when there is a final result (Test Fail), immediately create a Bug on Jira using `mcp-atlassian`.
- Describe Steps to Reproduce and insert error Logs or copy Screenshot results from the local directory. Link the Bug to the parent Ticket.

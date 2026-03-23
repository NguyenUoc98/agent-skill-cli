---
description: Testing, planning, and Bug reporting workflow for Testers/QA.
---

# Tester Execution Workflow (Tester Workflow)

Whenever receiving a Jira Ticket for testing or when called via `/tester-workflow`, you perform these 6 steps:

### Step 1: Gather Context (Input Context)
- Use `mcp-atlassian` to Fetch information from the Jira Ticket (read Acceptance Criteria, read Design Tokens if UI testing).
- List related API Specs (Swagger/Postman) if shared on the system ticket.

### Step 2: Create 2-2-1 Plan (Local & Cloud)
- In the Tester's project directory, organized by Task (e.g., `/test-cases/{Jira-Key}/plan.md`), generate test scenarios following the 2 Positive - 2 Negative - 1 Edge Case rule.
- Store plans and test scripts physically in the local system under the Task-specific folder.

### Step 3: CHECKPOINT (Plan Review)
- Before creating a Jira Sub-task, you **MUST** pause and confirm with the QA PIC: 
  > *"Gửi QA PIC, tôi đã chuẩn bị xong bộ test case và kế hoạch test (2-2-1). Vui lòng xem xét trước khi tôi tạo Sub-task và bắt đầu thực hiện."*

### Step 4: Create Sub-task & Sync to Jira
- Once the plan is approved, use `mcp-atlassian` to create a **Sub-task** in the original Jira task (e.g., "Test Cases & Execution Plan").
- **MANDATORY**: The Sub-task's description **MUST** include the full content of the Test Cases (2-2-1 scenarios) and the Test Plan details for cloud visibility.
- Provide the generated set of test scenarios as a description or a comment on this newly created sub-task.

### Step 5: Execute Automation Code (Local Execution)
- Run automated testing systems in your Test source code directory (e.g., using E2E Playwright or TestSprite MCP).
- Evaluate and save outputs (Logs, JSON reports) locally as evidence.

### Step 6: Sync Alerts (Handoff Bug to Jira)
- Only when there is a final result (Test Fail), immediately create a Bug on Jira using `mcp-atlassian`.
- Describe Steps to Reproduce and insert error Logs or copy Screenshot results from the local directory. Link the Bug to the parent Ticket.

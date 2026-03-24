---
description: Spec-Driven Development (SDD) using the official OpenSpec tool.
---

# Developer Execution Workflow (OpenSpec Official Workflow)

This project strictly utilizes the **Official OpenSpec framework** (`@fission-ai/openspec`) to manage the AI Spec-Driven Development (SDD) process. 

**CRITICAL RULE FOR AI:** 
Even if the user simply says "Thực hiện task TAP-1" or "Code chức năng Đăng nhập" without mentioning `/opsx`, **YOU MUST AUTOMATICALLY TRIGGER THE OPENSPEC WORKFLOW**. You are FORBIDDEN from writing source code immediately.

## Workflow Phases

### Phase 1: Establish the Spec (Thuyết minh & Thiết kế kỹ thuật)
When receiving a task (via Jira Ticket or direct prompt), you must act as if the user typed `/opsx:propose [Task-Key]`.

- You will automatically generate or update a folder at `openspec/changes/[Task-Key]/`.
- You must draft the 4 required artifacts within that folder:
  1. `proposal.md` - Why we're doing this, what's changing.
  2. `specs/` - Requirements and scenarios.
  3. `design.md` - Technical approach.
  4. `tasks.md` - Implementation checklist. **CRITICAL TDD REQUIREMENT: Each logical feature MUST be broken down into strict TDD steps in the checklist: `[ ] Write failing test (RED)`, `[ ] Implement minimum code to pass (GREEN)`, and `[ ] Refactor`.**
- After generating these files, STOP and ask the user to review them via `/opsx:apply`.

### Phase 2: Implementation (Tiến hành Code - TDD MANDATORY)
- **Command**: `/opsx:apply`
- When you receive this command, you will start implementing the code strictly following the checklist in `tasks.md`.
- 🔴 **TDD REQUIREMENT (MANDATORY)**: You MUST follow the **TDD Workflow (RED-GREEN-REFACTOR)** for EVERY implementation task. You are FORBIDDEN from writing implementation code before tests.
    1. **RED**: Write the failing test FIRST based on the spec/task.
    2. **GREEN**: Write the minimal code to make the test pass.
    3. **REFACTOR**: Improve the code while keeping tests green.
- As you complete portions of the work, mark off items in the `tasks.md` internal memory.
- **MANDATORY**: Upon completing the backend implementation, you MUST document the new or updated APIs:
    1. Create or update an API Specification page on **Confluence** (using `atlassian-mcp-server_createConfluencePage` or `updateConfluencePage`).
    2. Add a comment to the corresponding **Jira ticket** (using `atlassian-mcp-server_addCommentToJiraIssue`) containing the direct link to the Confluence API Documentation page so the frontend team can implement their side.

### Phase 3: Archive & Continuous Updates
- **Command**: `/opsx:archive`
- Move the feature to `openspec/changes/archive/[date]-[feature-name]/`.
- Specs must be updated to ensure the AI's prompt rules (e.g., inside `.cursorrules` or `.clinerules` that OpenSpec generates) remain accurate. This ensures the Agent avoids hallucinations in future tasks.

---

## 🛠️ Setup Instructions (For User/Dev)
If OpenSpec is not yet initialized in this project, run the following commands in the terminal:
```bash
npx @fission-ai/openspec@latest init
openspec update
```
This forces the AI coding assistants (Cursor, Copilot, Cline, etc.) to load the OpenSpec workflow rules.

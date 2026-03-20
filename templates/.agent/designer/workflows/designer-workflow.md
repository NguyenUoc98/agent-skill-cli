---
description: UI/UX design and Design Token extraction workflow for Designers.
---

# Designer Execution Workflow (Designer Workflow)

Whenever receiving a Jira Ticket or when called via `/designer-workflow`, you **MUST** perform these steps:

### Step 1: Gather Requirement Context (Fetch Context)
- Use `mcp-atlassian` to read the Jira Issue to retrieve Acceptance Criteria and the link to the PRD on Confluence. Do not invent requirements.

### Step 2: Establish Internal Design System (Local Project)
- In your workspace (Designer project directory), set up and store Design Tokens (Colors, Typography, Spacing).
- Create and export images (mockups) and guidelines as static files stored in Task-specific directories (e.g., `/projects/{Jira-Key}/assets/`).

### Step 3: Design Handoff & Sync to Cloud (Handoff Product)
- Once local mockups and Guidelines are finalized, you **MUST** publish the results directly into Jira:
- **Jira Sub-task Creation & Documentation**: 
    1. Create a **Sub-task** (e.g., "Design Assets & UI Specs") under the main Story.
    2. **MANDATORY**: Write the complete **Design Specification** directly into the **description** of this Sub-task. Include:
        - Layout descriptions, structured Design Tokens, and interaction guidelines (Hover, Active, etc.).
        - Link to the **Stitch project** if any.
    3. **Mockup Assets**: Upload all generated mockup images (from nano banana) specifically to this Sub-task.
- **Handoff Signal**: Change the Jira Issue status to **"Ready for Dev"** or **"To Do"** (if it was in "In Design") to trigger the Developer agents.

### Step 4: UI Audit (Quality Check)
- When Developers complete a UI task, you may be called to perform a UI Audit.
- Compare the implementation with the Design Spec and Design Tokens.
- If there are discrepancies, use `mcp-atlassian` to create a **Bug** or add a descriptive comment on the Jira ticket for the Developer to adjust.

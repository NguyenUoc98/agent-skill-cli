---
description: UI/UX design and Design Token extraction workflow for Designers.
---

# Designer Execution Workflow (Designer Workflow)

Whenever receiving a Jira Ticket or when called via `/designer-workflow`, you **MUST** perform these steps:

### Step 1: Gather Requirement Context (Fetch Context)
- Use `mcp-atlassian` to read the Jira Issue to retrieve Acceptance Criteria and the link to the PRD on Confluence. Do not invent requirements.

### Step 2: Establish Internal Design System (Local Project)
- In your workspace (Designer project directory), set up and store Design Tokens (Colors, Typography, Spacing).
- Create and export images (mockups) and guidelines as static files stored in directories such as `/assets`, `/design-system`.

### Step 3: Share Context as Product (Artifact Handoff)
- Once local configuration is complete, you may then communicate externally.
- Use `mcp-atlassian` to Comment directly on the Jira Ticket. The comment must contain a clear formatted structure of the Design Tokens (JSON/CSS format) or a direct link to the exported Assets files so the Dev Agent can download/read them.

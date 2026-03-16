---
description: Requirements gathering and task decomposition workflow for PO/BA, establishing the root context for the entire project.
---

# PO/BA Execution Workflow (PO/BA Workflow)

Whenever receiving a Feature or Epic, or when called via `/po_ba-workflow`, you **MUST** perform these 3 steps:

### Step 1: Initialize Requirements Documentation (Local PRD)
- Begin all analysis by creating a Markdown file in your internal working directory (e.g., `/prds/feature_name.md`).
- Draft and save changes to the PRD, Acceptance Criteria (AC), and User Flow in this workspace as personal drafts.

### Step 2: Sync to Confluence & Jira (Handoff Product)
- Once the internal PRD document is finalized, ONLY USE `mcp-atlassian` to publish (announce) the final product.
- Create a Page on Confluence with the finalized PRD content.
- Create Jira Issues (User Stories) representing that PRD. Copy the Acceptance Criteria (for Dev/Tester input context) into the Ticket Description. Strictly forbidden to draft on Jira.

### Step 3: Handoff
- Notify the PIC (Designated Authority) for approval.
- Change the ticket status on Jira to "To Do" or "Ready for Design/Dev" as a trigger signal for other Agents.

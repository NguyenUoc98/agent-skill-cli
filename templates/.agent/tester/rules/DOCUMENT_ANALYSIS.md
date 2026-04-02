---
name: document_analysis
description: QA Document Analysis Rules
trigger: always_on
---

# QA Document Analysis Rules

This document defines the mandatory rules and principles for analyzing requirements and documents before commencing any testing activities.

---

# 1. Understand Correctly Before Testing

- **Identify**: Business goal, target user, and value provided.
- **Mandatory action**: You MUST carefully read the task description and OPEN ALL attached document links (such as PRD on Confluence, UI designs, API specs...) before proceeding with the analysis.
- **Principle**: If you do not clearly understand the system/feature → Absolutely do NOT start testing.

---

# 2. All Requirements Must Be Clear

- **Standard**: Must clearly identify `Input` – `Process` – `Output`.
- **Principle**: Do not accept generic or vague document descriptions.

---

# 3. Always Cover Fully

- **Scenarios**:
  - Happy path (Successful smooth flow).
  - Edge case (Boundary limits).
  - Error/Exception (Errors or exception cases).
- **Principle**: Must have comprehensive coverage; do not test only the main flow.

---

# 4. Do Not Accept Contradictions

- **Check consistency**: Always cross-check between `Doc` ↔ `UI` ↔ `API`.
- **Principle**: If there is any conflict → Immediately **clarify** with the relevant parties.

---

# 5. Prioritize by Risk

- **Focus** on areas such as:
  - Complex business logic processing.
  - Critical flows (related to `money`, `data`, `permission`).

---

# 6. Requirements Must Be Testable

- **Standard**: There must be a clear **expected result** for comparison.
- **Principle**: If it cannot be measured → It means it cannot be tested.

---

# 7. Do Not Assume

- **Principle**: If things are not smooth or unclear → Must ask the BA/PM/Dev again.
- **Note**: Any "Maybe/Possible" phrasing in the Spec = Insufficient data to be included in the Test suite.

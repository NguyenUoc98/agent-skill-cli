---
description: Feature development execution workflow for the Developer role, adhering to SOLID principles, TDD design, and Design Patterns (Repository).
---

# Technical Expert Execution Workflow (Dev Workflow)

Whenever receiving a Task (User Story/New Feature) or when called via the `/dev-workflow` command, you **MUST** perform exactly these 4 professional steps before handoff. No skipping steps.

---

### Step 1: System Context Analysis
Do not rush into coding. Use source code reading tools to understand the big picture:
- Identify the **target Module** (Does the project use MVC or Microservices?).
- List related existing components: `Routes`, `Controllers`, `Models`, `Policies`, `Services`, and `Repositories`.
- Review Dependencies (e.g., Does the project use ClickHouse, Redis, or any 3rd party APIs?).

### Step 2: Proposed Short Plan
Present a system design draft to the Lead Dev PIC before typing:
- **Business Flow**: Briefly describe how data moves from Request to Database.
- **File Changes**: List exactly which files will be modified and which will be created.
- **Architectural Justification**:
  - Based on **SOLID Principles**, explain why this structure was chosen (e.g., Separating Services to adhere to Single Responsibility - SRP; Using Interfaces for Repositories for Dependency Inversion - DIP).
  - Confirm the roadmap won't generate unnecessary "Layers" (Ensuring pragmatism).
- **TDD Strategy**: Outline 2-3 Unit/Feature Test scenarios to serve as the backbone.

> **CHECKPOINT 1**: Stop here.
> *"Dear Lead Dev PIC, I have completed the Context & Short Plan report for this Task. The plan adheres to SOLID and the Repository Pattern. Please review it before I begin the TDD loop."*

### Step 3: Source Code Execution (The TDD Loop)
Only after Plan approval, proceed with the strict TDD loop:
1. **Red Phase**: Write test code (Feature/Unit Test) according to the Acceptance Criteria. Target the Repository Interface level.
2. **Green Phase**: Implement logic in Controller & Repository. 
   - **Strictly no abbreviations, no placeholders** (like `// add logic here`). Write complete, executable code.
   - Maintain absolute consistency in Naming Conventions and Folder Structure.
3. **Refactor Phase**: Optimize Clean Code standards, consolidate duplicate logic, and ensure the current tests remain passing.

### Step 4: Verification & Re-testing (Checklist & Edge Cases)
After the TDD loop is complete and code is "Green", finalize the task with an internal verification report:
- Clearly state quick test steps (CLI Feature test syntax or manual API Curl tests).
- **Edge Case Risk Analysis**: List anomalous flows that have been handled (try/catch). For example: 
  - Massive data payloads.
  - Abrupt DB connection loss (e.g., ClickHouse network timeout).
  - Input data from partners (like TikTok/Facebook) being Null or having changed JSON structures.

> **CHECKPOINT 2 (COMPLETION)**:
> *"Dear Lead Dev PIC, all source code for this Task has been implemented (100% Tests Pass). I have handled Edge Cases regarding [Edge Case Name]. Please Review Code before handing over the branch to the Tester."*
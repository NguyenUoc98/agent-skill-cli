---
name: testcase-writing
description: QA Skills for Effective Test Case Design — ISTQB Techniques + 2-2-1 Coverage Rule, optimized for Playwright MCP execution.
origin: QA
---

# Test Case Writing

This skill describes the knowledge areas and practices required to design effective, efficient, and executable test cases — combining ISTQB design techniques with the mandatory 2-2-1 coverage baseline.

## When to Use

- When breaking down Acceptance Criteria (AC) into actionable Test Scenarios.
- When reviewing or updating existing test cases.
- When formulating testing strategies for complex functionalities and state transitions.
- Before beginning active test execution via Playwright MCP.

## How It Works

### 1. Test Design Techniques (ISTQB)

Apply the appropriate technique based on the nature of the feature under test:

| Technique | When to Apply |
|---|---|
| **Equivalence Partitioning (EP)** | Input fields with large value ranges — group valid/invalid partitions, test one representative per group. |
| **Boundary Value Analysis (BVA)** | Numeric fields, string length, date ranges — test at `min`, `min+1`, `max-1`, `max`. |
| **Decision Table Testing** | Multi-condition business logic (e.g., promotions, role-based access) — enumerate all condition combos. |
| **State Transition Testing** | Workflow entities with lifecycle states (e.g., `pending → confirmed → shipped`) — cover valid and invalid transitions. |
| **Use Case / Scenario Testing** | End-to-end user journeys derived from Acceptance Criteria. |

> **NOTE:** For any given feature, identify *which* techniques apply first before writing cases. A form with numeric inputs needs BVA. A checkout flow needs State Transition. A permissions matrix needs a Decision Table.

---

### 2. The 2-2-1 Baseline Rule (Mandatory Minimum)

Regardless of which technique(s) you apply, every Acceptance Criteria block MUST produce at minimum:

- **2 Positive Scenarios**: Happy-path success flows (e.g., valid inputs → `200 OK`, successful login).
- **2 Negative Scenarios**: Input validation errors, unauthorized access, malformed requests (`400`, `401`, `403`).
- **1 Edge Case**: Boundary limits, XSS/SQL injection strings, extreme payloads, timeout behavior.

> **WARNING:** This is the quality gate minimum. Complex features will require more cases using the techniques above.

---

### 3. Negative Testing Mindset

Actively attempt to break the system by:
- Providing invalid or malformed inputs (empty, null, oversized, wrong type).
- Executing actions in an incorrect or reverse order.
- Attempting unauthorized or out-of-role operations.

---

### 4. Output Format (Playwright-Ready)

All generated cases must be structured in a **SUMMARY TABLE** (stored locally as Markdown or `.csv`).

Required columns:
- `Test_ID`
- `Type` (Positive / Negative / Edge)
- `Technique` (EP / BVA / Decision Table / State Transition / etc.)
- `Scenario_Title`
- `Pre_conditions`
- `Steps` *(specific and Playwright-executable — see below)*
- `Expected_Result` *(clear, observable assertion)*

#### Writing Playwright-Executable Steps

Because tests will be run via **Playwright MCP**, steps must be concrete and actionable:

- ❌ **Too vague**: "Login to the system."
- ✅ **Playwright-ready**: "Navigate to `/login`. Fill `#email` with `user@test.com`. Fill `#password` with `secret123`. Click `button[type=submit]`. Wait for URL to become `/dashboard`."

Assertions must also be tangible:
- ❌ **Bad oracle**: "User should see an error."
- ✅ **Good oracle**: "Element `.error-message` is visible and contains text `Password must be at least 8 characters`."

#### State Isolation

Each test case must be fully independent. Assume browser context or application state may reset between scenarios. Define `Pre_conditions` explicitly (e.g., "User is logged in as role `admin`", "Cart has 3 items").

---

### 5. Traceability

Every test case must be traceable back to its source requirement or Acceptance Criteria. Use `Test_ID` to link:
```
AC-01 → TC-001, TC-002, TC-003, TC-004, TC-005
```

---

### 6. Review & Handoff

Once the Testcase table is fully populated, it is handed back to the `test-planning` orchestrator for QA PIC review before Playwright execution begins.
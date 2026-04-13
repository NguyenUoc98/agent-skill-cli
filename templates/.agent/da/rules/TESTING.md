# Universal Backend Testing & TDD Rules

This document outlines the STRICT enforcement rules for Test-Driven Development (TDD) execution and Test Quality for ALL Backend development, regardless of the framework or language (e.g., Laravel, FastAPI, NestJS, Spring Boot).

## 1. The Core TDD Lifecycle & User Review Contract (HARD RULE)

For each architectural layer (Controller → Service → Repository), you MUST follow this exact sequence:

1. **RED Phase (Write Tests First):** Define and write the failing tests before writing ANY production logic.
2. **Execute & Prove:** Run the tests using the appropriate framework command (e.g., `pytest`, `phpunit`, `jest`) via `run_command` to verify they fail. Show the failure logs.
3. **Summarize and Document:** If the number of tests is large, a brief chat summary is insufficient. You MUST create a detailed Test Report documenting the exact test plan, test cases, inputs, and logic you just wrote.
   - **File Location:** Save this file to `blueprint/[report-slug]/05-test-plan.md` (or similar depending on the module).
   - **Content:** The file must contain a full markdown table explaining ALL tests (Name, Scenario, Input, Validation Logic).
   - After saving the file, you MUST provide a short summary in the chat exactly in this format:

   - **Test Type Distribution:**
     | Group | Type | Count | % |
     |------|------|----------|---|
     | Schema validation | Unit | 4 tests | 100% |

   - **Test Report Link:** `[Link to the generated test plan file]`

4. **STOP YOUR COMPLETION:** Ask the user: "I have written the tests and generated the detailed Test Plan document (linked above). The tests are currently returning a FAIL result (see logs). Could you please review the document to ensure all business scenarios and edge cases are covered before I proceed to write the implementation logic (GREEN)?"
5. **Wait for Approval:** Do NOT generate implementation code in the same response. You MUST yield.
6. **GREEN Phase:** Only after user approval, implement the minimum code to make tests pass.
7. **Refactor:** Clean up the code according to SOLID principles.
8. **Final Test Report Update:** After the features are implemented and all tests successfully pass, you MUST update the previously created Test Plan document. Append a "Final Execution Results" section marking the successful completion (PASS) of all test cases, creating a living documentation of the test outcomes.

---

## 2. Test Scope Boundaries & SUT Focus (MANDATORY)

- **Test Type Distribution**: Prioritize Unit Tests (70%), Integration/Feature Tests (30%).
- **System Under Test (SUT) Isolation (For Unit Tests)**:
  - Unit tests MUST focus strictly on the specific function/method being tested.
  - If the SUT calls external functions/services, you MUST use Mocks/Fakes/Stubs. Do not test dependencies.
- **Functions to Unit Test**: Focus ONLY on functions containing business logic, aggregations, or complex conditional mechanics.
- **Functions to SKIP (DO NOT TEST)**:
  - Simple Getters/Setters.
  - "Pass-through" functions (just calling another and returning).
  - Framework glue / boilerplate code.
  - Purely technical, very small private functions.
  - Extremely simple DTOs / APIs Resources / Base models without custom validators.

---

## 3. Test Case Planning (MANDATORY BEFORE CODE)

Before writing any test code, you MUST mentally cover ALL scenarios:
- Happy path
- Edge cases
- Failure cases

---

## 4. Edge Case & Boundary Coverage (MANDATORY)

Every feature MUST include tests for:
- `Null` / `None` / `undefined` inputs.
- Empty values (empty arrays, strings, collections).
- Invalid formats (wrong date format, invalid UUID, wrong types).
- Boundary values (min/max limits, zero, negative).
- Unexpected payloads.
Agent MUST actively attempt to break the logic.

---

## 5. Branch Coverage (MANDATORY)

You MUST cover ALL logical branches:
- `if / elseif / else` conditions.
- Exception paths (`try / catch / except` blocks).
Coverage Target: >= 90%. High coverage with low-quality assertions is NOT acceptable.

---

## 6. Mocking Rules & Constraints (STRICT)

**For Unit Tests:**
- **All external dependencies MUST be mocked:**
  - Database calls / ORM interactions.
  - External API/HTTP calls.
  - Message queues and Third-party services.
- **Forbidden:** Real database/network access in strictly defined Unit Tests.

**For Integration / Feature Tests:**
- **DO NOT Mock the Database:** You must test against a real, distinct, ephemeral Test Database (using Transactions that rollback after each test).
- **DO Mock Third-party Over-the-wire APIs:** Examples: Stripe, SendGrid, external Cloud endpoints. Never make actual HTTP requests to 3rd party providers in the test suite.

---

## 7. Assertion Quality (MANDATORY)

Assertions MUST:
- Validate real outputs, JSON payload formats, or side effects (e.g., variable states).
- Be specific and meaningful.
**Forbidden:**
- Weak or trivial assertions (e.g., `assertTrue(true)`, `assert 1 == 1`).
- Over-reliance on checking if a mock was called WITHOUT validating the parameters passed or the final return data.

---

## 8. Universal Layer Testing Strategy

Regardless of framework, enforce testing responsibilities:
- **Presentation Layer (Controller/Router):** Test API contracts, payload schemas (validation rules), HTTP status codes, and authorization middleware.
- **Business/Service Layer:** PRIMARY unit test target. Focus heavily on data transformation, math, business rules, filtering, and cross-module mechanics.
- **Data Access Layer (Repository/DAO):** MUST be mocked in service tests. If tested independently, test against a distinct ephemeral/in-memory DB.

---

## 9. Integration & Feature Testing Rules

When building Integration Tests (testing the full request lifecycle from Router -> Service -> Database):

1. **Test Database Constraints (STRICT):**
   - You MUST NEVER interact with the main development or production database.
   - Use a dedicated Test Database if the framework supports it configured natively (e.g., Laravel's `phpunit.xml` or FastAPI's detached test DB).
   - If the project does not have a clear Test DB connection configured, **STOP AND ASK THE USER** to provide a test DB connection URI before proceeding with the execution.

2. **Data Preparation & User Confirmation (Strict Seeding):**
   - Do not rely on existing data. You MUST explicitly write code to create mock records into the test DB.
   - **MANDATORY CONFIRMATION:** Before running the integration test or inserting any test data into the DB, you MUST formulate the exact Mock Dataset you plan to seed (the input state) and the Expected Output. **STOP TO ASK THE USER:** "Does this mock dataset correctly and sufficiently represent the business logic and edge cases?". Only proceed to insert and run tests AFTER user approval.
   - Clean up (rollback or truncate) the test DB data during teardown to avoid state leakage between tests.

3. **Assertions MUST check (Strict Mathematical/Business Accuracy):**
   - The final HTTP Response Code (e.g., 200, 201, 400, 403).
   - **Exact Data Values, NOT Metadata:** You MUST assert the exact calculated numerical values and business metrics based on your mocked inputs. **FORBIDDEN:** Relying solely on trivial assertions like "total output rows" (`len(results) == X`), or "checking if fields exist" (`"revenue" in output`). If your mocked input consists of 3 orders worth $50 each, your assertion MUST explicitly verify that `total_revenue == 150`.
   - **Database State Mutations:** If it's a POST/PUT/DELETE logic, you MUST query the test database inside the test to assert the record was actually created/modified/deleted correctly.

---

## 10. Agent Thinking Model & Anti-Patterns

Before writing tests, you MUST think:
- What can break this logic?
- What inputs are invalid?

**Strict Anti-patterns (FORBIDDEN):**
- Writing implementation BEFORE tests.
- Writing test and logic in the exact same LLM turn.

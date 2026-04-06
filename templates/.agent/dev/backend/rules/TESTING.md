# Backend Testing & TDD Rules

This document outlines the STRICT enforcement rules for Test-Driven Development (TDD) execution and Test Quality for Backend development.

## 1. Strict TDD Execution (NO EXCEPTIONS)

For every implementation:

- You MUST write tests BEFORE writing any production code
- Each test MUST fail first (RED phase)
- Only write the MINIMUM code required to pass (GREEN phase)
- Refactor only after tests pass

Forbidden:
- Writing production code before tests
- Writing multiple tests at once without execution
- Skipping the RED phase

---

## 2. Test Scope Boundaries & SUT Focus (MANDATORY)

- **Test Type Distribution**: Prioritize Unit Tests (80%) over Feature Tests (20%).
- **System Under Test (SUT) Isolation**:
  - Unit tests MUST focus strictly on the SUT (the specific function/method being tested).
  - Tests must be completely independent. Only test the logic that belongs to the body of the function.
  - If the SUT calls any other external function, class, or service, you MUST use Mocks or Fakes. Do not test the behavior of dependencies.
- **Functions to Unit Test**: Focus ONLY on functions containing actual business logic or complex conditional mechanics.
- **Functions to SKIP (DO NOT TEST)**: You MUST NOT write unit tests for the following trivial components:
  - Simple Getters / Setters
  - "Pass-through" functions (functions that just call another function and return)
  - Framework glue / boilerplate code
  - Purely technical, very small private functions
  - Functions strictly used for log / debug / telemetry
  - Extremely simple DTOs / APIs Resources / Mappers
  - Trivial constant wrappers / helpers

---

## 3. Test Case Planning (MANDATORY BEFORE TEST CODE)

Before writing any test code, you MUST:

1. List all test cases in plain text
2. Cover ALL scenarios:
   - Happy path
   - Edge cases
   - Failure cases

You MUST NOT proceed to writing test code until test cases are clearly defined.

---

## 4. Edge Case & Boundary Coverage (MANDATORY)

Every feature MUST include tests for:

- null inputs
- empty values
- invalid formats
- boundary values (min/max)
- unexpected inputs

Agent MUST actively attempt to break the logic.

---

## 5. Branch Coverage (MANDATORY)

You MUST cover ALL logical branches:

- if / else conditions
- switch cases
- exception paths

Example:
if ($user && $user->isActive())

Required tests:
- user = null
- user inactive
- user active

---

## 6. Test Design Principles

Tests MUST:

- Validate behavior (NOT implementation details)
- Be deterministic and isolated
- Have clear, meaningful assertions

Avoid:
- Testing private/internal methods
- Trivial assertions (e.g. assertTrue(true))
- Asserting mocked behavior instead of real outcomes

---

## 7. Mocking Rules (STRICT)

- All external dependencies MUST be mocked:
  - Database
  - API calls
  - Third-party services

- Unit tests MUST focus ONLY on business logic

Forbidden:
- Real database access in unit tests
- Real external API calls

---

## 8. Assertion Quality (MANDATORY)

Assertions MUST:

- Validate real outputs or side effects
- Be specific and meaningful

Forbidden:
- Weak or generic assertions
- Over-reliance on mocks without validating results

---

## 9. Self-Validation Step (MANDATORY)

After writing tests, you MUST verify:

- Do tests FAIL if logic is incorrect?
- Are ALL branches covered?
- Are edge cases included?
- Are assertions meaningful?

If any answer is NO → you MUST improve tests before continuing.

---

## 10. Coverage Requirement

- Target coverage: >= 90%
- MUST include:
  - Branch coverage
  - Edge case coverage

High coverage with low-quality tests is NOT acceptable.

---

## 11. Layer Testing Strategy (Laravel)

- Controller: test API contract only
- Service: PRIMARY unit test target
- Repository: MUST be mocked

Testing priority:
Service Layer > Controller > Repository

---

## 12. TDD Execution Contract (HARD RULE)

During `/opsx:apply`:

For EACH layer (Controller → Service → Repository):

1. Write failing test (RED)
2. STOP and request approval
3. Only after approval → implement (GREEN)
4. Refactor

You are FORBIDDEN from skipping approval checkpoints.

---

## 13. Anti-Patterns (STRICTLY FORBIDDEN)

- Writing implementation before tests
- Skipping edge cases
- Writing large, unfocused tests
- Using real DB in unit tests
- Ignoring failing tests
- Writing tests AFTER implementation

---

## 14. Agent Thinking Model (MANDATORY)

Before writing tests, you MUST think:

- What can break this logic?
- What inputs are invalid?
- What edge cases exist?
- What branches are untested?

If you cannot answer → DO NOT write code yet.

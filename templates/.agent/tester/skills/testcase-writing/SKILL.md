---
name: testcase-writing
description: QA Skills for Effective Test Case Design in Antigravity (ISTQB-Aligned), covering requirement analysis, test design techniques, and test oracles.
origin: QA
---

# Test Case Writing

This skill describes the knowledge areas and practices required for a QA engineer to design effective and efficient test cases according to ISTQB practices within Antigravity.

## When to Use

- When writing new test cases for product features or requirements.
- When reviewing or updating existing test cases.
- When formulating testing strategies for complex functionalities and state transitions.
- When performing risk-based testing or prioritizing test efforts.

## How It Works

Effective test case design relies on a structured approach aligned with ISTQB principles. The core process integrates multiple analytical and design skills:

### 1. Requirement Analysis
A tester must be able to understand business requirements and acceptance criteria, identify implicit and explicit rules, and extract **test conditions** from the test basis. This ensures no critical behavior is left untested.

### 2. Application of Test Design Techniques
A competent tester must know when and how to apply:
- **Equivalence Partitioning**
- **Boundary Value Analysis**
- **Decision Table Testing**
- **State Transition Testing**

Using these techniques helps reduce redundant test cases while maintaining coverage.

### 3. Risk Analysis and Prioritization
Identify components with high failure probability and evaluate the business impact of failures. This enables effective **risk-based testing** and optimal test effort allocation.

### 4. Analytical and Logical Thinking
Decompose complex requirements into smaller, testable conditions. Identify hidden constraints and dependencies between fields or actions.

### 5. Negative Testing Mindset
Actively attempt to break the system by:
- Providing invalid or malformed inputs
- Executing actions in an incorrect order
- Attempting unauthorized operations

This approach increases defect detection effectiveness.

### 6. Data Domain Knowledge
Understand valid data formats and ranges, data boundaries and constraints, and data persistence and transformation across system layers. This supports effective boundary and partition-based testing.

### 7. State and Workflow Modeling
For systems with workflows or lifecycle states, testers must:
- Identify all system states
- Map allowed and forbidden transitions
- Design tests that cover these transitions

### 8. Defining Clear Test Oracles
Define precise expected results that allow objective determination of Pass or Fail. Without clear test oracles, test execution becomes subjective and unreliable.

### 9. Maintaining Traceability and Documentation
Ensure test cases are linked to requirements, updated when requirements change, and historical changes are trackable. This supports auditability and regression testing.

### 10. Communication and Collaboration
Ask clarification questions when requirements are ambiguous, communicate defects clearly with reproducible steps, and collaborate with developers, product owners, and designers to refine requirements.

### 11. Continuous Learning and Improvement
Continuously improve skills in new testing techniques, domain knowledge, and automation tools/practices to ensure long-term test effectiveness and quality growth.

## Examples

### Test Design Technique Example (Boundary Value Analysis)
When testing an input field that accepts ages from 18 to 65:
- **Valid values:** 18, 19, 64, 65
- **Invalid values:** 17, 66

### Clear Test Oracle Example
- **Bad:** User should see an error message.
- **Good:** The system displays the error message "Password must be at least 8 characters long" in red text below the password field, and the "Submit" button remains disabled.
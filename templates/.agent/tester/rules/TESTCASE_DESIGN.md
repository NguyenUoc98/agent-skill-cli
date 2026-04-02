---
name: testcase_design
description: QA Test Case Design Rules (ISTQB-Aligned)
trigger: always_on
---

# QA Test Case Design Rules for Antigravity (ISTQB-Aligned)

This document defines the mandatory rules for designing, documenting, and maintaining test cases in the Antigravity project.  
The rules are aligned with ISTQB testing principles and terminology.

---

# 1. Test Basis and Traceability

All test cases must be derived from a defined **test basis**, which may include:
- Business requirements
- User stories
- Acceptance criteria
- API specifications
- UI/UX designs

Each test case must be traceable to at least one requirement.  
This ensures full requirement coverage and supports impact analysis when requirements change.

---

# 2. Test Design Workflow

Test case design must follow the ISTQB test design process:

**Test Basis → Test Analysis → Test Conditions → Test Case Design → Test Implementation**

Testers must:
- Identify test conditions from requirements
- Design test cases that cover those conditions

---

# 3. Use of Test Design Techniques

Test cases must be created using recognized test design techniques when applicable.

## 3.1 Equivalence Partitioning

Inputs must be divided into valid and invalid partitions where the system is expected to behave similarly.  
At least one test case must be created for each partition.

## 3.2 Boundary Value Analysis

Boundary values must be tested for all numeric and length-based inputs:
- Minimum
- Maximum
- Just below minimum
- Just above maximum

## 3.3 Decision Table Testing

If a feature contains multiple condition combinations or business rules, decision table testing must be used to ensure rule coverage.

## 3.4 State Transition Testing

If a system has defined states, test cases must cover:
- All valid state transitions
- Invalid transitions

---

# 4. Test Case Structure

Each test case must contain:

- Test Case ID
- Precondition
- Test Steps
- Expected Result
- Priority

Expected results act as **test oracles** and must clearly define pass/fail conditions.

---

# 5. Atomicity and Independence

Each test case must validate one test condition only.  
This improves defect isolation, maintainability, and automation readiness.

---

# 6. Positive, Negative, and Edge Testing

Each feature must include:
- Positive scenarios (valid inputs)
- Negative scenarios (invalid inputs or unauthorized actions)
- Edge and boundary cases

---

# 7. Coverage Criteria

The complete test suite must provide:
- Requirement coverage
- Data coverage (using partitions and boundaries)
- State and workflow coverage where applicable

---

# 8. Risk-Based Prioritization

Test cases must be prioritized based on **risk**, defined as:

**Risk = Likelihood × Impact**

High-risk areas must:
- Have more test cases
- Be tested earlier in the test cycle

---

# 9. Non-Functional Test Considerations

When requirements specify or risk indicates, test cases must be created for:

- Performance
- Security
- Usability
- Compatibility

---

# 10. Handling Requirement Gaps

If the test basis is unclear or incomplete, testers must:
- Document assumptions
- Raise clarification questions to stakeholders

Testers must not silently assume business rules.

---

# 11. Completion Criteria for Test Design

Test design is considered complete when:
- All identified test conditions are covered
- Required test design techniques have been applied
- Traceability between requirements and test cases is established
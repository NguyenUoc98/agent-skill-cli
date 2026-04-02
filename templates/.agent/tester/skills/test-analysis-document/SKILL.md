---
name: test-analysis-document
description: Document analysis skills and mindset (Requirement / Specification) for Testers to quickly grasp business needs, breakdown structure, and identify risks.
origin: QA
---

# Test Document Analysis

This skill serves as a compass to help QA/Testers extract the most effective Requirements before starting to write test cases or execute tests.

## When to Use

- When receiving new PRDs, requirements, or user stories.
- Before starting to design or write Test Cases.
- When reviewing and assessing the testability of UI/UX designs and API specifications.
- When clarifying implicit, explicit, or ambiguous requirements with PM/BA/Devs.

## How It Works

This skill focuses on 8 Core Mindsets when analyzing testing documents:

### 1. Quick Business Understanding
- **Goal**: Understand "why does this feature exist?".
- Clearly understanding the business problem right from the start acts as the guiding foundation for all subsequent testing activities.

### 2. Structured Analysis
- **Breakdown**: Analyze the system into 3 simple parts: `Input` (data), `Logic` (processing), and `Output` (result).
- **Overall flow**: Visualize the entire journey of data from the beginning until the result is produced (**End-to-End flow**) to detect errors easily.

### 3. Breakdown Mindset
When encountering a functional block, break it down into 3 basic groups:
- **Main flow**: Primary branch / Happy path.
- **Sub flow**: Secondary branch / Deviations.
- **Edge case**: Boundary limits (overload, excessive length, special cases).

### 4. Identifying Money / Data Risks
- **Perspective**: Guess and feel where bugs are most likely to occur and cause the highest impact.
- **Action**: Focus test efforts on high-risk areas instead of testing everything equally. Lead to smart, prioritized testing.

### 5. Questioning Mindset
Always ask questions to corner the system into a dilemma:
- *What if wrong input?* (Bypassing validation)
- *What if system fail?* (Network down, API dead)
- *What if user performs reverse actions?* (Clicking back, spamming clicks)

### 6. Checking Consistency
- **Comparison**: Cross-compare document flows (Paper specs ↔ Figma design ↔ API Request/Response) to sweep for mismatched points that conflict with each other.

### 7. Evaluating Testability
- **Spec Assessment**: Determine which requirements are verifiable (measurable and clear result) and which are vague (untestable).
- **Proactivity**: Feedback to the PM/BA asking for clarification (refine) and confidently "Say NO" if unclear.

### 8. Mapping & Coverage
- **Traceability**: Must generate mapping links: `Requirement` ↔ `Test Case`.
- **Result**: The ultimate goal is to never miss any logic requirement when writing Test Cases.

---
name: test-analysis-document
description: Document analysis skills and mindset (Requirement / Specification) for Testers to quickly grasp business needs, breakdown structure, and identify risks.
---

# Standard & Document Analysis Skills (Test Document Analysis)

This core skill set and mindset serves as a compass to help QA/Testers extract the most effective Requirements before starting to write test cases or execute tests.

## 8 Core Mindsets When Analyzing

### 1. 🎯 Quick Business Understanding
* **Goal**: Understand "why does this feature exist?".
* Clearly understanding the business problem right from the start will be the guiding foundation for all subsequent testing activities.

### 2. 🧩 Structured Analysis
* **Breakdown skill**: Analyze the system into 3 simple parts:
  * `Input`: (input data)
  * `Logic`: (how the system processes)
  * `Output`: (returned results)
* **Overall flow**: The tester must visualize the entire journey of data from the beginning until the result is produced (**End-to-End flow**), to know how the system works and easily detect errors.

### 3. 🔪 Breakdown Mindset
When encountering a functional block, you must break it down into 3 basic groups:
* **Main flow**: Primary branch / Happy path.
* **Sub flow**: Secondary branch / Deviations.
* **Edge case**: Boundary limits (overload, excessive length, special cases).

### 4. 🚨 Identifying Money / Data Risks
* **Perspective**: Know how to guess and feel where bugs are most likely to occur and cause the highest impact.
* **Action**: Leads to smart testing! You focus test efforts on risk areas, not testing randomly in every corner spreading effort equally.

### 5. ❓ Questioning Mindset
Always ask questions to corner the system into a dilemma:
* *What if wrong input?* (What if the input intentionally bypasses validation?)
* *What if system fail?* (What if the network goes down, or a third-party API dies?)
* *What if user performs reverse actions?* (What if the user clicks back, spams clicks continuously?)

### 6. ⚖️ Checking Consistency
* **Comparison skill**: Cross-compare document flows (Paper specs ↔ Figma design ↔ API Request/Response) to sweep for mismatched points that conflict with each other.

### 7. 🐞 Evaluating Testability
* **Spec Assessment**: Determine which Requirements are verifiable (Measurable & clear Result), and which Requirements are vague (Untestable).
* **Proactivity**: Confidently feedback to the PM/BA asking for clarification (refine), and "Say NO" if it is not clear.

### 8. 🔗 Mapping & Coverage
* **Traceability**: Must generate mapping links: `Requirement` ↔ `Test Case`.
* **Result**: The ultimate goal is to never miss any logic requirement when writing Test Cases.

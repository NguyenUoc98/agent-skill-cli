---
name: parallel-agents
description: Multi-agent orchestration patterns. Use when multiple independent tasks can run with different domain expertise or when comprehensive analysis requires multiple perspectives.
allowed-tools: Read, Glob, Grep
---

# Native Parallel Agents

> Orchestration through Antigravity's built-in Agent Tool

## Overview

This skill enables coordinating multiple specialized agents through Antigravity's native agent system. Unlike external scripts, this approach keeps all orchestration within Antigravity's control.

## When to Use Orchestration

✅ **Good for:**
- Complex tasks requiring multiple expertise domains
- Code analysis from security, performance, and quality perspectives
- Comprehensive reviews (architecture + security + testing)
- Feature implementation needing backend + frontend + database work

❌ **Not for:**
- Simple, single-domain tasks
- Quick fixes or small changes
- Tasks where one agent suffices

---

## Native Agent Invocation

### Single Agent
```
Use the security-auditor agent to review authentication
```

### Sequential Chain
```
First, use the explorer-agent to discover project structure.
Then, use the backend-specialist to review API endpoints.
Finally, use the test-engineer to identify test gaps.
```

### With Context Passing
```
Use the frontend-specialist to analyze React components.
Based on those findings, have the test-engineer generate component tests.
```

### Resume Previous Work
```
Resume agent [agentId] and continue with additional requirements.
```

---

## DA Orchestration Patterns

### Pattern 1: Full Report Build (End-to-End)
```
Agents: data-analyst → data-engineer → [database-optimizer] → backend-specialist → frontend-specialist

1. data-analyst:       Define metrics, KPIs, filters from requirements
2. data-engineer:      Design SQL, ClickHouse DDL, pipeline logic
3. database-optimizer: (Optional) Tune slow queries, add indexes
4. backend-specialist: Build FastAPI endpoints + Pydantic models
5. frontend-specialist: Build React dashboard, charts, filters
6. Synthesize: Full Orchestration Report
```

### Pattern 2: Data Layer Only
```
Agents: data-analyst → data-engineer → database-optimizer

1. data-analyst:       Identify metrics and data sources
2. data-engineer:      Write SQL queries and schemas
3. database-optimizer: Optimize and validate performance
4. Synthesize: Data Layer report
```

### Pattern 3: API + UI from Existing SQL
```
Agents: backend-specialist → frontend-specialist

1. backend-specialist: Wrap existing SQL into FastAPI endpoints
2. frontend-specialist: Consume API, build chart components
3. Synthesize: Implementation report
```

---

## Available DA Agents

| Agent | Expertise | Trigger Phrases |
|-------|-----------|------------------|
| `orchestrator` | DA Tech Lead & Coordination | "comprehensive report", "full build", "multi-agent" |
| `data-analyst` | Metrics, KPIs, Business Insight | "insight", "metric", "dashboard design", "analyze" |
| `data-engineer` | ETL, SQL, ClickHouse, DDL | "pipeline", "etl", "data warehouse", "sync", "schema" |
| `database-optimizer` | Query Tuning, Indexing, Performance | "slow query", "index", "performance", "optimize SQL" |
| `backend-specialist` | FastAPI, Python APIs, Pydantic | "backend", "api", "endpoint", "fastapi" |
| `frontend-specialist` | React, Recharts, D3.js, Dashboard UI | "chart", "react", "dashboard", "ui", "recharts" |
| `project-planner` | Plan Decomposition, Task Breakdown | "plan", "roadmap", "tasks", "phases" |

---

## Antigravity Built-in Agents

These work alongside custom agents:

| Agent | Model | Purpose |
|-------|-------|---------|
| **Explore** | Haiku | Fast read-only codebase search |
| **Plan** | Sonnet | Research during plan mode |
| **General-purpose** | Sonnet | Complex multi-step modifications |

Use **Explore** for quick searches, **custom agents** for domain expertise.

---

## Synthesis Protocol

After all agents complete, synthesize:

```markdown
## Orchestration Synthesis

### Task Summary
[What was accomplished]

### Agent Contributions
| Agent | Finding |
|-------|---------|
| security-auditor | Found X |
| backend-specialist | Identified Y |

### Consolidated Recommendations
1. **Critical**: [Issue from Agent A]
2. **Important**: [Issue from Agent B]
3. **Nice-to-have**: [Enhancement from Agent C]

### Action Items
- [ ] Fix critical security issue
- [ ] Refactor API endpoint
- [ ] Add missing tests
```

---

## Best Practices

1. **Available agents** - 17 specialized agents can be orchestrated
2. **Logical order** - Discovery → Analysis → Implementation → Testing
3. **Share context** - Pass relevant findings to subsequent agents
4. **Single synthesis** - One unified report, not separate outputs
5. **Verify changes** - Always include test-engineer for code modifications

---

## Key Benefits

- ✅ **Single session** - All agents share context
- ✅ **AI-controlled** - Claude orchestrates autonomously
- ✅ **Native integration** - Works with built-in Explore, Plan agents
- ✅ **Resume support** - Can continue previous agent work
- ✅ **Context passing** - Findings flow between agents

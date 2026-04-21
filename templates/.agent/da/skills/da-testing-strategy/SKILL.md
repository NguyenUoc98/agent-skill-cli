# Skill: DA Testing Strategy — 3-Layer Pyramid

---

## Overview

Every feature built by the DA team MUST pass through all 3 test layers **sequentially**.
**No layer can be skipped.** Each layer produces documented evidence that feeds into the next.

```
┌──────────────────────────────────────────────────────────┐
│  Layer 3: E2E Tests (Playwright MCP)                      │
│  Prefix: E2E-xx  │  Input: IT-xx mapped to UI journeys   │
├──────────────────────────────────────────────────────────┤
│  Layer 2: Integration Tests                               │
│  Prefix: IT-xx   │  Input: Live DEV API + real DB        │
├──────────────────────────────────────────────────────────┤
│  Layer 1: Unit + Feature Tests (TDD)                      │
│  RED → GREEN → REFACTOR  │  Tests written BEFORE code    │
└──────────────────────────────────────────────────────────┘
```

---

## Test Directory Structure

```
project-root/
├── tests/
│   ├── unit/                  ← Layer 1 Backend (pytest)
│   │   ├── test_repository.py
│   │   ├── test_service.py
│   │   └── conftest.py
│   ├── feature/               ← Layer 1 Backend Feature/API tests
│   │   └── test_api_endpoints.py
│   └── integration/           ← Layer 2 (pytest + httpx against DEV)
│       ├── conftest.py        ← reads playwright.config.md for BASE_URL
│       └── test_api_integration.py
├── src/
│   └── __tests__/             ← Layer 1 Frontend (vitest)
│       ├── components/
│       │   └── RevenueChart.test.tsx
│       └── hooks/
│           └── useRevenueData.test.tsx
└── blueprint/[slug]/
    ├── 06-integration-tests.md  ← IT-xx test case table (Layer 2 doc)
    ├── 05-test-plan.md          ← E2E-xx test plan (Layer 3 doc)
    └── 05-e2e-results.md        ← E2E-xx results + screenshots (Layer 3 output)
```

---

## Layer 1: Unit + Feature Tests (TDD Workflow)

**Skill reference:** `python-testing-patterns`, `test-driven-development`

**Rule:** Tests are written **BEFORE** implementation. The cycle is always:
`RED (write failing test)` → `GREEN (minimum code to pass)` → `REFACTOR`

### Backend (Python/FastAPI) — `pytest`

| Scope | What to test | File |
|---|---|---|
| Repository | Raw SQL returns correct shape, handles empty result | `tests/unit/test_repository.py` |
| Service | Business logic, aggregation, mapping DTO | `tests/unit/test_service.py` |
| API Feature | Endpoint status code, response schema, filter validation | `tests/feature/test_api_endpoints.py` |

```python
# CORRECT TDD order: RED first
def test_get_revenue_returns_list(client, mock_db):
    response = client.get("/api/revenue", params={"date_from": "2025-01-01", "date_to": "2025-01-31"})
    assert response.status_code == 200
    assert isinstance(response.json()["data"], list)
    assert "total" in response.json()

# Run → FAIL (RED) → implement minimum code → PASS (GREEN) → clean up (REFACTOR)
```

### Frontend (React/Next.js) — `vitest` + `@testing-library/react`

| Scope | What to test | File |
|---|---|---|
| Hook | Data fetch state: loading, success, error; filter state updates | `src/__tests__/hooks/` |
| Component | Chart renders with mock data; loading skeleton shown; error state shown | `src/__tests__/components/` |
| Query | React Query cache behavior with mock API response | `src/__tests__/hooks/` |

**Output gate:** `pytest` and `vitest` must both exit GREEN before Layer 2 begins.

---

## Layer 2: Integration Tests

**Skill reference:** `python-testing-patterns`

**When:** After Phase 3 (Backend) is deployed to DEV. Before Phase 4 (Frontend) starts.

**Execution tool:** `pytest` with `httpx.AsyncClient` pointing to live DEV BASE_URL (from `playwright.config.md`).

```python
# tests/integration/conftest.py
import httpx, yaml
BASE_URL = yaml.safe_load(open("playwright.config.md"))["BASE_URL"]  # or parse manually

# tests/integration/test_api_integration.py
async def test_IT01_revenue_happy_path():
    async with httpx.AsyncClient(base_url=BASE_URL) as client:
        r = await client.get("/api/revenue", params={"date_from": "2025-01-01", "date_to": "2025-01-31"})
    assert r.status_code == 200
    assert isinstance(r.json()["data"], list)
```

**Test Case Suite** — saved to `blueprint/[slug]/06-integration-tests.md`:

| ID | Method + Endpoint | Parameters | Expected Status | Expected Body | Type |
|---|---|---|---|---|---|
| IT-01 | `GET /api/{metric}` | valid date range | 200 | `{data: [...], total: N}` | ✅ Happy path |
| IT-02 | `GET /api/{metric}` | `date_from > date_to` | 422 | Pydantic validation error | ❌ Negative |
| IT-03 | `GET /api/{metric}` | date range with no data | 200 | `{data: [], total: 0}` | ❌ Negative |
| IT-04 | `GET /api/{metric}` | missing required params | 422 | Pydantic validation error | ❌ Negative |
| IT-05 | `GET /api/{metric}` | date range > 365 days | 200 | response within timeout | 🔲 Edge |

Replace `{metric}` with actual endpoint names from `03-api-contract.md`.

**Output gate:** All IT-xx cases PASS before Phase 4 begins.

---

## Layer 3: E2E Tests (Playwright MCP)

**Skill reference:** `playwright-e2e`

**When:** After Phase 4 (Frontend) is implemented.

**Numbering:** E2E scenarios use `E2E-xx` prefix and map 1-to-1 from IT-xx:

| IT Case | E2E Scenario ID | User Journey |
|---|---|---|
| IT-01 Happy path | E2E-01 | Navigate → see chart with data |
| IT-02 Invalid date | E2E-02 | Apply bad filter → see error message |
| IT-03 Empty result | E2E-03 | Apply no-data date → see empty state |
| IT-04 Missing params | E2E-04 | Blocked by UI validation before API call |
| IT-05 Large range | E2E-05 | Apply wide range → chart loads (slow ok) |

**Config required:** `playwright.config.md` must have `BASE_URL`, browser settings, and auth credentials before execution.

**Output gate:** All E2E-xx scenarios PASS. Results in `blueprint/[slug]/05-e2e-results.md`.

---

## Layer Completion Checklist

Before declaring a report build DONE:

- [ ] Layer 1 Backend: `pytest tests/unit/ tests/feature/` — all GREEN
- [ ] Layer 1 Frontend: `vitest run` — all GREEN
- [ ] Layer 2: All IT-xx in `06-integration-tests.md` — all PASS
- [ ] Layer 3: All E2E-xx in `05-e2e-results.md` — all GREEN
- [ ] `playwright.config.md` has correct `BASE_URL` and route for this report slug

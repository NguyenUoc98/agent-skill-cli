# Skill: Playwright E2E — Dashboard Testing (Layer 3)

## Purpose

Guide the `@frontend-specialist` agent to execute Playwright MCP-based E2E tests for **data analytics dashboards** in **Phase 5** of `report_builder`.

> This skill handles **Layer 3 only**. Test scenarios (E2E-xx) are generated from integration test cases (IT-xx) defined in `da-testing-strategy` skill Layer 2.

---

## Step 0: Load Config (Mandatory)

```
view_file → playwright.config.md
```

Extract:
- `BASE_URL` — dev server root URL
- `browser` / `viewport` / `headless` / `timeout` — browser settings
- `login_url` / `username` / `password` — if authentication required
- `Dashboard Routes` table — find the route for the current report slug

> If `playwright.config.md` does not exist, STOP and alert the user to fill it in.

---

## Step 1: Authentication (if required)

If `login_url` is set in config:

```
1. open_browser_url → BASE_URL + login_url
2. browser_snapshot → identify username/password fields
3. browser_fill [username field] → config.username
4. browser_fill [password field] → config.password
5. browser_click [submit button]
6. browser_wait_for → verify redirect to dashboard or success indicator
7. browser_take_screenshot → "00-login-success.png"
```

---

## Step 2: E2E Test Execution Pattern

For each E2E-xx scenario in `blueprint/[slug]/05-test-plan.md`:

```
a. open_browser_url → BASE_URL + dashboard_route
b. browser_wait_for → page content loaded (wait for chart container)
c. browser_take_screenshot → "{E2E-xx}-initial.png"
d. [Interact per scenario: browser_fill / browser_click / browser_select_option]
e. browser_wait_for → data loaded OR error state visible
f. browser_snapshot → assert expected elements exist
g. browser_take_screenshot → "{E2E-xx}-result.png"
h. Record PASS / FAIL
```

### Concrete Interaction Examples

**E2E-01 — Happy path (filter with valid date range):**
```
browser_fill [data-testid="date-filter-start"] → "2025-01-01"
browser_fill [data-testid="date-filter-end"]   → "2025-01-31"
browser_click [data-testid="apply-filter"]
browser_wait_for textGone="Loading"
browser_snapshot → verify [data-testid="chart-*"] elements are non-empty
```

**E2E-02 — Negative (invalid date range):**
```
browser_fill [data-testid="date-filter-start"] → "2025-01-31"
browser_fill [data-testid="date-filter-end"]   → "2025-01-01"
browser_click [data-testid="apply-filter"]
browser_wait_for text="Invalid date range"  (OR check [data-testid="error-state"])
browser_snapshot → verify error message visible
```

**E2E-03 — Negative (no data for date range):**
```
browser_fill [data-testid="date-filter-start"] → "2020-01-01"
browser_fill [data-testid="date-filter-end"]   → "2020-01-02"
browser_click [data-testid="apply-filter"]
browser_wait_for textGone="Loading"
browser_snapshot → verify [data-testid="empty-state"] is visible
```

**E2E-05 — Edge (large date range > 365 days):**
```
browser_fill [data-testid="date-filter-start"] → "2023-01-01"
browser_fill [data-testid="date-filter-end"]   → "2024-12-31"
browser_click [data-testid="apply-filter"]
browser_wait_for textGone="Loading" time=30  ← extended timeout
browser_snapshot → verify charts render (may be slow)
```

---

## data-testid Convention

All dashboard components MUST include `data-testid` attributes:

| Component | data-testid |
|---|---|
| Date filter start input | `date-filter-start` |
| Date filter end input | `date-filter-end` |
| Apply filter button | `apply-filter` |
| Chart wrapper | `chart-{metric-name}` (e.g. `chart-revenue`) |
| Loading skeleton | `loading-skeleton` |
| Error state | `error-state` |
| Empty state | `empty-state` |
| Data table | `data-table` |

The `@frontend-specialist` MUST add these attributes during Phase 4 implementation.

---

## Step 3: Record Results

After all scenarios run, write `blueprint/[slug]/05-e2e-results.md`:

```markdown
# E2E Test Results — [Report Slug]
Date: YYYY-MM-DD  |  Environment: DEV  |  BASE_URL: http://...

| ID     | Scenario              | Result | Screenshot           | Notes |
|--------|-----------------------|--------|----------------------|-------|
| E2E-01 | Happy path filter     | ✅ PASS | e2e-01-result.png   |       |
| E2E-02 | Invalid date range    | ✅ PASS | e2e-02-result.png   |       |
| E2E-03 | No data empty state   | ✅ PASS | e2e-03-result.png   |       |
| E2E-04 | UI validation block   | ✅ PASS | e2e-04-result.png   |       |
| E2E-05 | Large date range      | ✅ PASS | e2e-05-result.png   |       |

Summary: 5/5 PASS — Phase 5 COMPLETE ✅
```

---

## Self-Fix Loop Rule

If any scenario FAILS:

1. `browser_take_screenshot` → capture failure state
2. `browser_snapshot` → read DOM to identify missing element or wrong state
3. Identify root cause:
   - Missing `data-testid` → add to React component
   - Wrong selector → update test scenario
   - Data not loading → fix API call or React Query config
   - UI bug → fix component logic
4. Re-run **only the failing E2E-xx**, not the full suite
5. Repeat until GREEN ✅

**NEVER mark Phase 5 complete with any failing E2E scenario.**

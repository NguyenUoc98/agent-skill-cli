---
description: End-to-end report building workflow. Orchestrates all DA agents sequentially with user checkpoints at each phase. Use when building a complete report from requirements to UI.
---

# Workflow `/report_builder`

> **Usage:** `/report_builder [Paste document or describe report requirements here]`

This workflow orchestrates all 5 DA agents through a structured, phase-by-phase process to build a complete reporting solution — from metrics design to deployed dashboard. A shared **Report Blueprint Folder** (`blueprint/[report-slug]/`) acts as the handoff contract, containing separate markdown files for each phase to keep documentation clean and organized.

---

## 📝 Input Format

Bạn có thể truyền đầu vào theo **3 cách**:

### Cách 1: Free Text (Tự nhiên)
Viết tự nhiên, `@project-planner` sẽ tự extract và hỏi lại những gì còn thiếu.
> *"Tôi cần report doanh thu theo ngày theo campaign, hiển thị line chart, lọc theo date range"*

### Cách 2: Structured Template (Khuyến nghị)
Sử dụng format chuẩn: Tên report, Mục tiêu, Metrics, Filters, Granularity, Visualizations, Performance, Bảng dữ liệu. Càng rõ ràng agent càng ít hỏi lại.

### Cách 3: Unstructured .md Document (Tài liệu hỗn loạn)

Nếu bạn có tài liệu **không có cấu trúc rõ ràng** (PowerBI export, báo cáo cũ, DAX formulas, v.v.):
- Paste đường dẫn file hoặc nội dung vào
- `@project-planner` sẽ **delegate việc parse sang `@data-analyst`**
- `@data-analyst` sẽ trích xuất business logic và trả kết quả về
- Sau đó user xác nhận trước khi tạo blueprint folder

> 💡 **Tip:** Nếu bạn đã có tài liệu yêu cầu (PRD, Jira ticket, email...) chỉ cần paste nguyên vào — `@project-planner` sẽ tự parse. Với tài liệu phức tạp (DAX, PowerBI...) sẽ tự động gọi `@data-analyst` hỗ trợ.


---

## ⚖️ Core Principle: Ask Before Proceeding (ALWAYS ACTIVE)

> **MANDATORY**: At any phase, if information is **missing, ambiguous, or unclear**, STOP and notify the user exactly what is needed. NEVER assume business logic, table names, or filter requirements. Only proceed with inference if the user explicitly grants permission.

---

## 🗺️ Phase Map

```
/report_builder [document]
        │
        ▼
[Phase 0] 📋 @project-planner — Analyze & Plan
        │ ⛔ CHECKPOINT: User xác nhận plan & blueprint
        ▼
[Phase 1] 🤖 @data-analyst — Metrics & KPI Design
        │ ⛔ CHECKPOINT: User xác nhận metrics
        ▼
[Phase 2] 🤖 @data-engineer + @database-optimizer — SQL & Data Layer
        │ ⛔ CHECKPOINT: User xác nhận SQL
        ▼
[Phase 3] 🤖 @backend-specialist — FastAPI + Unit/Feature Tests (TDD)
        │ ⛔ CHECKPOINT: User xác nhận API contract + unit tests GREEN
        ▼
[Phase 3.5] 🤖 @backend-specialist — Integration Tests
        │ ⛔ CHECKPOINT: User xác nhận integration test cases
        ▼
[Phase 4] 🤖 @frontend-specialist — Dashboard UI + Component Tests
        │ ⛔ CHECKPOINT: User xác nhận UI + test plan E2E
        ▼
[Phase 5] 🤖 @frontend-specialist — E2E Tests (Playwright MCP)
        │
        ▼
[Done] 📋 Synthesis Report
```

---

## Phase 0: 📋 @project-planner — Analyze & Plan

🤖 **`@project-planner` đã tiếp nhận và xử lý...**

**Role:** Parse the requirements document, validate data sources, and produce the shared Report Blueprint that all subsequent agents will read and write to.

### Steps

1. **Read Context (Silent)**
   - Run `view_file` on `data_dictionary/README.md` to understand available tables.
   - Run `view_file` on `.agent/ARCHITECTURE.md` to understand DA system.
   - Run `view_file` on `AGENTS.md` (project root) to understand project rules.

2. **Classify Input Document** *(before parsing)*

   | Input Type | Signal | Action |
   |------------|--------|--------|
   | Structured template | Has `Metrics`, `Filters`, `Granularity` headings | Parse directly |
   | Free text | Short sentence, conversational | Extract → ask missing info |
   | **Unstructured .md** | Long doc, DAX/PowerBI content, no clear sections | **→ Delegate to `@data-analyst`** |
   | PRD / Jira / Email | Formal business doc | Extract goals → validate with user |

3. **[If Unstructured .md] Delegate Parsing to `@data-analyst`**

   > Invoke `@data-analyst` as sub-agent with this task:
   > ```
   > Parse the provided document and extract:
   > 1. Business goal / report purpose
   > 2. All metrics with formulas (convert DAX → business logic description)
   > 3. All filter dimensions (date, campaign, platform, country, etc.)
   > 4. All data source tables mentioned
   > 5. Visualization types described (chart types, table layouts)
   > 6. Ambiguities or missing information
   > Return structured findings.
   > ```
   >
   > After `@data-analyst` returns findings:
   > - Cross-reference tables against `data_dictionary/README.md`
   > - Flag missing tables → prompt user to run `/dict:add` first
   > - **Present findings to user for confirmation before proceeding**

4. **Analyze the Input Document** *(for structured/free-text input)*
   - Extract: Report goal, target audience, required metrics, filters, time range, chart types.
   - Identify: Which tables in `data_dictionary/` are likely needed.
   - Flag: Any missing tables that require `/dict:add` first.

5. **Create Report Blueprint Folder**
   - Save to `blueprint/[report-slug]/00-plan.md`. Create a structured markdown file that outlines the `Report Goal` and includes a `Blueprint Files Index` anticipating `01-metrics.md`, `02-data-layer.md`, `03-api-contract.md`, and `04-ui-spec.md`.

6. **Present Plan to User**
   - List detected metrics, filters, tables, and which agents will handle each phase.
   - Flag any ambiguities: *"❓ Không tìm thấy bảng `orders` trong data_dictionary/ — cần chạy `/dict:add` trước?"*

**⛔ CHECKPOINT:**
> "Kế hoạch trên có đúng với yêu cầu của bạn không? Gõ **'yes'** để bắt đầu Phase 1, hoặc bổ sung thêm thông tin nếu cần điều chỉnh."

**→ DO NOT proceed to Phase 1 until user confirms.**

---

## Phase 1: 🤖 @data-analyst — Metrics & KPI Design

🤖 **`@data-analyst` đã tiếp nhận và xử lý...**

**Input:** Report Blueprint (Phase 0 goal + context)

### Steps

1. **Read Context** — Run `view_file` on `blueprint/[report-slug]/00-plan.md`.
2. **Read data_dictionary/** — Cross-reference metrics with actual table/column names.
3. **Design Metrics Spec** — For each metric, define:
   - Metric name & business definition
   - Formula / calculation logic
   - Required columns + tables
   - Granularity (daily / weekly / monthly)
   - Filters (date range, platform, campaign, etc.)
   - Chart type recommendation

4. **Create `01-metrics.md`** — Use `write_to_file` to create `blueprint/[report-slug]/01-metrics.md` detailing the metrics table (Name, Formula, Tables, Granularity, Filters, Chart Type) and filter specifications.

5. **Flag issues** — If a required column is not in `data_dictionary/`: STOP and notify user.

**⛔ CHECKPOINT:**
> "Danh sách metrics và filters trên có đúng không? Gõ **'yes'** để tiếp tục Phase 2, hoặc điều chỉnh nếu cần."

**→ DO NOT proceed to Phase 2 until user confirms.**

---

## Phase 2: 🤖 @data-engineer + @database-optimizer — SQL & Data Layer

🤖 **`@data-engineer` và `@database-optimizer` đã tiếp nhận và phối hợp xử lý...**

1. **Read Context** — Run `view_file` on `blueprint/[report-slug]/01-metrics.md`.
2. **Read relevant `data_dictionary/[table].md`** files for exact column types.
3. **Write SQL queries** — For each metric:
   - Raw SQL with proper JOINs, GROUP BY, filters
   - Use ClickHouse/MySQL/PostgreSQL syntax per the DBMS in data_dictionary
   - Parameterized filters (`:date_from`, `:date_to`, etc.)
4. **Write DDL** if any new aggregate/materialized tables are needed.

#### @database-optimizer (if queries scan large data volumes):
1. **Review SQL from data-engineer** — Check query plan.
2. **Recommend indexes** — Based on WHERE/ORDER BY/GROUP BY patterns.
3. **Propose partition strategy** — If not already defined in data_dictionary.

5. **Create `02-data-layer.md`** — Use `write_to_file` to create `blueprint/[report-slug]/02-data-layer.md` detailing all SQL Queries, Index/Partition strategies, and API Query Parameters.

**⛔ CHECKPOINT:**
> "SQL và index strategy trên có đúng không? Gõ **'yes'** để tiếp tục Phase 3. Nếu cần test SQL trước, bạn có thể chạy thử và phản hồi kết quả."

**→ DO NOT proceed to Phase 3 until user confirms.**

---

## Phase 3: 🤖 @backend-specialist — FastAPI Development

🤖 **`@backend-specialist` đã tiếp nhận và xử lý...**

**Input:** Verified SQL logic and query parameters from Phase 2.

### Steps

1. **Read Context** — Run `view_file` on `blueprint/[report-slug]/02-data-layer.md`.
2. **Read `AGENTS.md`** — Understand project structure, existing modules.
3. **Design API endpoints** — Following project's layered architecture:
   - `Router` → `Service` → `Repository` pattern
   - One endpoint per metric group (e.g., `/api/revenue`, `/api/campaign-stats`)
4. **Define Pydantic models**:
   - `QueryRequest` (input filters with validation)
   - `ChartDataResponse` (output format for frontend charts)
5. **Write FastAPI code + tests (TDD — Layer 1)** — Apply `da-testing-strategy` skill Layer 1 pattern:
   - Write failing tests first (`tests/unit/`, `tests/feature/`) — **RED phase**
   - Write minimum implementation to pass — **GREEN phase**
   - Refactor — **REFACTOR phase**
   - Both `pytest tests/unit/` and `pytest tests/feature/` must exit GREEN before continuing.
6. **Create `03-api-contract.md`** — Use `write_to_file` to create `blueprint/[report-slug]/03-api-contract.md` detailing Endpoints, Request Schemas (e.g. QueryRequest), and Response Schemas (e.g. ChartDataResponse).

**⛔ CHECKPOINT:**
> "API contract và unit/feature tests đã GREEN chưa? Gõ **'yes'** để tiến hành Phase 3.5 (Integration Tests)."

**→ DO NOT proceed to Phase 3.5 until user confirms.**

---

## Phase 3.5: 🤖 @backend-specialist — Integration Tests

🤖 **`@backend-specialist` đang thực thi integration test suite...**

**Input:** Live DEV API (Phase 3 deployed), `playwright.config.md` (for BASE_URL)

### Steps

1. **Read Config** — `view_file` → `playwright.config.md` to get `BASE_URL`.
2. **Read API Contract** — `view_file` → `blueprint/[report-slug]/03-api-contract.md`.
3. **Generate Integration Test Case Suite** — For EACH endpoint, create test cases following the Layer 2 pattern in `da-testing-strategy` skill:
   - Happy path (valid params, expect 200 + correct data shape)
   - Invalid params (expect 422 validation error)
   - Edge case (empty result, extreme date range)
4. **Write `06-integration-tests.md`** — Use `write_to_file` to save all test cases to `blueprint/[report-slug]/06-integration-tests.md`.
5. **Execute test cases** — Run `pytest` integration tests against DEV environment (`BASE_URL`). Record PASS/FAIL for each IT-xx case.
6. **Fix failures** — If any IT-xx FAILS, fix the relevant service/repository code and re-run until all PASS.

**⛔ CHECKPOINT:**
> "Integration test suite đã hoàn thành. Tất cả IT-xx cases đều PASS. Gõ **'yes'** để tiến hành Phase 4 (Dashboard UI)."

**→ DO NOT proceed to Phase 4 until all integration tests PASS.**

---

## Phase 4: 🤖 @frontend-specialist — Dashboard UI

🤖 **`@frontend-specialist` đã tiếp nhận và xử lý...**

**Input:** API endpoints and JSON schema from Phase 3.

### Steps

1. **Read Context** — Run `view_file` on `blueprint/[report-slug]/03-api-contract.md`.
2. **Read `AGENTS.md`** — Understand frontend stack (React, Recharts, Tailwind...).
3. **Build Dashboard components**:
   - Date range filter component (controlled)
   - Chart components (Recharts / D3) consuming API response format
   - Data table (if raw data view needed)
   - Loading states + error handling
4. **Responsive layout** — Desktop-first, mobile-aware.
5. **Performance** — Use `useMemo` for heavy data transformations.
6. **Create `04-ui-spec.md`** — Use `write_to_file` to create `blueprint/[report-slug]/04-ui-spec.md` listing the components designed and the files created.
7. **Create E2E Test Plan** — Using the integration test cases in `06-integration-tests.md`, generate corresponding E2E scenarios (one E2E scenario per IT-xx case). Apply `da-testing-strategy` skill Layer 3 mapping. Save to `blueprint/[report-slug]/05-test-plan.md`.

   Test plan must cover AT MINIMUM:
   - ✅ Page loads with correct title and all chart containers visible
   - ✅ Default date range loads data (happy path matching IT-01)
   - ✅ Filter change triggers data refresh
   - ❌ Invalid date range shows error state (matching IT-02)
   - 🔲 Edge: empty result date range shows empty state (matching IT-03)

**⛔ CHECKPOINT:**
> "Dashboard UI và E2E test plan đã sẵn sàng. Gõ **'yes'** để tôi implement code và chuyển sang Phase 5 (E2E Execution)."

**→ DO NOT proceed to Phase 5 until user confirms.**

8. **Implement Code** — Write the React/Next.js components. Add `data-testid` attributes to ALL key UI elements.

---

## Phase 5: 🤖 @frontend-specialist — E2E Tests (Playwright MCP)

🤖 **`@frontend-specialist` đang thực thi E2E test suite...**

**Input:** `blueprint/[report-slug]/05-test-plan.md`, `playwright.config.md`

### Steps

1. **Read Config** — `view_file` → `playwright.config.md`. Extract BASE_URL, browser settings, auth credentials (if needed), and dashboard route for this report slug.
2. **Authenticate (if required)** — Navigate to `login_url`, fill credentials from config, verify login succeeds.
3. **Execute each E2E scenario** via Playwright MCP:
   ```
   For each scenario in 05-test-plan.md:
     a. open_browser_url → BASE_URL + dashboard_route
     b. browser_fill / browser_click / browser_select_option → interact
     c. browser_wait_for → wait for data/error to appear
     d. browser_snapshot → verify expected elements present
     e. browser_take_screenshot → save evidence
     f. Record PASS/FAIL
   ```
4. **Self-Fix Loop** — If any scenario FAILS:
   - Analyze error / screenshot to identify root cause
   - Edit the React TSX component to fix the bug
   - Re-run only the failing scenario
   - Repeat until ALL scenarios are GREEN ✅
5. **Write Results** — Save `blueprint/[report-slug]/05-e2e-results.md` with pass/fail table + screenshot paths.

---

## 📋 Final Synthesis Report

After Phase 5 is fully GREEN, present a final synthesis to the user:

| Phase | Agent | Deliverable |
|---|---|---------|
| 0 | project-planner | `blueprint/[slug]/00-plan.md` |
| 1 | data-analyst | `blueprint/[slug]/01-metrics.md` |
| 2 | data-engineer + optimizer | `blueprint/[slug]/02-data-layer.md` |
| 3 | backend-specialist | `blueprint/[slug]/03-api-contract.md` + unit/feature tests GREEN |
| 3.5 | backend-specialist | `blueprint/[slug]/06-integration-tests.md` — all IT-xx PASS |
| 4 | frontend-specialist | `blueprint/[slug]/04-ui-spec.md` + `05-test-plan.md` |
| 5 | frontend-specialist | `blueprint/[slug]/05-e2e-results.md` — all E2E GREEN ✅ |

**Test Pyramid Summary:**
- Layer 1 (Unit/Feature): N tests — all GREEN ✅
- Layer 2 (Integration): N IT-xx cases — all PASS ✅
- Layer 3 (E2E): N scenarios — all GREEN ✅


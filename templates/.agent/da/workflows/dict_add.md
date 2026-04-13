---
description: Import a new table schema into the data_dictionary/ folder
---

# Dictionary Import Workflow (`/dict:add`)

> **Usage:** `/dict:add {table_name} [Paste DDL or Describe Data here]`

This workflow is exclusively designed to parse raw Database Definitions (SQL DDL, CSV/Excel dumps, or plain descriptions) and automatically integrate them into the `data_dictionary/` structure seamlessly.

## ⚖️ Core Principle: Ask Before Assuming (ALWAYS ACTIVE)

> **MANDATORY**: At any step, if information is **missing, ambiguous, or uncertain**, you MUST stop, notify the user of exactly what is unclear, and ask for clarification. **NEVER make assumptions silently.** Only proceed with inference/guessing if the user explicitly grants permission (e.g., "bạn tự suy luận đi").

Examples of when to STOP and ASK:
- Database engine is not specified (MySQL? ClickHouse? PostgreSQL?)
- Column data types are vague or missing
- Table purpose / business context is unclear
- Relationship to other tables cannot be determined

---

## 🛠️ Step-by-Step Execution

### Step 1: Analyze Input & Detect Ambiguities

- Parse the provided DDL or text description.
- **CRITICAL:** If the input contains MULTIPLE tables, plan to process them one by one. **1 Table = 1 File**.
- Identify for each table:
  - Database Engine (ClickHouse / MySQL / PostgreSQL)
  - Column names, data types, primary keys, relationships
  - Table's business purpose

**⛔ CHECKPOINT — MANDATORY BEFORE CONTINUING:**

After analysis, compile and present to the user:
1. A summary of tables detected and their proposed layouts.
2. A list of any **missing or ambiguous fields** (e.g., "❓ Không rõ Database Engine cho bảng `orders` — ClickHouse hay MySQL?").
3. Ask explicitly: *"Những thông tin trên có đúng không? Bạn xác nhận để mình tiến hành ghi file."*

**→ DO NOT proceed to Step 2 until the user confirms.**

---

### Step 2: Generate Standard Markdown Schema (1 Table per File)

Only after user confirmation, build the schema in memory for EACH table using this **Multi-Engine Template** (do not alter headings or omit sections):

**LANGUAGE RULE**: All documentation, descriptions, and column notes MUST be written in **English**.

```markdown
# [Business Context / Table Name] (e.g., TikTok Orders)

- **DBMS:** `[ClickHouse / MySQL / PostgreSQL]`
- **Database/Schema:** `[schema_name]`
- **Table:** `[table_name]`
- **Table Engine:** `[e.g., ReplicatedReplacingMergeTree for ClickHouse / InnoDB for MySQL]`
- **Description:** [Brief description of the table's purpose]

## 1. Table Schema

| Column Name | Data Type (Engine Specific) | Key | Nullable | Default | Description & Enum Values |
|-------------|----------------------------|-----|----------|---------|---------------------------|
| id          | UInt64 / BIGINT            | PK  | NO       | -       | Primary key |
| status      | String / VARCHAR(50)       | -   | NO       | pending | e.g., pending, success, failed |

## 2. Partitioning & Indexing Strategy (CRITICAL FOR OPTIMIZER)
- **Primary/Sort Key (`ORDER BY`):** (Explicitly note Sparse Index for ClickHouse)
- **Partition Strategy (`PARTITION BY`):** (Required for ClickHouse)
- **Secondary Indexes:** (Applicable for MySQL/Postgres)
- **Data Retention (`TTL`):** (Time-to-Live settings if any)

## 3. Logical Constraints & Relationships
- `user_id` -> `users.id` (1-N)

## 4. Query Performance Notes (For Data-Optimizer)
- **Query Guidelines:** (e.g., Avoid full scans, use partition key in WHERE clause)
- **Traffic Characteristics:** (e.g., Append-only vs. High Mutations)
```

---

### Step 3: Persist to File System

For EACH table, use `write_to_file` to save: `data_dictionary/[table_name].md`.

---

### Step 4: Update the Topography Index (`data_dictionary/README.md`)

**4a. Check if README exists:**
- Run `view_file` on `data_dictionary/README.md`.
- **If the file does NOT exist:** Notify the user — *"README.md chưa tồn tại. Mình sẽ tạo mới với cấu trúc cơ bản."* — then create the file with a standard skeleton before injecting new entries.

**4b. Determine the correct category using these rules:**

| Category | Rule |
|----------|------|
| **Operational** | Tables storing raw transactions, events, or live operational data (e.g., `orders`, `clicks`, `conversions`) |
| **Analytics / Data Warehouse** | Aggregate tables, fact/dimension tables, pre-computed metrics (e.g., `fact_revenue`, `dim_campaign`) |
| **Reference / Master Data** | Lookup/config tables (e.g., `countries`, `currencies`, `settings`) |

> If the category is unclear, **STOP and ASK the user** which section the table belongs to.

**4c. Inject links** using `replace_file_content`:
```
- [table_name] ➔ data_dictionary/[table_name].md
```

---

### Step 5: Acknowledge User

Reply concisely in Vietnamese:

> ✅ Đã thêm **[N] bảng** ([table1], [table2]...) vào Data Dictionary thành công theo chuẩn Multi-Engine. Các Agent đã có thể truy xuất.

# Data Dictionary Index

> **Agent Instruction:** This is the entry point for all Database schema queries. Use the index below to map business concepts to tables, then `view_file` the specific Markdown file for column definitions, data types, and indexes.

## 🗄️ Database Topography

### Operational Database (PostgreSQL / MySQL)
*(Use these tables for real-time transactions and CRUD)*


### Analytics Warehouse (ClickHouse)
*(Use these tables for high-volume reporting, aggregation, and dashboards)*

---

## 🚦 Constraints & Guidelines for Agents
1. **Never guess columns**: If a table is listed here, you MUST read its specific `.md` file to confirm exact column names and types before writing a SQL query.
2. **Aggregations over Raw Data**: When writing Dashboard API queries, always prefer querying the `_agg` tables in the Warehouse instead of raw transactional tables.
3. **Data Types Matter**: Pay strict attention to DateTime fields (e.g., timezone issues) and ID types (UUID vs BigInt) defined in the specific table schema.

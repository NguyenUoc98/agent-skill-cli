---
name: laravel-app-guidelines
description: Guidelines and workflow for working on Laravel applications across common stack API-only, including optional PHPUnit, Pint, and Laravel Boost MCP tools. Use when implementing features, fixing bugs while following project-specific instructions (AGENTS.md, docs/).
author: Official
context: fork
---

# Laravel App Guidelines

## Overview

Apply a consistent workflow for Laravel apps API only, and Laravel Boost tooling.

## Quick Start

- Read repository instructions first: `AGENTS.md`. If it doesn't exist, ask the user to create it or suggest using Laravel Boost to create it.
- If `docs/` exists, read `docs/README.md` and relevant module docs before decisions.

## API-Only Mode

- Use `routes/api.php`; avoid Inertia and frontend assumptions.
- Prefer API Resources and versioning if the repo already uses them.
- Follow the repo's auth stack (Sanctum/Passport/custom) and response format conventions.

## Testing and Formatting

### Before Writing Tests
- **Check database schema** - Use `database-schema` tool to understand:
    - Which columns have defaults
    - Which columns are nullable
    - Foreign key relationship names
- **Verify relationship names** - Read the model file to confirm:
    - Exact relationship method names (not assumed from column names)
    - Return types and related models
- Use PHPUnit; generate tests with `php artisan make:test --phpunit` and prefer feature tests.
- Run the minimal relevant tests (`php artisan test <file>` or `--filter=`).
- Run `vendor/bin/pint --dirty` before finalizing code changes.
- After minimal tests pass, offer to run the full test suite.

## General code instructions

- Don't generate code comments above the methods or code blocks if they are obvious. Don't add docblock comments when defining variables, unless instructed to, like `/** @var \App\Models\User $currentUser */`. Generate comments only for something that needs extra explanation for the reasons why that code was written.
- In PHP, use `match` operator over `switch` whenever possible.
- Generate Enums always in the folder `Enums`, not in the main folder, unless instructed differently. Use `bensampo/laravel-enum`
- Always use Enum value as the default in the migration if column values are from the enum. Always casts this column to the enum type in the Model.
- Don't create temporary variables like `$currentUser = auth()->user()` if that variable is used only one time.
- Always use Enum where possible instead of hardcoded string values, if Enum class exists. For example, in Blade files, and in the tests when creating data if field is casted to Enum then use that Enum instead of hardcoding the value.

## Laravel Boost MCP Tools (when available)

- `search-docs` before changing behavior or using framework features.
- `list-artisan-commands` to confirm Artisan options.
- `list-routes` to inspect routing changes.
- `tinker` for PHP debugging and `database-query` for read-only DB checks.
- `browser-logs` to inspect frontend errors.
- `get-absolute-url` for sharing project URLs.
- See `references/boost-tools.md` for query patterns and tool usage tips.

## Output Expectations

- Preserve existing architecture, structure, and dependencies unless the user explicitly requests changes.
- Reuse existing components and follow local patterns.
- Ask concise clarifying questions when repo guidance is missing or ambiguous.
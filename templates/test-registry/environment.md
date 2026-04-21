# Test Environment Configuration

> Fill in this file before running the first test session.
> The Tester Agent reads this file at the start of every workflow (Step 0).

## Target Environments

| Environment | Base URL | Status |
|---|---|---|
| DEV | `http://` | ⏳ Not configured |
| Staging | `http://` | ⏳ Not configured |

## Default Test Environment

```
DEV
```

> Change this value to `Staging` when QA PIC requests staging-level validation.

## Authentication (Test Accounts)

| Role | Username | Notes |
|---|---|---|
| Standard User | — | Fill in before testing |
| Admin User | — | Fill in before testing |

> ⚠️ Do NOT store real passwords here. Use placeholder references or environment variable names.

## Playwright Browser Config

```yaml
browser: chromium
viewport: 1280x720
headless: true
slowMo: 0
```

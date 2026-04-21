# Playwright Configuration

> Read this file at the start of every E2E execution step.
> Maintained by the DA/Frontend team. Must be filled in before first E2E run.

## Target Environment

```yaml
BASE_URL: http://localhost:3000
```

> Change `BASE_URL` to staging URL when validating against staging environment.

## Browser Config

```yaml
browser: chromium
viewport:
  width: 1440
  height: 900
headless: true
slowMo: 0
timeout: 30000
```

## Authentication (if required)

```yaml
login_url: /login
username: (fill in test account)
password: (fill in test account — do NOT store real credentials here)
```

> If the dashboard requires login, the agent must complete authentication BEFORE navigating to the dashboard URL.

## Dashboard Routes

> Add report paths as they are built. The agent reads this to know where to navigate.

| Report Slug | Route | Notes |
|---|---|---|
| _(example)_ | `/dashboard/revenue` | — |

# Auth Monorepo

This repository uses Nx as the base for an authentication-focused monorepo.

The workspace is currently intentionally minimal so the real projects can be imported later.

## Current status

- The workspace currently keeps only the shared Nx and TypeScript tooling at the root.
- `api/` and `web/` remain part of the intended target architecture.
- The actual frontend and backend code will be imported later.

## Recommended architecture

The recommended approach for this monorepo is to organize code by domain and responsibility, not only by framework or runtime.

### High-level structure

```txt
auth-monorepo/
  api/
  web/
  libs/
    shared/
      types/
      utils/
    auth/
      domain/
      application/
      infrastructure/
      ui/
```

This structure should stay documented even if the projects are not yet physically present in the workspace.

## `libs/` separated by responsibility

Libraries inside `libs/` should be split by what they are responsible for, not just by technical type.

Examples:

- `shared/types`: shared request and response contracts for frontend and backend.
- `shared/utils`: framework-agnostic helpers, constants, and simple reusable utilities.
- `auth/domain`: core authentication rules and business entities.
- `auth/application`: use cases such as register user, login, logout, and get current session.
- `auth/infrastructure`: concrete implementations such as repositories, hashing, tokens, persistence, and external services.
- `auth/ui`: reusable authentication-related UI elements or hooks once a frontend stack is chosen.

## Practical recommendation

When you import your actual projects, a good next step is:

- register `api` as the backend project
- register `web` after choosing the frontend stack
- create `libs/shared/types`
- create `libs/auth/domain`
- create `libs/auth/application`

## Development

Use Nx commands directly while the workspace remains empty:

```sh
npm run nx -- show projects
```

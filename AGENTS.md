# Agent guidance – wp-module-ecommerce

This file gives AI agents a quick orientation to the repo. For full detail, see the **docs/** directory.

## What this project is

- **wp-module-ecommerce** – Brand-agnostic eCommerce experience for Newfold brand plugins. Registers with the Newfold Module Loader; depends on wp-module-installer and wp-module-onboarding-data. Maintained by Newfold Labs.

- **Stack:** PHP 7.3+. See docs/dependencies.md.

- **Architecture:** Registers with the loader; provides ecommerce flows and integration. See docs/integration.md.

## Key paths

| Purpose | Location |
|---------|----------|
| Bootstrap | `bootstrap.php` |
| Includes | `includes/` |
| Tests | `tests/` |

## Essential commands

```bash
composer install
composer run fix
composer run lint
composer run test
```

## Documentation

- **Full documentation** is in **docs/**. Start with **docs/index.md**.
- **CLAUDE.md** is a symlink to this file (AGENTS.md).

---

## Keeping documentation current

When you change code, features, or workflows, update the docs. When adding or changing dependencies, update **docs/dependencies.md**. When cutting a release, update **docs/changelog.md**.

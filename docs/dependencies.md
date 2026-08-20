---
name: wp-module-ecommerce
title: Dependencies
description: Composer and npm dependencies.
updated: 2026-08-21
---

# Dependencies

**Runtime:** newfold-labs/wp-module-installer, newfold-labs/wp-module-onboarding-data. **Dev:** johnpbloch/wordpress, lucatume/wp-browser, newfold-labs/wp-php-standards, phpunit/phpcov, wp-cli/i18n-command, wp-cli/wp-cli-bundle.

## npm overrides

`@wordpress/scripts` still pins vulnerable transitive dependencies. The overrides in `package.json` keep them on patched versions until the upstream ranges are updated.

`extract-zip` remains at 2.0.1 because no patched release exists. It is only present in the development e2e toolchain through Lighthouse and Puppeteer.

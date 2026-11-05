---
name: Playwright CLI sessions
description: Browser-session behavior observed in this Replit workspace.
---

Playwright CLI browser sessions may not remain available between separate shell-tool calls. Opening, testing, and closing the browser in one `ShellExec` invocation worked reliably.

In this workspace, the CLI's default `chrome` channel may point to an absent `/opt/google/chrome/chrome`. The cached Playwright Chromium launched successfully with `--browser=chromium`, without installing another browser.

**Why:** The CLI reported that the browser was not open when a later call tried to reuse a session, while a chained open → test → close sequence succeeded. Its default Chrome channel also failed to launch; selecting the cached Chromium worked.

**How to apply:** Combine browser setup, interactions, screenshot capture, console inspection, and cleanup in one shell invocation. If the default Chrome path is missing, open with `--browser=chromium`.

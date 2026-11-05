---
name: Playwright CLI sessions
description: Browser-session behavior observed in this Replit workspace.
---

Playwright CLI browser sessions may not remain available between separate shell-tool calls. Opening, testing, and closing the browser in one `ShellExec` invocation worked reliably.

**Why:** The CLI reported that the browser was not open when a later call tried to reuse a session, while a chained open → test → close sequence succeeded.

**How to apply:** Combine browser setup, interactions, screenshot capture, console inspection, and cleanup in one shell invocation.

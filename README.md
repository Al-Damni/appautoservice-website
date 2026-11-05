# Auto Service App for General Trading

Bilingual corporate website for Auto Service App for General Trading LLC, covering the company's
petroleum, automotive, food, and hydroponic activities across Kuwait and Syria.

## Run locally

From the workspace root:

```sh
PORT=5000 BASE_PATH=/ pnpm --filter @workspace/aldamni-corporate run dev
```

## Build and type-check

```sh
pnpm --filter @workspace/aldamni-corporate run typecheck
PORT=5000 BASE_PATH=/ pnpm --filter @workspace/aldamni-corporate run build
```

The site source is in `artifacts/aldamni-corporate`. The downloadable company profile is served
from its `public` directory.

---
name: kyvora-codegen-local
description: >-
  Kyvora local codegen hygiene — .codegen must never be committed or pushed.
  Use when running zero-codegen, bundling OpenAPI, or cloning this repo.
---

# Kyvora codegen (local tool)

1. `.codegen/` is **gitignored** and must never be committed or pushed to GitHub.
2. Obtain the tool by copying from `zero-apps-codegen-scaffold` (do not move/delete the scaffold).
3. Package scope is `@kyvora/*`.
4. Mode A (new domain): full multi-layer generate once.
5. Mode B (YAML edit): regenerate **core only**, handwrite below.
6. After OpenAPI YAML edits that fix contracts, also regenerate `*.openapi.types.ts` via `openapi-typescript` from bundled specs.

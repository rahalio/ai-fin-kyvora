# Kyvora

Bank-consortium reusable KYC attribute exchange. OpenAPI-first DDD monorepo built from the zero-apps codegen scaffold.

Package scope: **`@kyvora/*`**

## Product docs

- [PRODUCT.md](./PRODUCT.md)
- [WEBAPP.md](./WEBAPP.md)
- [USER_STORIES.md](./USER_STORIES.md)
- Seed OpenAPI skeleton: [docs/product-openapi-skeleton.yaml](./docs/product-openapi-skeleton.yaml)

## Quick start

```bash
# Local codegen tool (not committed — copy from scaffold once)
# rsync -a --exclude node_modules /path/to/zero-apps-codegen-scaffold/.codegen/ .codegen/

pnpm install
pnpm codegen:paths
pnpm lint:openapi && pnpm bundle:openapi
pnpm build
PORT=4100 pnpm --filter @kyvora/api-server start
# Health: curl http://127.0.0.1:4100/health
# Demo key: X-API-Key: kyvora_demo_local_dev_key

pnpm --filter @kyvora/webapp dev
# Console: http://127.0.0.1:5173  (proxies /v0 /v1 to :4100)
```

## Domains

| Domain | OpenAPI |
|--------|---------|
| identity | Operator auth + API keys (scaffold) |
| directory | IdP / RP membership |
| subjects | Attributes, links, refresh |
| consents | Purpose-limited grants |
| attestations | Issue / refuse / revoke |
| screening | Sanctions freshness |
| disputes | Freeze + resolve |
| settlement | Fee schedules + invoices |
| audit | Supervisory evidence packs |

## Codegen rules

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Never commit or push `.codegen/`.

See `.cursor/skills/` and `docs/CODEGEN.md`.

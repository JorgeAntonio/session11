# Kit Sesión 11 · Testing, CI/CD y despliegue

App demo mínima (Next.js 16 + TypeScript + Tailwind + Zod) para enseñar el flujo
**tests → pipeline → deploy**. No necesita Supabase ni claves: funciona sin conexión.

## Arranque

```bash
npm install
npx playwright install chromium   # una vez por máquina (~150 MB, hazlo antes de clase)
npm run dev                       # http://localhost:3000/clientes
```

## Scripts

| Comando              | Qué hace                                   |
| -------------------- | ------------------------------------------ |
| `npm run lint`       | ESLint                                     |
| `npm run typecheck`  | `tsc --noEmit`                             |
| `npm run test`       | Tests unitarios con Vitest                 |
| `npm run build`      | Build de producción                        |
| `npm run test:e2e`   | Playwright (levanta `npm start` solo; requiere build previo) |
| `npm run check`      | lint + tipos + unit + build (lo mismo que CI, sin E2E) |

Smoke test contra producción:

```bash
BASE_URL=https://tu-app.vercel.app npx playwright test
```

## Qué mirar

- `src/lib/clientes.ts` + `clientes.test.ts`: lógica pura y sus tests unitarios.
- `e2e/clientes.spec.ts`: flujo crítico E2E (registrar cliente) + health check.
- `.github/workflows/ci.yml`: pipeline de GitHub Actions.
- `src/app/api/health/route.ts`: endpoint de salud para monitoreo.
- `src/app/sitemap.ts`, `robots.ts`, `metadata` en `layout.tsx`: SEO técnico.
- `.env.example`: plantilla de variables (pública vs. privada).

## Retos: romper el pipeline a propósito

```bash
git checkout -b reto/romper-ci
git apply retos/01-bug-logica.patch   # falla: Tests unitarios (caso límite 1000)
git apply retos/02-error-tipos.patch  # falla: Type-check
git apply retos/03-error-lint.patch   # falla: Lint (any explícito)
git apply retos/04-rompe-e2e.patch    # pasa lint/tipos/unit, falla solo E2E
```

Aplica uno, haz push, abre un PR y observa en qué paso se pone rojo.
Para volver atrás: `git checkout .`

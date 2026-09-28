# Varith Pheng — portfolio

Personal site and a small Cambodian goods store, built with [Astro](https://astro.build) and Tailwind CSS v4.
Payments go through [Baray](https://baray.io) (KHQR).

## Develop

Requires Node 22.12+ (`nvm use` picks it up from `.nvmrc`).

```bash
bun install
bun run dev      # http://localhost:4321
bun run check    # type-check .astro and .ts files
bun run build    # output in .vercel/output
```

## Environment

Set in `.env.local` (or in your Vercel project settings):

| Variable        | Purpose                                                        |
| --------------- | -------------------------------------------------------------- |
| `BARAY_API_KEY` | Baray API key                                                  |
| `BARAY_SK`      | Baray AES key (base64)                                         |
| `BARAY_IV`      | Baray AES IV (base64)                                          |
| `SITE_URL`      | Optional. Public origin for the payment success redirect. Defaults to the request origin. |

## Structure

- `src/pages/` — `index`, `store`, `cart`, `order-success`, plus `api/checkout` and `api/webhook/baray` (rendered on demand)
- `src/components/` — home page sections and header/footer
- `src/data/profile.ts` — contact details, education and stack
- `src/lib/products.ts` — store catalog (the checkout API prices orders from this, not from the client)
- `src/lib/cart.ts` — cart state, persisted to `localStorage` with nanostores
- `src/styles/global.css` — design tokens and shared classes

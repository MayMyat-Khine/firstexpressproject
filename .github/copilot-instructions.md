# Copilot / AI assistant instructions for this repository

Short, actionable guidance to help an AI contributor be productive in this Express + Mongoose project.

- **Project entrypoint & run:** `npm start` runs `src/index.mjs` (ESM). MongoDB connects to `mongodb://127.0.0.1/firstexpressproject` by default. See [package.json](package.json).

- **Big picture:** lightweight REST API built with Express (v5), organized by feature: `routes/` -> `controllers/` -> `services/` -> `mongoose/schemas/`.
  - Routes mount at `src/routes/index.mjs` which imports per-resource routers (e.g., `user.mjs`, `products.mjs`, `order.mjs`).
  - Controllers validate input via `express-validator` and `utils/validate.middleware.mjs`, then call service functions.
  - Services contain business logic and DB interactions; they use Mongoose models in `src/mongoose/schemas/` and sometimes Mongo transactions/sessions.

- **Patterns & conventions (use these exactly):**
  - Validation: `checkSchema(...)` uses schemas in `src/utils/validationSchema.mjs` followed by the `validate` middleware before controller handlers (example: `src/routes/user.mjs`).
  - Mongoose models: exported as named exports `User`, `Product`, `Stock`, `Order` under `src/mongoose/schemas/*.mjs`.
  - Transactions: services that modify multiple collections use `mongoose.startSession()` + `session.startTransaction()` and call `session.commitTransaction()` or `abortTransaction()`; ensure `session` is passed to operations that accept it (see `product.service.mjs` and `order.service.mjs`).
  - Bulk updates: stock adjustments use `Stock.bulkWrite(...)` in `stock.service.mjs` — preserve the existing bulk op shape when modifying.
  - Error handling: controllers catch exceptions and respond with status `400` plus `{ message, details }` where applicable (see `order.controller.mjs`). Throw plain `Error` objects with `error.details` for structured validation failures.

- **Important files to inspect when changing behavior:**
  - Router wiring: [src/routes/index.mjs](src/routes/index.mjs)
  - Input schemas: [src/utils/validationSchema.mjs](src/utils/validationSchema.mjs)
  - Middleware: [src/utils/validate.middleware.mjs](src/utils/validate.middleware.mjs) and [src/utils/middlewares.mjs](src/utils/middlewares.mjs)
  - Controllers: `src/controllers/*.mjs` (examples: `order.controller.mjs`, `user.controller.mjs`)
  - Services: `src/services/*.mjs` (business logic and transactions)
  - Mongoose schemas: `src/mongoose/schemas/*.mjs`

- **DB and environment notes:**
  - The project expects a local MongoDB instance. No `.env` is present—hard-coded connection string is in `src/index.mjs`.
  - `package.json` has `type: "module"`; use ESM import/export when adding files.

- **Developer workflows:**
  - Start server: `npm start` (runs `src/index.mjs`).
  - There are no tests or build steps in the repo. Do not add assumptions about CI without confirmation.

- **When editing code, follow these specifics:**
  - Preserve the service -> controller response contract: controllers expect services to throw on errors; services should set `error.statusCode`/`error.details` when useful.
  - For multi-document changes (product + stock), use Mongoose sessions exactly as shown to ensure atomicity (see `createProductWithStock` in `src/services/product.service.mjs`).
  - Keep validation schemas centralized in `src/utils/validationSchema.mjs`; update routes to call `checkSchema(...)` and `validate` whenever adding new endpoints.

- **Examples to copy from:**
  - Order flow: request -> `checkSchema(createOrderValidationSchema)` -> `orderCreateController` -> `createOrderService` (validates user, products, stocks, starts transaction, saves order, updates stocks) — see: [src/controllers/order.controller.mjs](src/controllers/order.controller.mjs) and [src/services/order.service.mjs](src/services/order.service.mjs).

If any section is unclear or missing (for example, preferred error shapes, logging, or env-based DB config), tell me which area to expand and I will update this file.

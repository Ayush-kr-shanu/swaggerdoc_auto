## 📘 `README.md`

````markdown
# swaggerdoc-auto

🚀 **swaggerdoc-auto** is a plug-and-play library that generates fully automated OpenAPI (Swagger) documentation for your Node.js (TypeScript) backend using **Zod** and **zod-openapi** — with minimal setup and zero boilerplate in your route files.

---

## ✨ Features

- ✅ No manual Swagger comments
- ✅ Centralized, modular API registration
- ✅ Built on Zod + OpenAPI 3.0
- ✅ Fully typed and TS-first
- ✅ Supports `express`, `zod-openapi`, and `swagger-ui-express` internally — no need to install separately!

---

## 📦 Installation

```bash
npm install swaggerdoc-auto
````

> No need to install `zod`, `swagger-ui-express`, or `zod-openapi` — it's all included!

---

## 🚀 Quick Usage

### 1. Define your validation schema

```ts
// auth.validation.ts
import { z } from "zod";
import { withMeta } from "swaggerdoc-auto";

export const signupSchema = withMeta(
  z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  }),
  { title: "SignupSchema" }
);
```

---

### 2. Register schema and route

```ts
// auth.openapi.ts
import { registerSchema, registerPath } from "swaggerdoc-auto";
import { signupSchema } from "./auth.validation";

registerSchema("SignupSchema", signupSchema);

registerPath({
  method: "post",
  path: "/api/auth/signup",
  summary: "User Signup",
  requestBodySchema: signupSchema,
  responses: {
    201: "User created",
    400: "Validation error"
  }
});
```

---

### 3. Generate and serve Swagger docs

```ts
// app.ts
import express from "express";
import { serveSwagger } from "swaggerdoc-auto";

const app = express();

app.use(express.json());

// Mount Swagger at /docs
serveSwagger(app, {
  title: "School ERP API",
  version: "1.0.0",
  description: "Auto-generated Swagger docs",
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
```

---

## 📂 Modular Folder Example

```bash
src/
├── modules/
│   └── auth/
│       ├── auth.validation.ts
│       └── auth.openapi.ts
├── docs/
│   └── registry.ts  # Internal (handled by swaggerdoc-auto)
```

---

## 📄 License

MIT

---

## 🙌 Contributing

Pull requests and issues welcome! Let's simplify Swagger documentation together.

```
# swaggerdoc-auto

Automated Swagger documentation for Node.js/Express with support for multiple validators.

## Features

- ✅ Zero-config for Zod schemas
- 🛠️ Supports any validator via simple adapters
- 📁 Load schemas from files
- 🏗️ Modular route registration
- 🎨 Beautiful Swagger UI

## Installation

```bash
npm install swaggerdoc-auto
# or
yarn add swaggerdoc-auto
```

## Basic Usage (Zod)

```typescript
import express from 'express';
import { z } from 'zod';
import { setupSwagger } from 'swaggerdoc-auto';

const app = express();

// Define schemas
const UserSchema = z.object({
  id: z.string(),
  name: z.string()
});

// Setup Swagger
setupSwagger(app, {
  title: 'My API',
  version: '1.0.0',
  schemas: [UserSchema]
});

app.listen(3000);
```

## Using Other Validators

### Joi Example

```typescript
import Joi from 'joi';
import { setupSwagger, createJoiAdapter } from 'swaggerdoc-auto';

const joiAdapter = createJoiAdapter(Joi);
const UserSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string()
}).label('User');

setupSwagger(app, {
  title: 'My API',
  version: '1.0.0',
  schemas: [UserSchema],
  schemaAdapter: joiAdapter
});
```

### Yup Example

```typescript
import * as yup from 'yup';
import { setupSwagger, createYupAdapter } from 'swaggerdoc-auto';

const yupAdapter = createYupAdapter(yup);
const UserSchema = yup.object({
  id: yup.string(),
  name: yup.string()
}).meta({ name: 'User' });

setupSwagger(app, {
  title: 'My API',
  version: '1.0.0',
  schemas: [UserSchema],
  schemaAdapter: yupAdapter
});
```

## Advanced Usage

### Loading Schemas from File

```typescript
// schemas/user.ts
export const UserSchema = z.object({
  id: z.string(),
  name: z.string()
});

// main.ts
setupSwagger(app, {
  title: 'My API',
  version: '1.0.0',
  schemasPath: './schemas/user.ts'
});
```

### Custom Validator Adapter

```typescript
const myAdapter = {
  isSchema: (schema) => /* your validation logic */,
  getSchemaName: (schema) => /* get schema name */
};

setupSwagger(app, {
  title: 'My API',
  version: '1.0.0',
  schemaAdapter: myAdapter
});
```

### Route Registration

```typescript
// routes/user.ts
import { registry } from 'swaggerdoc-auto';

export default function registerUserRoutes() {
  registry.registerPath({
    method: 'get',
    path: '/users',
    responses: {
      200: { description: 'List of users' }
    }
  });
}

// main.ts
setupSwagger(app, {
  title: 'My API',
  version: '1.0.0',
  modules: [require('./routes/user').default]
});
```

## API Reference

### `setupSwagger(app: Express, options: SwaggerSetupOptions)`

Main setup function.

**Options:**
- `title`: API title (required)
- `version`: API version (required)
- `description?`: API description
- `docsPath?`: Path for docs (default: '/docs')
- `schemas?`: Array of schemas
- `schemasPath?`: Path to schemas file
- `modules?`: Array of route registration functions
- `schemaAdapter?`: Custom schema adapter

### Built-in Adapters
- `zodAdapter`: Default adapter for Zod
- `createJoiAdapter(joi)`: Adapter factory for Joi
- `createYupAdapter(yup)`: Adapter factory for Yup

## License

MIT
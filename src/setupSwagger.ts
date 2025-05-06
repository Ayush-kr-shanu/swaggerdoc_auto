import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { generateOpenApiDoc } from './swagger';
import type { SwaggerSetupOptions } from './types';
import { registerSchemas, setSchemaAdapter } from './registry';
import path from 'path';
import fs from 'fs';

export async function setupSwagger(app: Express, options: SwaggerSetupOptions) {
  // Set custom adapter if provided
  if (options.schemaAdapter) {
    setSchemaAdapter(options.schemaAdapter);
  }

  // Load modules if specified
  if (options.modules?.length) {
    options.modules.forEach((fn) => fn());
  }

  // Register schemas
  try {
    if (options.schemasPath) {
      const fullPath = path.resolve(process.cwd(), options.schemasPath);
      
      if (fs.existsSync(fullPath)) {
        const schemaModule = await import(fullPath);
        const schemas = Object.values(schemaModule);
        if (schemas.length) registerSchemas(schemas);
      } else {
        console.warn(`[swaggerdoc-auto] Schemas path not found: ${fullPath}`);
      }
    } else if (options.schemas) {
      registerSchemas(options.schemas);
    }
  } catch (error) {
    console.error('[swaggerdoc-auto] Error loading schemas:', error);
  }

  // Generate and serve docs
  const document = generateOpenApiDoc({
    title: options.title,
    version: options.version,
    description: options.description || '',
  });

  app.use(
    options.docsPath || '/docs', 
    swaggerUi.serve, 
    swaggerUi.setup(document)
  );
}
// setupSwagger.ts
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { generateOpenApiDoc } from "./swagger";
import { SwaggerSetupOptions } from "./types";
import { registerSchemas } from "./registry";
import path from "path";
import fs from "fs";

export async function setupSwagger(app: Express, options: SwaggerSetupOptions) {
  if (options.modules?.length) {
    options.modules.forEach((fn) => fn());
  }

  try {
    if (options.schemasPath) {
      const fullPath = path.resolve(process.cwd(), options.schemasPath);

      if (!fs.existsSync(fullPath)) {
        console.warn(`[swaggerdoc-auto] Warning: schemasPath "${fullPath}" does not exist.`);
      } else {
        const schemaModule = await import(fullPath);
        const schemas = Object.values(schemaModule);

        if (!schemas.length) {
          console.warn(`[swaggerdoc-auto] Warning: No exports found in "${fullPath}".`);
        } else {
          registerSchemas(schemas as any[]);
        }
      }
    } else if (options.schemas) {
      registerSchemas(options.schemas);
    } else {
      console.warn("[swaggerdoc-auto] Warning: No schemas or schemasPath provided. Swagger will not include models.");
    }
  } catch (error) {
    console.error(`[swaggerdoc-auto] Failed to load schemas from path "${options.schemasPath}":`, error);
  }

  const document = generateOpenApiDoc({
    title: options.title,
    version: options.version,
    description: options.description || "",
  });

  app.use(options.docsPath || "/docs", swaggerUi.serve, swaggerUi.setup(document));
}
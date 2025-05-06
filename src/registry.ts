import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export const registry = new OpenAPIRegistry();

export function registerSchemas(schemas: any[]) {
  schemas.forEach((schema) => {
    const refId = schema.constructor.name;
    registry.register(refId, schema);
  });
}

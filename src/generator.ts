import { OpenApiGeneratorV31, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { RouteConfig } from './types';

// Type guard to check if a schema is a ZodObject
const isZodObject = (schema: unknown): schema is z.ZodObject<any> => {
  return (
    typeof schema === 'object' &&
    schema !== null &&
    '_def' in schema &&
    'shape' in schema &&
    typeof (schema as any).shape === 'object'
  );
};

export function generateSpec(routes: RouteConfig[], options: {
  title: string;
  version: string;
}) {
  const registry = new OpenAPIRegistry();

  routes.forEach(route => {
    const requestBody = route.schema?.body && isZodObject(route.schema.body) ? {
      content: {
        'application/json': { schema: route.schema.body }
      }
    } : undefined;

    const queryParams = route.schema?.query && isZodObject(route.schema.query) ? 
      route.schema.query : undefined;

    const pathParams = route.schema?.params && isZodObject(route.schema.params) ? 
      route.schema.params : undefined;

    const responseSchema = route.schema?.response && isZodObject(route.schema.response) ? {
      description: 'Successful response',
      content: {
        'application/json': { schema: route.schema.response }
      }
    } : undefined;

    registry.registerPath({
      method: route.method,
      path: route.path,
      request: {
        body: requestBody,
        query: queryParams,
        params: pathParams
      },
      responses: {
        200: responseSchema || { description: 'No response schema provided' }
      }
    });
  });

  return new OpenApiGeneratorV31(registry.definitions).generateDocument({
    openapi: '3.1.0',
    info: {
      title: options.title,
      version: options.version
    },
    servers: [{ url: '/' }]
  });
}
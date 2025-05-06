import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import type { SchemaAdapter } from './types';

const defaultAdapter: SchemaAdapter = {
  isSchema: (schema: unknown): schema is object => {
    return !!schema && typeof schema === 'object' && '_def' in schema;
  },
  getSchemaName: (schema: object) => {
    return (schema as any).constructor?.name || 'AnonymousSchema';
  }
};

let registryInstance: OpenAPIRegistry;
let currentAdapter: SchemaAdapter = defaultAdapter;

export function initializeRegistry(adapter?: SchemaAdapter) {
  registryInstance = new OpenAPIRegistry();
  if (adapter) currentAdapter = adapter;
  return registryInstance;
}

export function registerSchemas(schemas: any[]) {
  if (!registryInstance) initializeRegistry();
  
  schemas.forEach((schema) => {
    if (currentAdapter.isSchema(schema)) {
      const refId = currentAdapter.getSchemaName(schema);
      registryInstance.register(refId, schema);
    }
  });
}

export function getRegistry() {
  if (!registryInstance) initializeRegistry();
  return registryInstance;
}

export function setSchemaAdapter(adapter: SchemaAdapter) {
  currentAdapter = adapter;
}
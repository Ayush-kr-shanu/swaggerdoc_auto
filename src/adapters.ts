import type { SchemaAdapter } from './types';

export const zodAdapter: SchemaAdapter = {
  isSchema: (schema: unknown): schema is object => 
    !!schema && typeof schema === 'object' && '_def' in schema,
  getSchemaName: (schema: object) => 
    (schema as any).constructor?.name || 'ZodSchema'
};

export function createJoiAdapter(joi: any): SchemaAdapter {
  return {
    isSchema: (schema: unknown): schema is object => 
      joi.isSchema(schema),
    getSchemaName: (schema: object) => 
      (schema as any).describe().flags?.label || 'JoiSchema'
  };
}

export function createYupAdapter(yup: any): SchemaAdapter {
  return {
    isSchema: (schema: unknown): schema is object => 
      yup.isSchema(schema),
    getSchemaName: (schema: object) =>
      ((schema as any).spec?.meta as any)?.name || 'YupSchema'
  };
}
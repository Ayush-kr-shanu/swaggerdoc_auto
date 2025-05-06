export interface SchemaAdapter<T = any> {
  isSchema: (schema: unknown) => schema is T;
  getSchemaName: (schema: T) => string;
}

export interface SwaggerSetupOptions {
  title: string;
  version: string;
  description?: string;
  docsPath?: string;
  schemas?: any[];
  schemasPath?: string;
  modules?: (() => void)[];
  schemaAdapter?: SchemaAdapter;
}
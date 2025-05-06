export { setupSwagger } from './setupSwagger';
export { 
  getRegistry as registry, 
  initializeRegistry, 
  registerSchemas, 
  setSchemaAdapter 
} from './registry';
export type { SchemaAdapter, SwaggerSetupOptions } from './types';
export { 
    zodAdapter, 
    createJoiAdapter, 
    createYupAdapter 
  } from './adapters';
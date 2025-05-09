import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { scanRoutes, registerRoute } from './scanner';
import { generateSpec } from './generator';
import { SwaggerOptions, RouteConfig } from './types';

export function setupSwagger(app: Express, options: SwaggerOptions) {
  const routes = scanRoutes(app);

  const spec = generateSpec(routes, {
    title: options.title,
    version: options.version
  });

  app.use(options.docsPath || '/docs', swaggerUi.serve, swaggerUi.setup(spec));
}

export function ApiEndpoint(config: Omit<RouteConfig, 'method'>) {
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      args[0].schema = config.schema;
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}
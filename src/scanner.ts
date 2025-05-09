import { Express } from 'express';
import { z } from 'zod';
import { RouteConfig, HttpMethod } from './types';

const routes: RouteConfig[] = [];

interface ExpressLayer {
  route?: {
    path: string;
    methods: Record<HttpMethod, boolean>;
    stack: Array<{
      handle?: { schema?: unknown };
      schema?: unknown;
    }>;
  };
}

export function scanRoutes(app: Express): RouteConfig[] {
  (app._router.stack as ExpressLayer[]).forEach((layer) => {
    if (layer?.route) {
      const path = layer.route.path;
      const method = Object.keys(layer.route.methods)[0] as HttpMethod;

      const schemaMiddleware = layer.route.stack.find(middleware => 
        (middleware.handle?.schema !== undefined) || 
        (middleware.schema !== undefined)
      );

      if (schemaMiddleware) {
        const zodSchema = (schemaMiddleware.handle?.schema ?? schemaMiddleware.schema) as z.ZodTypeAny;
        
        registerRoute({ 
          method,
          path,
          schema: { body: zodSchema }
        });
      }
    }
  });
  return routes;
}

export function registerRoute(config: RouteConfig) {
  routes.push(config);
}
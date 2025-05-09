import { z } from 'zod';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

export interface RouteSchema {
  body?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
  response?: z.ZodTypeAny;
}

export interface RouteConfig {
  method: HttpMethod;
  path: string;
  schema?: RouteSchema;
}

export interface SwaggerOptions {
  title: string;
  version: string;
  docsPath?: string;
}
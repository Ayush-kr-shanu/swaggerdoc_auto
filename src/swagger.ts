import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { getRegistry } from './registry';

export function generateOpenApiDoc(info: {
  title: string;
  version: string;
  description?: string;
}) {
  const generator = new OpenApiGeneratorV3(getRegistry().definitions);
  return generator.generateDocument({
    openapi: '3.0.0',
    info,
    servers: [{ url: '/' }],
  });
}
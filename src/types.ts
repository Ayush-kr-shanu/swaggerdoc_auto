import { ZodTypeAny } from "zod";

export interface SwaggerSetupOptions {
  title: string;
  version: string;
  description?: string;
  docsPath?: string;
  schemas?: ZodTypeAny[];
  schemasPath?: string;
  modules?: (() => void)[];
}
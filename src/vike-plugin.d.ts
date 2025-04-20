// Declarações de módulo para Vike

declare module 'vike/plugin' {
  import type { Plugin } from 'vite';
  const vike: (options?: any) => Plugin;
  export default vike;
}

declare module 'vike/server' {
  export function escapeInject(
    template: TemplateStringsArray,
    ...args: any[]
  ): string;
  export function dangerouslySkipEscape(html: string): string;
}

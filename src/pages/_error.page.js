import { escapeInject } from 'vike/server';

export function onRenderHtml({ error }) {
  const title = 'Erro';
  const message = error?.message ?? 'Ocorreu um erro inesperado';
  const documentHtml = escapeInject`<!DOCTYPE html>
<html lang="pt-BR">
  <head><title>${title}</title></head>
  <body style="font-family: sans-serif; padding: 2rem;">
    <h1>${title}</h1>
    <p>${message}</p>
  </body>
</html>`;
  return { documentHtml };
}

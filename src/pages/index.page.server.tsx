import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { escapeInject, dangerouslySkipEscape } from 'vike/server';

export async function render(pageContext: {
  Page: React.FC;
  pageProps: any;
  documentProps?: { title?: string };
}) {
  const { Page, pageProps, documentProps } = pageContext;
  const appHtml = ReactDOMServer.renderToString(<Page {...pageProps} />);
  const title = documentProps?.title || 'BarberShop';
  return escapeInject`<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <title>${title}</title>
  </head>
  <body>
    <div id="root">${dangerouslySkipEscape(appHtml)}</div>
    <script type="module" src="/_page.client.js"></script>
  </body>
</html>`;
}

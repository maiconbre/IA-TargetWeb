import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import '../index.css';

export function render({ Page, pageProps }: { Page: React.FC; pageProps: any }) {
  hydrateRoot(document.getElementById('root')!, <Page {...pageProps}/>)
}
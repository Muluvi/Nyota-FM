import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource-variable/dm-sans/wght.css';
import './index.css';
import './print.css';
import { initLite } from './lib/lite';

initLite();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

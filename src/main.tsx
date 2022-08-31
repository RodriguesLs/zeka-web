import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import makeServer from '@/services/mirage';
import GlobalStyles from '@/styles/global';

if (import.meta.env.DEV) makeServer();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
    <GlobalStyles />
  </React.StrictMode>,
);

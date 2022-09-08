import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import makeServer from '@/services/mirage';
import GlobalStyles from '@/styles/global';

makeServer();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
    <GlobalStyles />
  </React.StrictMode>,
);

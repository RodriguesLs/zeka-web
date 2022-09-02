import { createServer } from 'miragejs';

import apiAuthHandlers from './auth/server';

const makeServer = () => {
  return createServer({
    routes() {
      this.namespace = '/mirage';
      this.timing = 500;

      apiAuthHandlers(this);

      this.namespace = '';
      this.passthrough();
    },
  });
};

export default makeServer;

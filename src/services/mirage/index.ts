import { createServer } from 'miragejs';

import apiAuthHandlers from './auth/server';

const makeServer = () => {
  return createServer({
    routes() {
      this.namespace = '/mirage';
      this.timing = 500;

      apiAuthHandlers(this);

      this.get('/licenses', (_, request) => {
        return [
          {
            id: 1,
            code: 'asdsd1',
            name: 'Premium',
            expiration_date: new Date(),
            total_uses: 12,
            available_uses: 15,
            active: true,
          },
          {
            id: 2,
            code: 'asdavc34',
            name: 'Basic',
            expiration_date: new Date(),
            total_uses: 22,
            available_uses: 5,
            active: false,
          },
        ];
      });

      this.namespace = '';
      this.passthrough();
    },
  });
};

export default makeServer;

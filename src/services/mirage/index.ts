import { ActiveModelSerializer, createServer, Factory, Model } from 'miragejs';
import { faker } from '@faker-js/faker';

import { ILicense } from '@/pages/Licenses/types';

import apiAuthHandlers from './auth/server';

const makeServer = () => {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
    models: {
      license: Model.extend<Partial<ILicense>>({}),
    },
    factories: {
      license: Factory.extend({
        id(i: number) {
          return i;
        },
        code() {
          return faker.datatype.uuid();
        },
        name() {
          return faker.name.jobArea();
        },
        expiration_date() {
          return faker.date.future();
        },
        total_uses() {
          return faker.datatype.number();
        },
        available_uses() {
          return faker.datatype.number();
        },
        status() {
          return faker.datatype.boolean();
        },
      }),
    },

    seeds(server) {
      server.createList('license', 5);
    },

    routes() {
      this.namespace = '/mirage';
      this.timing = 500;

      apiAuthHandlers(this);

      this.get('/licenses', function (schema, request) {
        const licenses = this.serialize(schema.all('license')).licenses;

        return licenses;
      });

      this.namespace = '';
      this.passthrough();
    },
  });

  return server;
};

export default makeServer;

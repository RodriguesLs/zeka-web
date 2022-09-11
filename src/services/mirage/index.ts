import { ActiveModelSerializer, createServer, Model } from 'miragejs';

import { ILicense } from '@/pages/Licenses/types';

import apiAuthHandlers from './auth/server';
import factoryLicenses from './factories/licenses';
import factoryStudents from './factories/students';

const makeServer = () => {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
    models: {
      license: Model.extend<Partial<ILicense>>({}),
      student: Model.extend<Partial<any>>({}),
    },
    factories: {
      license: factoryLicenses,
      student: factoryStudents,
    },

    seeds(server) {
      server.createList('license', 5);
      server.createList('student', 15);
    },

    routes() {
      this.namespace = '/mirage';
      this.timing = 2000;

      apiAuthHandlers(this);

      this.get('/students', function (schema, _) {
        const students = this.serialize(schema.all('student')).students;

        return students;
      });

      this.get('/licenses', function (schema, _) {
        const licenses = this.serialize(schema.all('license')).licenses;

        return licenses;
      });

      this.post('/licenses', () => {
        return [];
      });

      this.namespace = '';
      this.passthrough();
    },
  });

  return server;
};

export default makeServer;

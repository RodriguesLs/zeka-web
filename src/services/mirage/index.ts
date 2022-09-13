import { ActiveModelSerializer, createServer, Model } from 'miragejs';

import apiAuthHandlers from './auth/server';
import factoryLicenses from './factories/licenses';
import factoryStudents from './factories/students';

const makeServer = () => {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
    models: {
      license: Model.extend<Partial<any>>({}),
      student: Model.extend<Partial<any>>({}),
    },
    factories: {
      license: factoryLicenses,
      student: factoryStudents,
    },

    seeds(server) {
      server.createList('license', 12);
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

      this.get('/students/:userId', function (schema, request) {
        const { userId } = request.params;

        const idFormatted = String(userId);

        const { student: user } = this.serialize(schema.find('student', idFormatted));

        return user;
      });

      this.post('/students', (schema, request) => {
        const data = JSON.parse(request.requestBody);
        const { data: student } = data;
        schema.create('student', student);
        return {};
      });

      this.put('/students/:userId', (_, request) => {
        const data = JSON.parse(request.requestBody);

        return data;
      });

      this.get('/licenses', function (schema, _) {
        const licenses = this.serialize(schema.all('license')).licenses;

        return licenses;
      });

      this.get('/licenses/:licenseId', function (schema, request) {
        const { licenseId } = request.params;

        const idFormatted = String(licenseId);

        const { license } = this.serialize(schema.find('license', idFormatted));

        return license;
      });

      this.post('/licenses', (schema, request) => {
        const data = JSON.parse(request.requestBody);
        const { license } = data;
        schema.create('license', { ...license, total_uses: 0 });
        return {};
      });

      this.put('/licenses/:licenseId', (_, request) => {
        const data = JSON.parse(request.requestBody);

        return data;
      });

      this.namespace = '';
      this.passthrough();
    },
  });

  return server;
};

export default makeServer;

import { createServer, Response } from 'miragejs';

interface User {
  email: string;
  password: string;
}

const user = {
  email: 'a@a.com',
  password: '123123',
} as User;

const makeServer = () => {
  return createServer({
    routes() {
      this.namespace = 'mirage';
      this.timing = 500;

      this.post('*', () => {
        return new Response(404, { message: 'Erro ao tentar acessar API' });
      });

      this.get('/me', () => {
        return user;
      });

      this.post('/refresh_token', (_, request) => {
        const { refreshToken } = JSON.parse(request.requestBody);
        return refreshToken + 1;
      });

      this.post('/sessions', (_, request) => {
        const body = JSON.parse(request.requestBody);
        const token = 'batata';

        const { email, password } = body;

        if (email === user.email && password === user.password) {
          return { user: body, token };
        }

        return new Response(204, { message: 'User not found or Password does not match' });
      });

      this.post('/signup', () => {
        return new Response(200, { message: 'User created successful!' });
      });

      this.namespace = '';
      this.passthrough();
    },
  });
};

export default makeServer;

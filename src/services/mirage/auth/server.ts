import { Response, Server } from 'miragejs';
import { generateJwtAndRefreshToken } from './auth';
import { users, seedUserStore } from './database';

const apiAuthHandlers = (server: Server) => {
  seedUserStore();

  server.post('/sessions', (_, request) => {
    const { requestBody } = request;

    const { email, password } = JSON.parse(requestBody);

    const user = users.get(email);

    if (!user || password !== user.password) {
      return new Response(
        401,
        {},
        {
          message: 'User not found or password does not match',
        },
      );
    }

    const { token, refreshToken } = generateJwtAndRefreshToken(email);

    const { password: p, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
      refreshToken,
    };
  });

  server.post('/refresh', (_, request) => {
    const { token, refreshToken: newRefreshToken } = generateJwtAndRefreshToken('a@a.com');

    return {
      token,
      refreshToken: newRefreshToken,
    };
  });

  server.get('/me', (_, request) => {
    const user: any = users.get('a@a.com') ?? {};

    const { password, ...rest } = user;

    const userWithoutPassword = rest;

    return userWithoutPassword;
  });

  server.post('/signup', () => {
    return new Response(200, {}, { message: 'User created successful!' });
  });
};

export default apiAuthHandlers;

import jwtSign from 'jwt-encode';

const auth = {
  secret: 'mirage-test',
  expiresIn: 10000,
};

export const generateJwtAndRefreshToken = (email: string, payload: object = {}) => {
  const exp = auth.expiresIn;

  const token = jwtSign({ exp, ...payload }, auth.secret, {
    sub: email,
  });

  return {
    token,
    refreshToken: 'batata',
  };
};

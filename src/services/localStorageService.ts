interface SignInParams {
  token: string;
  refreshToken: string;
}

function localStorageService() {
  return {
    setItem: (suffix: string, value: string) => localStorage.setItem(`@Zeka:${suffix}`, value),
    getItem: (suffix: string) => localStorage.getItem(`@Zeka:${suffix}`),
    getToken: localStorage.getItem('@Zeka:token'),
    getRefreshToken: localStorage.getItem('@Zeka:refreshToken'),
    signIn: ({ token, refreshToken }: SignInParams) => {
      localStorage.setItem('@Zeka:token', token);
      localStorage.setItem('@Zeka:refreshToken', refreshToken);
    },
    signOut: () => {
      localStorage.removeItem('@Zeka:token');
      localStorage.removeItem('@Zeka:refreshToken');
    },
  };
}

export default localStorageService;

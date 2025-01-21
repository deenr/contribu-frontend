export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh',
    LOGOUT: '/auth/logout'
  },
  GIT: {
    INTEGRATION_STATUSES: '/providers/status',
    REPOSITORIES: (platform: string) => `/provider/${platform.toLowerCase()}/repositories`,
    CONTRIBUTORS: (platform: string, repository: string) => `/provider/${platform.toLowerCase()}/${repository}/contributors`
  },
  OAUTH: {
    AUTHORIZE: (provider: string, code: string) => `/oauth/${provider}/callback?code=${code}`,
    AUTHORIZATION_URL: (provider: string) => `/oauth/${provider.toLowerCase()}/authorize`,
    DEAUTHORIZE: (provider: string) => `/oauth/${provider.toLowerCase()}/deauthorize`
  },
  USER: {
    PROFILE: '/user/me'
  }
};

export const API_TIMEOUT = 5000;

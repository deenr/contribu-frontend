const config = {
  development: {
    BASE_URL: 'http://localhost:8080/api'
  },
  production: {
    BASE_URL: 'https://api.contribu.me/api'
  }
};

export const envConfig = config[(import.meta.env.MODE as 'production' | 'development') || 'development'];

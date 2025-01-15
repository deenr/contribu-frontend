import { API_ROUTES } from '@/config/api-config';
import axiosInstance from '@/services/axios-instance';
import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';

type AuthProviderState = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const initialState: AuthProviderState = {
  token: null,
  setToken: () => null
};

const AuthContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children, navigateToLogin }: Readonly<{ children: React.ReactNode; navigateToLogin: () => void }>) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axiosInstance.get(API_ROUTES.REFRESH_TOKEN);

        setToken(response.data.data);
      } catch (error) {
        navigateToLogin();

        setToken(null);
      }
    };

    fetchAccessToken();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        config.headers.Authorization = !(config as any)._retry && token ? `Bearer ${token}` : config.headers.Authorization;
        return config;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.data === 'Forbidden' && error.response.status === 403) {
          navigateToLogin();
        }

        const originalRequest = error.config;
        if (error.response.data === 'Unauthorized' && error.response.status === 401) {
          originalRequest._retry = true;

          try {
            const response = await axiosInstance.get('');
            originalRequest.headers.Authorization = `Bearer ${response.data}`;

            return axiosInstance(originalRequest);
          } catch (refreshError) {
            setToken(null);
          }

          return Promise.reject(error);
        }
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(refreshInterceptor);
    };
  });

  const contextValue = useMemo(
    () => ({
      token,
      setToken
    }),
    [token]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) throw new Error('useAuth must be used within a AuthProvider');

  return context;
};

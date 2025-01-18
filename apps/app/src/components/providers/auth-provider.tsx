import { API_ROUTES } from '@/config/api-config';
import axiosInstance from '@/services/axios-instance';
import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';

const AUTH_TOKEN = 'contribu.auth-token';

type AuthProviderState = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const initialState: AuthProviderState = {
  token: null,
  setToken: () => null
};

const AuthContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children, navigateToLogin }: { children: React.ReactNode; navigateToLogin: () => void }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(AUTH_TOKEN));

  const updateToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem(AUTH_TOKEN, newToken);
    } else {
      localStorage.removeItem(AUTH_TOKEN);
    }
    setToken(newToken);
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (!localStorage.getItem(AUTH_TOKEN)) {
        try {
          const { data } = await axiosInstance.get(API_ROUTES.REFRESH_TOKEN);
          updateToken(data.token);
        } catch (error) {
          navigateToLogin();
          updateToken(null);
        }
      }
    };

    fetchAccessToken();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = token ? `Bearer ${token}` : config.headers.Authorization;
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosInstance.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          const originalRequest = error.config;

          if (!originalRequest._retry) {
            originalRequest._retry = true;

            try {
              const { data } = await axiosInstance.get(API_ROUTES.REFRESH_TOKEN);
              updateToken(data.token);
              originalRequest.headers.Authorization = `Bearer ${data.token}`;
              return axiosInstance(originalRequest);
            } catch (refreshError) {
              navigateToLogin();
              updateToken(null);
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(refreshInterceptor);
    };
  }, [token]);

  const contextValue = useMemo(() => ({ token, setToken: updateToken }), [token]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) throw new Error('useAuth must be used within a AuthProvider');

  return context;
};

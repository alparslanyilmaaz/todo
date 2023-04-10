import axios, { AxiosInstance } from 'axios';
import _set from 'lodash/set';
import { ReactNode, createContext, useContext } from 'react';

const axiosInstance = axios.create();

export interface AxiosSettings {
  redirectUrl: string;
  headers?: {
    [key: string]: string;
  }
}

const addInterceptors = (
  settings: AxiosSettings,
) => {
  axiosInstance.interceptors.request.use((conf) => {
    const accessToken = localStorage.getItem('token');

    if (accessToken) {
      _set(conf, ['headers', 'authorization'], `${accessToken}`);
    }

    return conf;
  });

  axiosInstance.interceptors.response.use(
    null,
    async (error) => {
      const { response } = error;
      if (response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = settings.redirectUrl;
      }

      throw error;
    }
  );
}

const AxiosContext = createContext<AxiosInstance>(axiosInstance);

interface ProviderProps {
  settings: AxiosSettings;
  children: ReactNode;
}

export const AxiosProvider = ({
  children,
  settings
}: ProviderProps) => {
  addInterceptors(settings);

  return <AxiosContext.Provider value={axiosInstance}>
    {children}
  </AxiosContext.Provider>
}

export const useAxios = () => useContext(AxiosContext);
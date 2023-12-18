import axios, { AxiosInstance } from 'axios';
import { ClientConstant } from '../core/domain/shared/constants/client.contant';

export interface AxiosConfig {
  init: (name: ClientConstant, opts: AxiosConfigInitOptions) => void;
  clients: {
    [key in ClientConstant]: AxiosInstance;
  };
}

export interface AxiosConfigInitOptions {
  baseURL?: string;
  timeout?: number;
  headers?: any;
}


const axiosConfig = (): AxiosConfig => {
  const clients = {} as AxiosConfig['clients'];


  const init = (name: ClientConstant ,opts: AxiosConfigInitOptions) => {
    clients[name] = axios.create({
      baseURL: opts.baseURL,
      timeout: opts.timeout,
      headers: opts.headers
    });
  };

  return {
    clients,
    init
  };
}

export default axiosConfig;
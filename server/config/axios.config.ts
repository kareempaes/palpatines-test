import axios, { AxiosInstance } from 'axios';
import { ClientConstant } from '../core/domain/shared/constants/client.contant';

export interface AxiosConfig {
  init: (opts: AxiosConfigInitOptions) => void;
  clients: Map<keyof typeof ClientConstant, AxiosInstance>;
}

export interface AxiosConfigInitOptions {
  baseURL: string;
  timeout: number;
  headers: any;
}


const axiosConfig = async () => {
  const clients = {};


  const init = (name: keyof typeof ClientConstant ,opts: AxiosConfigInitOptions) => {
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
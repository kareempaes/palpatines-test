import express from 'express';
import { AxiosConfig } from './axios.config';
import { ClientConstant } from '../core/domain/shared/constants/client.contant';

export interface ServerConfig {
  start: () => void;
}

export interface ServerConfigOptions {
  axiosConfig: AxiosConfig;
}

const server = (opts: ServerConfigOptions ): ServerConfig => {
  const app = express();

  // Init axios client
  opts.axiosConfig.init(ClientConstant.SWAPI, {
    baseURL: process.env.SWAPI_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  // Init palpatine client
  opts.axiosConfig.init(ClientConstant.PALPATINE, {
    baseURL: process.env.PALPATINES_CONVENIENT_API_URL,
    // timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-key': process.env.PALPATINES_CONVENIENT_API_KEY,
    },
  });


  app.get('/_health', (req, res) => {
    res.send('OK');
  });

  app.get('/api/v1/characters', (req, res) => {

  });

  const start = () => {
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  };

  return {
    start,
  };
}

export default server;


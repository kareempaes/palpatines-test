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
  opts.axiosConfig.init(ClientConstant.SWAPI, {});

  // Init palpatine client
  opts.axiosConfig.init(ClientConstant.PALPATINE, {});


  app.get('/_health', (req, res) => {
    res.send('OK');
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


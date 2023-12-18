import express from 'express';
import { AxiosConfig } from './axios.config';
import { ClientConstant } from '../core/domain/shared/constants/client.contant';
import { CitizenUseCase } from '../core/use-case/citizen.use-case';

export interface ServerConfig {
  app: express.Application;
  start: () => void;
}

export interface ServerConfigOptions {
  axiosConfig: AxiosConfig;
  citizenUseCase: CitizenUseCase;
}

const server = (opts: ServerConfigOptions ): ServerConfig => {
  
  const app = express();

  // Init axios client
  opts.axiosConfig.init(ClientConstant.SWAPI, {
    timeout: 5000,
    baseURL: process.env.SWAPI_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  // Init palpatine client
  opts.axiosConfig.init(ClientConstant.PALPATINE, {
    baseURL: process.env.PALPATINES_CONVENIENT_API_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-key': process.env.PALPATINES_CONVENIENT_API_KEY,
    },
  });


  app.get('/_health', (req, res) => {
    res.send('OK');
  });

  app.get('/api/citizen', async (req, res) => {
    const citizens = await opts.citizenUseCase.getCitizenList()
    
    res.json(
      citizens
    );
  });

  app.get('/api/citizen/write', async (req, res) => {
    
    await opts.citizenUseCase.writeToCitizenInfo();

    res.json({
      message: 'OK'
    });
  });

  const start = () => {
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  };

  return {
    start,
    app,
  };
}

export default server;


import dotenv from 'dotenv';
import container from './DI/awilix';
import { ServerConfig } from '../../config/server.config';
import { dirname } from 'node:path';
import { CitizenRepository } from '../../core/repository/citizen.repository';
import { PalpatineService } from '../../core/service/palpatine.service';

dotenv.config();

const server = container.resolve<ServerConfig>('serverConfig');

const repository = container.resolve<CitizenRepository>('citizenRepository');

const palpatineService = container.resolve<PalpatineService>('palpatineService');

repository.getSecretCitizenList().then((data) => {
  palpatineService.decrypt(data).then((decrypted) => {
    console.log(decrypted);
  });
});

server.start();

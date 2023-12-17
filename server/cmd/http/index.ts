import dotenv from 'dotenv';
import container from './DI/awilix';
import { ServerConfig } from '../../config/server.config';
import { dirname } from 'node:path';
import { CitizenRepository } from '../../core/repository/citizen.repository';
import { PalpatineService } from '../../core/service/palpatine.service';
import { CitizenUseCase } from '../../core/use-case/citizen.use-case';

dotenv.config();

const server = container.resolve<ServerConfig>('serverConfig');

const citizenUseCase = container.resolve<CitizenUseCase>('citizenUseCase');

const data = citizenUseCase.getCitizenList()
.then((citizens) => {
  citizenUseCase.writeToCitizenInfo(citizens);
})


server.start();

import dotenv from 'dotenv';
import container from './DI/awilix';
import { ServerConfig } from '../../config/server.config';

dotenv.config();

const server = container.resolve<ServerConfig>('serverConfig');

server.start();

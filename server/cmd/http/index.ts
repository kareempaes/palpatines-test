import dotenv from 'dotenv';
import container from './DI/awilix';
import { ServerConfig } from '../../config/server.config';

dotenv.config();

const server = container.resolve<ServerConfig>('serverConfig');

console.log('Starting server...');
console.log(server);

server.start();

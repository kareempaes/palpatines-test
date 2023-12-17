import dotenv from 'dotenv';
import container from './DI/awilix';

dotenv.config();

const server = container.resolve('server.config');

server.start();

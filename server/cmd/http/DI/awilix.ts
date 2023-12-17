import { Lifetime, asFunction, createContainer } from 'awilix';
import server from '../../../config/server.config';
import axiosConfig from '../../../config/axios.config';
import citizenRepository from '../../../core/repository/citizen.repository';
import swapiService from '../../../core/service/swapi.service';
import palpatineService from '../../../core/service/palpatine.service';
import cleanService from '../../../core/service/clean.service';

// Create container
const container = createContainer();

// Register
container.register({
  // Our server is a scoped dependency, so we can use Lifetime.SCOPED.
  // This means that every time we call container.resolve('server') within another function,
  // That same instance will be reused just for that function.
  'serverConfig': asFunction(server).scoped(),
  // Our config is a singleton, so we use Lifetime.SINGLETON.
  // This means that every time we call container.resolve('server.config'),
  // we'll get the same instance.
  'axiosConfig': asFunction(axiosConfig).singleton(),
  'cleanService': asFunction(cleanService).singleton(),
  'palpatineService': asFunction(palpatineService).singleton(),
  'swapiService': asFunction(swapiService).singleton(),
  'citizenRepository': asFunction(citizenRepository).singleton(),
});

export default container;

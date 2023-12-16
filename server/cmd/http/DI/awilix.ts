import { createContainer } from 'awilix';

// Create container
const container = createContainer();

// Load modules
container.loadModules([
  '../../config/*.config.ts',
  '../../core/service/*.service.ts',
  '../../core/repository/*.repository.ts',
  '../../core/use-case/*.use-case.ts',
]);

export default container;

import { Lifetime, asFunction, createContainer } from 'awilix';

// Create container
const container = createContainer();

// Load modules
container.loadModules([ // Could be an array of globs with regex e.g. modules/**/*.js
  '../../config/*.config.ts',
  '../../core/service/*.service.ts',
  '../../core/repository/*.repository.ts',
  '../../core/use-case/*.use-case.ts',
], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    register: asFunction,
  },
});

export default container;

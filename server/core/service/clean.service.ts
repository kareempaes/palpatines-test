import Citizen from "../domain/entity/citizen";
import async, { AsyncResultIteratorPromise } from 'async';

export interface CleanService {
  sanitize: (entityList: Citizen[]) => Citizen[];
  arrWorker: <T, V>(arr: T[], cb: async.AsyncResultIterator<T, V, Error>) => Promise<Record<string, T[]>>
}

export interface CleanServiceOptions {
  
}

const cleanService = (opts: CleanServiceOptions): CleanService => {

  const sanitize = (entityList: Citizen[]): any => {
    
    // remove empty values
    const cleanList = entityList.filter((entity) => {
      return entity.name !== '';
    });


    // remove duplicates
    const uniqueList = cleanList.filter((entity, index, self) => {
      return index === self.findIndex((e) => (
        e.name === entity.name
      ));
    });

    return uniqueList;
  }

  const arrWorker = async <T, V>(arr: T[], cb: async.AsyncResultIterator<T, V, Error>) => {
    const val =  await async.groupBy(arr, cb);
    return  val;
  };

  return {
    sanitize,
    arrWorker,
  };
};

export default cleanService;
import Citizen from "../domain/entity/citizen";

export interface CleanService {
  sanitize: (entityList: Citizen[]) => Citizen[];
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

  return {
    sanitize,
  };
};

export default cleanService;
import Citizen from "../domain/entity/citizen";
import { CitizenRepository } from "../repository/citizen.repository";
import HomeWorld from "../repository/dto/home-world";
import { CleanService } from "../service/clean.service";
import { PalpatineService } from "../service/palpatine.service";
import { SwapiService } from "../service/swapi.service";

export interface CitizenUseCase {
  getCitizenList: () => Promise<Citizen[]>;
  writeToCitizenInfo: () => any;
}

export interface CitizenUseCaseOptions {
  citizenRepository: CitizenRepository;
  palpatineService: PalpatineService;
  cleanService: CleanService;
  swapiService: SwapiService;
}

const citizenUseCase = (opts: CitizenUseCaseOptions): CitizenUseCase => {

  const getCitizenList = async () => {

    const encryptedCitizenData = await opts.citizenRepository.getSecretCitizenList();
    const decryptedCitizenData = await opts.palpatineService.decrypt(encryptedCitizenData);

    return opts.cleanService.sanitize(decryptedCitizenData.map((citizen) => {
      return {
        ...JSON.parse(citizen)
      } as Citizen;
    }));
  };

  const writeToCitizenInfo = async () => {
    const data = await getCitizenList();
    
    const newData = await opts.cleanService.arrWorker(data,  (citizen, callback) => {
      citizen.homeworld = citizen.homeworld.replace('.co', '.dev');
      callback(null, citizen.homeworld);  
    });


    const homeWorlds: HomeWorld[] = [];
    const planets: Array<{url: string, name: string}> = [
      {url: 'https://swapi.dev/api/planets/1/', name: 'Tatooine'},
    ]
    // const planets = await opts.swapiService.getHomeWorld('https://swapi.co/api/planets/');

    for (const planet of planets) {
      if (!newData[planet.url]) {
        continue;
      }

      const citizens = newData[planet.url]
      .map((citizen) => citizen.name);
      
      const homeWorld = {
        homeworld: planet.name as string,
        citizens: citizens
      } as HomeWorld;

      homeWorlds.push(homeWorld);
    }

    console.log(homeWorlds);
    opts.citizenRepository.writeToCitizenInfo(homeWorlds);
  };

  return {
    getCitizenList,
    writeToCitizenInfo,
  };
};

export default citizenUseCase;
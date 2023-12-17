import Citizen from "../domain/entity/citizen";
import { CitizenRepository } from "../repository/citizen.repository";
import { CleanService } from "../service/clean.service";
import { PalpatineService } from "../service/palpatine.service";

export interface CitizenUseCase {
  getCitizenList: () => Promise<Citizen[]>;
}

export interface CitizenUseCaseOptions {
  citizenRepository: CitizenRepository;
  palpatineService: PalpatineService;
  cleanService: CleanService;
}

const citizenUseCase = (opts: CitizenUseCaseOptions): CitizenUseCase => {

  const getCitizenList = async () => {

    const encryptedCitizenData = await opts.citizenRepository.getSecretCitizenList();
    const decryptedCitizenData = await opts.palpatineService.decrypt(encryptedCitizenData);

    return opts.cleanService.sanitize(decryptedCitizenData.map((citizen) => {
      return {
        ... JSON.parse(citizen)
      } as Citizen;
    }));
  };

  return {
    getCitizenList,
  };
};

export default citizenUseCase;
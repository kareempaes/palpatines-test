import { createReadStream } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import split2 from 'split2';

export interface CitizenRepository {
  getSecretCitizenList: () => Promise<string[]>;
  writeToCitizenInfo: (data: any) => Promise<void>;
}

export interface CitizenRepositoryOptions {}

const citizenRepository = (opts: CitizenRepositoryOptions): CitizenRepository => {
  
  const getSecretCitizenList = async (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const stream$ = createReadStream(
        'static/super-secret-data.txt', { encoding: 'utf8' }
      );

      const data: string[] = [];

      stream$
      .pipe(split2())
      .on('data', (chunk) => {
        data.push(chunk.toString());
      })
      .on('end', () => {
        console.log('Citizen list retrieved');
        stream$.destroy();
        resolve(data);
      });
    });
  };

  const writeToCitizenInfo = async (data: any): Promise<any> => {
    try {
      const t = await writeFile(
        'static/citizens-super-secret-info.txt',
        data,
        { encoding: 'utf8' }
      );

      console.log('Citizen info written');
    } catch (err) {
      console.log(err);
    }
  };
  
  return {
    getSecretCitizenList,
    writeToCitizenInfo,
  };
};

export default citizenRepository;


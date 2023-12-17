import { createReadStream, createWriteStream } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import split2 from 'split2';
import HomeWorld from './dto/home-world';

export interface CitizenRepository {
  getSecretCitizenList: () => Promise<string[]>;
  writeToCitizenInfo: (data: HomeWorld[]) => any;
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

  const writeToCitizenInfo = async (data: HomeWorld[]): Promise<any> => {
    try {
      const writeStream$ = await createWriteStream('static/citizens-super-secret-info.txt');
      
      writeStream$.on('end', () => {
        writeStream$.destroy();
      });

      for (const planet of data) {
        const line = `${planet.homeworld}\n - ${planet.citizens.join('\n - ')}\n\n`;
        writeStream$.write(line);
      }
      


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


import { createReadStream, createWriteStream } from 'node:fs';
import split2 from 'split2';
import HomeWorld from './dto/home-world';

export interface CitizenRepository {
  getSecretCitizenList: () => Promise<string[]>;
  writeToCitizenInfo: (data: HomeWorld[]) => Promise<{ message: string; error?: string }>;
}

export interface CitizenRepositoryOptions {}

const citizenRepository = (opts: CitizenRepositoryOptions): CitizenRepository => {
  
  const getSecretCitizenList = async (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const stream$ =  createReadStream(
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

      stream$.on('error', (err) => {
        reject(err);
      });
    });
  };

  const writeToCitizenInfo = async (data: HomeWorld[]) => {
    try {
      const writeStream$ = await createWriteStream('static/citizens-super-secret-info.txt');
      
      writeStream$.on('end', () => {
        writeStream$.destroy();
        console.log('Citizen info written');
      });

      
      for (const planet of data) {
        const line = `${planet.homeworld}\n - ${planet.citizens.join('\n - ')}\n\n`;
        writeStream$.write(line);
      }

      
    } catch (err) {
      return {
        message: 'Failed to write citizen info',
        error: (err as Error)?.message || 'Unknown error',
      }
    }
    
    return {
      message: 'OK',
    };
  };
  
  return {
    getSecretCitizenList,
    writeToCitizenInfo,
  };
};

export default citizenRepository;


import { AxiosConfig } from "../../config/axios.config";
import { ClientConstant } from "../domain/shared/constants/client.contant";

export interface PalpatineService {
  decrypt: (encrypted: string[], maxEntryNum?: number) => Promise<string[]>;
}

export interface PalpatineServiceOptions {
  axiosConfig: AxiosConfig;
}

const palpatineService = (opts: PalpatineServiceOptions): PalpatineService => {
  
  const decrypt = async (encrypted: string[], maxEntryNum: number = 200): Promise<string[]> => {
    const newEncrypted = encrypted.slice(0, maxEntryNum);

    const response = await opts.axiosConfig.clients[ClientConstant.PALPATINE].post('/decrypt', newEncrypted);

    return response.data;
  };

  return {
    decrypt,
  };
};

export default palpatineService;
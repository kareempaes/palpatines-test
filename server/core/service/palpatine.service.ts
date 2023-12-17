import { AxiosConfig } from "../../config/axios.config";

export interface PalpatineService {
  decrypte: (encrypted: any) => Promise<string>;
}

export interface PalpatineServiceOptions {
  axiosConfig: AxiosConfig;
}

const palpatineService = (opts: PalpatineServiceOptions): PalpatineService => {
  
  const decrypte = async (encrypted: any): Promise<string> => {
    const response = await opts.axiosConfig.clients.PALPATINE.get('/decrypt', { data: encrypted });
    console.log(response);
    return response.data.decrypted;
  };

  return {
    decrypte,
  };
};

export default palpatineService;
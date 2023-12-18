import { Axios } from "axios";
import { AxiosConfig } from "../../config/axios.config";
import { ClientConstant } from "../domain/shared/constants/client.contant";

export interface SwapiService {
  getHomeWorld: (url: string) => Promise<any>;
}

export interface SwapiServiceOptions {
  axiosConfig: AxiosConfig
}

const swapiService = (opts: SwapiServiceOptions): SwapiService => {

  const getHomeWorld = async (url: string) => {
    
    const response = await opts.axiosConfig.clients[ClientConstant.SWAPI].get(url);
    return response.data.results;

    
  }


  return {
    getHomeWorld,
  };
};

export default swapiService;
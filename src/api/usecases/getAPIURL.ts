import axios from 'axios';
import { getAPIURLApiResponse } from '../interfaces/getAPIURLApiResponse';
import { brandworkzSetup } from '../credentials/brandWorkzSetup';

export async function getAPIURL(): Promise<getAPIURLApiResponse> {
    const response = await axios.get<getAPIURLApiResponse>(`${brandworkzSetup.endpoint}/getAPIURL`, {
      params: {
        clientURL: brandworkzSetup.clientURL
      }
    });
    if (response.data.result.code === 0) {
      return response.data;
    } else {
      throw new Error(response.data.result.message);
    }
}

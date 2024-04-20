import axios, { AxiosRequestConfig } from 'axios';
import { assembeleApiRequest } from '../interfaces/assembeleApiRequest';
import { AppInsigtsLoggingService } from '../services/AppInsigtsLoggingService';


export async function assemble(url: string, token: string, data: assembeleApiRequest): Promise<boolean> {
    const requestConfig: AxiosRequestConfig = {
        method: 'POST',
        url: `${url}/assemble`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${token}`
        },
        data: data
    };
    const response = await axios(requestConfig);
    return response.status === 200;
}

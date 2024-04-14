import axios, { AxiosRequestConfig } from 'axios';
import { brandworkzSetup } from '../credentials/brandWorkzSetup';

export async function getToken(api_url: string, client_db: string): Promise<string> {
    const requestConfig: AxiosRequestConfig = {
        method: 'POST',
        url: `${api_url}/oauth/token`,
        headers: {
            'Accept': 'application/json;charset=UTF-8',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
            username: brandworkzSetup.username,
            password: brandworkzSetup.password
        },
        params: {
            client_db: client_db,
            grant_type: brandworkzSetup.grand_type,
            username: brandworkzSetup.client_username,
            password: brandworkzSetup.client_password
        }
    };
    const response = await axios(requestConfig);
    const accessToken = response.data.access_token;
    return accessToken;
}
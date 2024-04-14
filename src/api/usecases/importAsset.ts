import axios, { AxiosRequestConfig } from 'axios';
import { ImportAssetRequestBody } from '../interfaces/ImportAssetRequestBody';
import { importAssertApiResponse } from '../interfaces/importAssertApiResponse';

export async function importAsset(url: string, token: string,requestBody:ImportAssetRequestBody): Promise<importAssertApiResponse> {
    const requestConfig: AxiosRequestConfig = {
        method: 'POST',
        url: `${url}/importAsset`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${token}`
        },
        data: requestBody
    };
    const response = await axios(requestConfig);
    return response.data;
}

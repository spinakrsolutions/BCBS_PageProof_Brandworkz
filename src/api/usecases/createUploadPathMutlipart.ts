import axios, { AxiosRequestConfig } from 'axios';
import { brandworkzSetup } from '../credentials/brandWorkzSetup';
import { createUploadPathMultipartApiResponse } from '../interfaces/createUploadPathMultipartApiResponse';


export async function createUploadPathMutlipart(url: string, token: string, fileName: string, fileSize: number): Promise<createUploadPathMultipartApiResponse> {
  const requestConfig: AxiosRequestConfig = {
    method: 'POST',
    url: `${url}/createUploadPath`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${token}`
    },
    data: {
      fileName: fileName,
      fileSize: fileSize,
      categoryGuid: brandworkzSetup.categoryGuid,
      uploadType: 'multipart-upload'
    }
  };
  const response = await axios(requestConfig);
  return response.data;
}

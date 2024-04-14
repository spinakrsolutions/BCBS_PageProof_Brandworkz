import axios, { AxiosRequestConfig } from 'axios';
import { brandworkzSetup } from '../credentials/brandWorkzSetup';
import { createUploadPathSingleApiResponse } from '../interfaces/createUploadPathSingleApiResponse';

export async function createUploadPathSingle(url:string,token: string,fileName:string,fileSize:number): Promise<createUploadPathSingleApiResponse> {
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
      uploadType: 'single-upload'
    }
  };

  try {
    const response = await axios(requestConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
}

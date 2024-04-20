import { buffer } from "stream/consumers";
import { brandworkzSetup } from "../credentials/brandWorkzSetup";
import { ImportAssetRequestBody } from "../interfaces/ImportAssetRequestBody";
import { getAPIURLApiResponse } from "../interfaces/getAPIURLApiResponse";
import { awsS3AssertPut, awsS3AssertPutGetEtag } from "../usecases/awsS3AssertPut";
import { createUploadPathMutlipart } from "../usecases/createUploadPathMutlipart";
import { createUploadPathSingle } from "../usecases/createUploadPathSingle";
import { getAPIURL } from "../usecases/getAPIURL";
import { getToken } from "../usecases/getToken";
import { importAsset } from "../usecases/importAsset";
import { splitFileIntoChunks } from "../usecases/splitFileIntoChunks";
import { assembeleApiRequest } from "../interfaces/assembeleApiRequest";
import { assemble } from "../usecases/assemble";

export class BrandWorkzService {
    private readonly api_url: string;
    private readonly client_id: string;
    private readonly version: string;
    private maxSingleUploadSize:number = 15728640;
    constructor(intializeData: getAPIURLApiResponse) {
        this.api_url = intializeData.data.api_url;
        this.client_id = intializeData.data.client_id;
        this.version = intializeData.data.version;
    }
    static async create(): Promise<BrandWorkzService> {
        try {
            const initializedData = await getAPIURL();
            return new BrandWorkzService(initializedData);
        } catch (error) {
            throw error;
        }
    }

    async uploadFile(filename: string, blob: Buffer, size: number): Promise<boolean> {
        var token = await getToken(this.api_url, this.client_id);
        var url = `${this.api_url}/v${this.version}/${this.client_id}`;
        if (size > this.maxSingleUploadSize) {
            let awsResponseList: any = [];
            let uploadResponse = await createUploadPathMutlipart(url, token, filename, size);
            let chunks = await splitFileIntoChunks(blob, uploadResponse?.data?.uploadDetails?.mainChunkSize);
            await Promise.all(chunks.map(async (chunk, index) => {
                let awsResponse = await awsS3AssertPutGetEtag(uploadResponse?.data?.uploadDetails?.urls[index], chunk);
                awsResponseList.push(awsResponse);
            }));
            const assembleResquest: assembeleApiRequest = {
                objectKey: uploadResponse.data.keyName,
                uploadId: uploadResponse.data.uploadDetails.uploadId,
                parts: awsResponseList.map((etag: any, index: number) => {
                    return {
                        partNumber: index+1,
                        eTag: etag?.replace(/"/g, '')
                    }
                })
            }
            let assembleResponse = await assemble(url, token, assembleResquest);
            if (assembleResponse) {
                return await this
                    .importAssertCall(
                        uploadResponse.data.assetId,
                        uploadResponse.data.assetVersion,
                        uploadResponse.data.keyName,
                        size,
                        filename,
                        url,
                        token
                    )

            }

        }
        else {
            let uploadsingleResponse = await createUploadPathSingle(url, token, filename, size);
            let awsResponse = await awsS3AssertPut(uploadsingleResponse.data.uploadDetails.url, blob);
            if (awsResponse) {
                return await this
                    .importAssertCall(
                        uploadsingleResponse.data.assetId,
                        uploadsingleResponse.data.assetVersion,
                        uploadsingleResponse.data.keyName,
                        size,
                        filename,
                        url,
                        token
                    )
            }
        }

        return false;
    }

    async importAssertCall(assetId: number, assetVersion: number, keyName: string, size: number, fileName: string, url: string, token: string): Promise<boolean> {
        const requestBody: ImportAssetRequestBody = {
            categoryGuid: brandworkzSetup.categoryGuid,
            assetId: assetId,
            assetVersion: assetVersion,
            keyName: keyName,
            fileSize: size,
            originalFilename: fileName
        };
        let response = await importAsset(url, token, requestBody);
        return response.result.httpStatus == 200;
    }
}


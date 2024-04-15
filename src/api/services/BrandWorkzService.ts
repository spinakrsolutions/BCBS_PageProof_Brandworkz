import { brandworkzSetup } from "../credentials/brandWorkzSetup";
import { ImportAssetRequestBody } from "../interfaces/ImportAssetRequestBody";
import { getAPIURLApiResponse } from "../interfaces/getAPIURLApiResponse";
import { awsS3AssertPut } from "../usecases/awsS3AssertPut";
import { createUploadPathSingle } from "../usecases/createUploadPathSingle";
import { getAPIURL } from "../usecases/getAPIURL";
import { getToken } from "../usecases/getToken";
import { importAsset } from "../usecases/importAsset";

export class BrandWorkzService {
    private readonly api_url: string;
    private readonly client_id: string;
    private readonly version: string;
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
        var uploadResponse = await createUploadPathSingle(url, token, filename, size);
        var awsResponse = await awsS3AssertPut(uploadResponse.data.uploadDetails.url, blob);
        if (awsResponse) {
            const requestBody: ImportAssetRequestBody = {
                categoryGuid: brandworkzSetup.categoryGuid,
                assetId: uploadResponse.data.assetId,
                assetVersion: uploadResponse.data.assetVersion,
                keyName: uploadResponse.data.keyName,
                fileSize: size,
                originalFilename: filename
            };
            var response = await importAsset(url, token, requestBody);
            return response.result.httpStatus == 200;
        }
        return false;
    }
}
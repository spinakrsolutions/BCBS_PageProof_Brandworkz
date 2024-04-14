export interface ImportAssetRequestBody {
    categoryGuid: string;
    assetId: number;
    assetVersion: number;
    keyName: string;
    fileSize: number;
    originalFilename: string;
}

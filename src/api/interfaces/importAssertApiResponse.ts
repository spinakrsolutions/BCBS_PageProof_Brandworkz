export interface importAssertApiResponse {
    result: {
        status: number;
        message: string;
        httpStatus: number;
        httpMessage: string;
    };
    data: {
        binaryIdenticalToGuids: string;
        shortcutCreated: number;
        md5: string;
        pixelwidth: number;
        pixelheight: number;
        resolution: string;
        imageformat: string;
        pagecount: string;
        durationInSeconds: string;
        disksizeBytes: number;
        assetSerialNumber: number;
        assetVersion: number;
        assetGuid: string;
        assetVersionGuid: string;
        assetTitle: string;
        nameClash: number;
    };
}

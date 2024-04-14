export interface createUploadPathSingleApiResponse {
    result: {
        status: number;
        message: string;
        httpStatus: number;
        httpMessage: string;
    };
    data: {
        categoryGuid: string;
        assetId: number;
        assetVersion: number;
        keyName: string;
        uploadDetails: {
            type: string;
            url: string;
        };
    };
}

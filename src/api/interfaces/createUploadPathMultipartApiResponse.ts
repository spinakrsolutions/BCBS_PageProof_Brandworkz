export interface createUploadPathMultipartApiResponse {
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
            uploadId: string;
            urls: string[];
            mainChunkSize: number;
            finalChunkSize: number;
            type: string;
            chunkNo: number;
        };
    };
}

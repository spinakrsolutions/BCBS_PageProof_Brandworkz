export interface getAPIURLApiResponse {
    result: {
        message: string;
        code: number;
    };
    data: {
        api_url: string;
        client_id: string;
        version: string;
    };
}

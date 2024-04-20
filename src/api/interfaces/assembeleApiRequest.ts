import { part } from './part';


export interface assembeleApiRequest {
    objectKey: string;
    uploadId: string;
    parts: part[];
}

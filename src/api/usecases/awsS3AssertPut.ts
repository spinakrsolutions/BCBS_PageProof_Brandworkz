import axios from "axios";

export async function awsS3AssertPut(url:string,blob:Buffer ):Promise<boolean> {
    const response = await axios.put(url, blob,
        {
            headers: {
                'Content-Type': null
            }
        }
    );
    return response.status === 200;
}

export async function awsS3AssertPutGetEtag(url:string,blob:Buffer ):Promise<any> {
    const response = await axios.put(url, blob,
        {
            headers: {
                'Content-Type': null
            }
        }
    );
    return response.headers.etag;
}
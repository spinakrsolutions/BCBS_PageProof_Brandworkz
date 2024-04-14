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
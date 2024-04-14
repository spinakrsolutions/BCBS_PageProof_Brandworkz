import dotenv from 'dotenv';
dotenv.config();

interface BrandWorkzSetup {
    endpoint: string;
    clientURL: string;
    grand_type: string;
    username: string;
    password: string;
    client_username:string;
    client_password:string;
    categoryGuid:string
}

export const brandworkzSetup: BrandWorkzSetup = {
    endpoint: process.env.BRANDWORKZ_ENDPOINT || '',
    clientURL: process.env.BRANDWORKZ_CLIENTURL || '',
    grand_type: process.env.BRANDWORKZ_GRANDTYPE || '',
    username: process.env.BRANDWORKZ_USERNAME || '',
    password: process.env.BRANDWORKZ_PASSWORD || '',
    client_username: process.env.BRANDWORKZ_CLIENTUSERNAME || '',
    client_password: process.env.BRANDWORKZ_CLIENTPASSWORD || '',
    categoryGuid:process.env.BRANDWORKZ_CATEGORYGUID || ''
};

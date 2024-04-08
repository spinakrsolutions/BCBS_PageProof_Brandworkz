import dotenv from 'dotenv';
dotenv.config();

interface PageProofSetup {
    endpoint: string;
    applicationId: string;
    subscriptionKey: string;
    username: string;
    password: string;
}

export const pageProofSetup: PageProofSetup = {
    endpoint: process.env.PAGEPROOF_ENDPOINT || '',
    applicationId: process.env.PAGEPROOF_APPLICATIONID || '',
    subscriptionKey: process.env.PAGEPROOF_SUBSCRIPTIONKEY || '',
    username: process.env.PAGEPROOF_USERNAME || '',
    password: process.env.PAGEPROOF_PASSWORD || ''
};

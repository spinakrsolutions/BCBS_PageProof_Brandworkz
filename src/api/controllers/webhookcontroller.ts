import { Request,Response } from "express";
import { PageProofService } from "../services/PageProofService";

const webhookPayloadProcess=async (req:Request,res:Response)=>{
    try{
        const payload = req.body;
        if(payload)
        {
            if(!payload.proof || !payload.proof.id || !payload.proof.file || !!payload.proof.file.id)
            {
                // Log exception
            }
            const pageProofService = new PageProofService();
            const fileId=payload.proof.file.id;
            const blob=await pageProofService.downloadFile(fileId);
            console.log(payload.proof.id,blob);
        }
    }
    catch(error){
        // Log exception
    }
}

export{
    webhookPayloadProcess
}
import { Request, Response } from "express";
import { PageProofService } from "../services/PageProofService";
import { tryCatch } from "../utils/tryCatch";
import { BrandWorkzService } from "../services/BrandWorkzService";
import { AppInsigtsLoggingService } from "../services/AppInsigtsLoggingService";

const webhookPayloadProcess = tryCatch(async (req: Request, res: Response) => {
        const appInsigtsLoggingService = new AppInsigtsLoggingService();
        appInsigtsLoggingService.trackNodeHttpRequest(req,res);
        const payload = req.body;
        appInsigtsLoggingService.trackEvent("Page Proof WebHook Payload",payload);
        if (payload) {
            if (!payload.proof || !payload.proof.id || !payload.proof.file || !payload.proof.file.id) {
                throw new Error(`Invalid payload: ${payload}`);
            }
            const pageProofService = new PageProofService();
            const fileId = payload.proof.file.id;
            const filename=payload.proof.file.name;
            const blob = await pageProofService.downloadFile(fileId);
            const brandWorkzService = await BrandWorkzService.create();
            await brandWorkzService.uploadFile(filename,blob,Buffer.byteLength(blob));
            appInsigtsLoggingService.trackEvent("Page Proof WebHook Success",{fileId,filename});
            res.sendStatus(200);
        }
    })

export {
    webhookPayloadProcess
}
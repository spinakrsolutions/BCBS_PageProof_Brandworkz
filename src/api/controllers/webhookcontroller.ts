import { Request, Response } from "express";
import { PageProofService } from "../services/PageProofService";
import { tryCatch } from "../utils/tryCatch";
import { BrandWorkzService } from "../services/BrandWorkzService";

const webhookPayloadProcess = tryCatch(async (req: Request, res: Response) => {
        const payload = req.body;
        if (payload) {
            if (!payload.proof || !payload.proof.id || !payload.proof.file || !payload.proof.file.id) {
                res.sendStatus(500);
                throw new Error(`Invalid payload: ${payload}`);
            }
            const pageProofService = new PageProofService();
            const fileId = payload.proof.file.id;
            const filename=payload.proof.file.name;
            const blob = await pageProofService.downloadFile(fileId);
            const brandWorkzService = await BrandWorkzService.create();
            await brandWorkzService.uploadFile(filename,blob,Buffer.byteLength(blob));
            res.sendStatus(200);
        }
    })

export {
    webhookPayloadProcess
}
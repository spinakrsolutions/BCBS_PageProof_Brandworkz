import express from 'express';
import { webhookPayloadProcess } from '../controllers/webhookcontroller';
const router = express.Router();

router.post('/',webhookPayloadProcess);

export{
    router
}
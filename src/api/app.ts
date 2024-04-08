import express from 'express';
import { createServer } from 'http';
import {router} from './routes/routes';

const app = express();
app.use(express.json());

app.use('/', router);

const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;
const server = createServer(app);
server.listen(port,():void=>{
    console.log(`Server running at http://${hostname}:${port}/`)
})
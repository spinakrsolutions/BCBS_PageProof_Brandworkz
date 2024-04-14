import express from 'express';
import { createServer } from 'http';
import {router} from './routes/routes';
import { errorMiddleware } from './middlewares/errorMiddleware';
import winstonLogger from './logger/winstonLogger';

const app = express();
app.use(express.json());

app.use('/', router);

// Log unhandled exceptions
process.on('uncaughtException', (err) => {
    winstonLogger.error(`Uncaught Exception: ${err.message}`);
    process.exit(1); // Exit process
});

// Log unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    winstonLogger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
    process.exit(1); // Exit process
});

  
app.use(errorMiddleware);

const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;
const server = createServer(app);
server.listen(port,():void=>{
    console.log(`Server running at http://${hostname}:${port}/`)
})
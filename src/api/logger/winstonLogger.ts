import winston, { transports } from 'winston';
import { format } from 'winston';
import path from 'path';

const myFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), // Include milliseconds
  format.json()
);

const generateLogFilename = () => {
  const today = new Date().toISOString().slice(0, 10); 
  return path.join(process.cwd(), 'logs', `${today}.error.log`); 
};

const winstonLogger = winston.createLogger({
  level: 'error',
  format: myFormat,
  transports: [
    new transports.File({ 
      filename: generateLogFilename(),
    })
  ]
});

export default winstonLogger;